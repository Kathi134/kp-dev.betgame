package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.CompetitionDto
import de.kpdev.backendbetgame.dto.TeamDto
import de.kpdev.backendbetgame.dto.toDto
import de.kpdev.backendbetgame.repository.CompetitionRepository
import de.kpdev.backendbetgame.repository.MatchRepository
import de.kpdev.backendbetgame.repository.TeamRepository
import org.springframework.stereotype.Service

@Service
class CompetitionService(
    private val competitionRepository: CompetitionRepository,
    private val teamRepository: TeamRepository,
    private val matchRepository: MatchRepository
) {

    fun getActiveCompetition(): CompetitionDto {
        val comp = competitionRepository.findByActiveTrue()
            ?: throw RuntimeException("No active competition")

        return comp.toDto()
    }

    fun getTeams(): List<TeamDto> {
        val matches = matchRepository.findAll()

        val teamGroupMap: Map<Long, Char?> = matches
            .flatMap { match ->
                listOfNotNull(
                    match.homeTeam?.id?.let { it to match.group },
                    match.awayTeam?.id?.let { it to match.group }
                )
            }
            .groupBy({ it.first }, { it.second })
            .mapValues { (_, groups) ->
                groups.firstOrNull { it != null }
            }

        return teamRepository.findAll().map { it.toDto(teamGroupMap[it.id]) }
    }

}