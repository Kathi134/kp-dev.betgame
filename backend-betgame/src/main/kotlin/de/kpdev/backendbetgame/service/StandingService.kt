package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.StandingDto
import de.kpdev.backendbetgame.dto.toDto
import de.kpdev.backendbetgame.model.MatchStatus
import de.kpdev.backendbetgame.model.Team
import de.kpdev.backendbetgame.repository.MatchRepository
import de.kpdev.backendbetgame.repository.StandingRepository
import org.springframework.stereotype.Service

@Service
class StandingService(
    private val standingRepository: StandingRepository,
    private val matchRepository: MatchRepository
) {
    private val GAMES_TO_BE_PLAYED = 3

    fun getAllStandings(): List<StandingDto> =
        standingRepository.findAll()
            .map { it.toDto() }

    fun isFinalized(group: Char): Boolean {
        val standings = standingRepository.findByGroup(group);
        if(standings.any { it.playedGames < GAMES_TO_BE_PLAYED })
            return false
        // all matches from this group must be finished and finalized
        val matches = matchRepository.findByGroup(group)
        return matches.all { it.isFinalized && it.status == MatchStatus.FINISHED }
    }

    fun getGroupLeaderIfFinalized(group: Char): Team? {
        val standings = standingRepository.findByGroup(group);
        if(!isFinalized(group))
            return null
        return standings.find { it.position == 1}?.team
    }

    fun getGermanyPositionIfFinalized(germany: Team, group: Char): Int? {
        if(germany.name != "Germany")
            throw IllegalArgumentException("Team $germany is not team Germany.")
        val groupStandings = standingRepository.findByGroup(group)
        if(!groupStandings.any { it.team == germany })
            throw IllegalArgumentException("Group $group does not contain team Germany.")
        if(!isFinalized(group))
            return null
        return groupStandings.find { it.team == germany }?.position
    }
}