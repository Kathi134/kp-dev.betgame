package de.kpdev.backendbetgame.integration.service

import de.kpdev.backendbetgame.integration.FootballDataClient
import de.kpdev.backendbetgame.model.Competition
import de.kpdev.backendbetgame.repository.CompetitionRepository
import org.springframework.stereotype.Service

@Service
class SyncCompetitionService(
    private val footballClient: FootballDataClient,
    private val competitionRepository: CompetitionRepository,
) {
    fun syncCompetition(): Competition {
        val dto = footballClient.fetchCompetition("WC")

        val existing = competitionRepository.findById(dto.id).orElse(null)

        if (existing != null) {
            existing.active = true
            return competitionRepository.save(existing)
        }

        val competition = Competition(
            id = dto.id,
            name = dto.name,
            code = dto.code,
            active = true,
            season = 2026
        )

        return competitionRepository.save(competition)
    }
}