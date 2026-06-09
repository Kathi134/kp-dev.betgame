package de.kpdev.backendbetgame.integration.service

import de.kpdev.backendbetgame.model.Competition
import de.kpdev.backendbetgame.model.SpecialBetDefinition
import de.kpdev.backendbetgame.model.SpecialBetType
import de.kpdev.backendbetgame.repository.SpecialBetDefinitionRepository
import org.springframework.stereotype.Service

@Service
class SpecialBetDefinitionSeeder(
    private val repo: SpecialBetDefinitionRepository
) {

    fun seed(competition: Competition) {

        val existing = repo.findByCompetitionId(competition.id)
        if (existing.isNotEmpty()) return

        val definitions = listOf(
            SpecialBetType.GROUP_A_WINNER,
            SpecialBetType.GROUP_B_WINNER,
            SpecialBetType.GROUP_C_WINNER,
            SpecialBetType.GROUP_D_WINNER,
            SpecialBetType.GROUP_E_WINNER,
            SpecialBetType.GROUP_F_WINNER,
            SpecialBetType.GROUP_G_WINNER,
            SpecialBetType.GROUP_H_WINNER,
            SpecialBetType.GROUP_I_WINNER,
            SpecialBetType.GROUP_J_WINNER,
            SpecialBetType.GROUP_K_WINNER,
            SpecialBetType.GROUP_L_WINNER,

            SpecialBetType.PLACE_1,
            SpecialBetType.PLACE_2,
            SpecialBetType.PLACE_3,
            SpecialBetType.PLACE_4,
            SpecialBetType.TOP_SCORER_TEAM,
            SpecialBetType.GERMANY_FINAL_STAGE
        )

        val entities = definitions.map { type ->
            SpecialBetDefinition(
                competition = competition,
                type = type,
                deadline = competition.startDate
            )
        }

        repo.saveAll(entities)
    }
}