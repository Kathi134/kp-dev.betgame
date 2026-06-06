package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.SpecialBetDefinition
import org.springframework.data.jpa.repository.JpaRepository


interface SpecialBetDefinitionRepository : JpaRepository<SpecialBetDefinition, Long> {

    fun findByCompetitionId(competitionId: Long): List<SpecialBetDefinition>

}