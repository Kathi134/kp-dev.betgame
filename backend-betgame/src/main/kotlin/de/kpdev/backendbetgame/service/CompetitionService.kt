package de.kpdev.backendbetgame.service;

import de.kpdev.backendbetgame.dto.CompetitionDto
import de.kpdev.backendbetgame.dto.TeamDto
import de.kpdev.backendbetgame.dto.toDto
import de.kpdev.backendbetgame.repository.CompetitionRepository
import de.kpdev.backendbetgame.repository.TeamRepository
import org.springframework.stereotype.Service

@Service
class CompetitionService(
    private val competitionRepository: CompetitionRepository,
    private val teamRepository: TeamRepository
) {

    fun getActiveCompetition(): CompetitionDto {
        val comp = competitionRepository.findByActiveTrue()
                ?: throw RuntimeException("No active competition")

        return comp.toDto()
    }

    fun getTeams(): List<TeamDto> {
        return teamRepository.findAll().map { it.toDto() }
    }
}