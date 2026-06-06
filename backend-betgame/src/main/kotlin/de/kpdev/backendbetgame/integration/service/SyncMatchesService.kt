package de.kpdev.backendbetgame.integration.service

import de.kpdev.backendbetgame.integration.FootballDataClient
import de.kpdev.backendbetgame.integration.dto.toEntity
import de.kpdev.backendbetgame.integration.dto.updateFrom
import de.kpdev.backendbetgame.model.Match
import de.kpdev.backendbetgame.model.MatchStatus
import de.kpdev.backendbetgame.repository.CompetitionRepository
import de.kpdev.backendbetgame.repository.MatchRepository
import de.kpdev.backendbetgame.repository.TeamRepository
import de.kpdev.backendbetgame.service.scoring.ScoringEngine
import org.springframework.stereotype.Service

@Service
class SyncMatchesService(
    private val footballClient: FootballDataClient,
    private val matchRepository: MatchRepository,
    private val teamRepository: TeamRepository,
    private val competitionRepository: CompetitionRepository,
    private val scoringEngine: ScoringEngine
) {

    fun syncMatches() {
        val competition = competitionRepository.findByActiveTrue()
            ?: throw RuntimeException("No active competition")

        val externalMatches = footballClient.fetchWorldCupMatches()

        externalMatches.forEach { dto ->
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
                match.homeTeam = homeTeam
                match.awayTeam = awayTeam
                matchRepository.save(match)
            }
        }
    }

    fun syncLiveMatches() {
        val liveMatches = matchRepository.findLiveMatches()

        liveMatches.forEach { match ->
            val updated = footballClient.fetchMatch(match.id)

            match.updateFrom(updated)

            if (updated.status == MatchStatus.FINISHED.name) {
                finalizeMatch(match)
            }

            matchRepository.save(match)
        }
    }

    fun safetySync() {
        val external = footballClient.fetchWorldCupMatches()

        external.forEach { dto ->
            val match = matchRepository.findById(dto.id).orElse(null)
                ?: return@forEach

            val beforeStatus = match.status
            match.updateFrom(dto)
            matchRepository.save(match)
            if (beforeStatus != MatchStatus.FINISHED &&
                match.status == MatchStatus.FINISHED
            ) {
                finalizeMatch(match)
            }
        }
    }

    private fun finalizeMatch(match: Match) {
        scoringEngine.processMatchFinished(match)

    }
}