package de.kpdev.backendbetgame.integration.service

import de.kpdev.backendbetgame.integration.FootballDataClient
import de.kpdev.backendbetgame.model.Competition
import de.kpdev.backendbetgame.repository.CompetitionRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class SyncCompetitionService(
    private val footballClient: FootballDataClient,
    private val competitionRepository: CompetitionRepository,
    private val specialBetDefinitionSeeder: SpecialBetDefinitionSeeder,
) {
    fun syncCompetition(): Competition {
        val dto = footballClient.fetchCompetition("WC")

        val matches = footballClient.fetchWorldCupMatches()
        val startDate = matches.minByOrNull { it.utcDate }?.utcDate ?: Instant.parse("2026-06-11T19:00:00Z")
        val endDate = matches.maxByOrNull { it.utcDate }?.utcDate ?: Instant.parse("2026-07-19T19:00:00Z")

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
            season = 2026,
            startDate = startDate,
            endDate = endDate,
        )

        val res = competitionRepository.save(competition)
        specialBetDefinitionSeeder.seed(competition)
        return res
    }
}