package de.kpdev.backendbetgame.integration.service

import de.kpdev.backendbetgame.integration.FootballDataClient
import de.kpdev.backendbetgame.integration.dto.toEntity
import de.kpdev.backendbetgame.repository.TeamRepository
import org.springframework.stereotype.Service

@Service
class SyncTeamsService (
    private val footballClient: FootballDataClient,
    private val teamRepository: TeamRepository
) {

    fun syncTeams(competitionCode: String = "WC") {
        val teams = footballClient.fetchTeams(competitionCode)
        teams.forEach { dto -> teamRepository.save(dto.toEntity()) }
    }
}


