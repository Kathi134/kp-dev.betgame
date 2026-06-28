package de.kpdev.backendbetgame.integration.service

import de.kpdev.backendbetgame.integration.FootballDataClient
import de.kpdev.backendbetgame.integration.dto.MatchResponse
import de.kpdev.backendbetgame.integration.dto.toEntity
import de.kpdev.backendbetgame.integration.dto.updateFrom
import de.kpdev.backendbetgame.model.Match
import de.kpdev.backendbetgame.model.MatchStatus
import de.kpdev.backendbetgame.repository.CompetitionRepository
import de.kpdev.backendbetgame.repository.MatchRepository
import de.kpdev.backendbetgame.repository.TeamRepository
import de.kpdev.backendbetgame.service.scoring.ScoringEngine
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class SyncMatchesService(
    private val footballClient: FootballDataClient,
    private val matchRepository: MatchRepository,
    private val teamRepository: TeamRepository,
    private val competitionRepository: CompetitionRepository,
    private val scoringEngine: ScoringEngine
) {
    private val logger: Logger = LoggerFactory.getLogger(SyncMatchesService::class.java)

    fun syncMatches() {
        val allMatches = footballClient.fetchWorldCupMatches()
        executeSyncUpdate(allMatches)
    }

    fun syncLiveMatches() {
        val liveMatches = footballClient.fetchLiveMatches()
        if (liveMatches.isEmpty()) {
            logger.info("No live matches to sync.")
        } else {
            executeSyncUpdate(liveMatches)
        }
        checkForFinalization(liveMatches)
    }

    fun checkForFinalization(except: List<MatchResponse>) {
        val fetchedMatchUpdatesForNonFinalizedMatches =
            matchRepository.findByStatusNotAndIsFinalizedFalse(MatchStatus.SCHEDULED)
                .filter { !except.any { e -> e.id == it.id } }
                .map { footballClient.fetchMatch(it.id) }
        if (fetchedMatchUpdatesForNonFinalizedMatches.isEmpty()) {
            logger.info("No unfinalized matches to apply scoring for.")
            return
        }
        executeSyncUpdate(fetchedMatchUpdatesForNonFinalizedMatches)
    }

    private fun executeSyncUpdate(matches: List<MatchResponse>) {
        val competition = competitionRepository.findByActiveTrue()
            ?: throw RuntimeException("No active competition")

        matches.forEach { dto ->
            val match = matchRepository.findById(dto.id).orElse(null)

            val homeTeam = dto.homeTeam?.id?.let {
                teamRepository.findById(it).orElse(null)
            }
            val awayTeam = dto.awayTeam?.id?.let {
                teamRepository.findById(it).orElse(null)
            }

            if (match == null) {
                matchRepository.save(dto.toEntity(competition, homeTeam, awayTeam))
            } else {
                match.updateFrom(dto)
                if (match.homeTeam == null)
                    match.homeTeam = homeTeam
                if (match.awayTeam == null)
                    match.awayTeam = awayTeam
                if (dto.status == MatchStatus.FINISHED.name) {
                    finalizeMatch(match)
                }
                matchRepository.save(match)
            }
        }
    }

    private fun finalizeMatch(match: Match) {
        val matchSuccess = scoringEngine.processMatchFinished(match)
        match.isFinalized = matchSuccess

        val finalizableDefinitions = scoringEngine.processSpecialBetsOnMatchFinished(match)
        finalizableDefinitions.forEach { it.isFinalized = true }

    }


}