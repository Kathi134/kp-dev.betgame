package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.SpecialBetDefinition
import de.kpdev.backendbetgame.model.SpecialBetType
import java.time.Instant


data class SpecialBetDefinitionDto(
    val id: Long,
    val competitionId: Long,
    val type: SpecialBetType,
    val deadline: Instant
)

fun SpecialBetDefinition.toDto(): SpecialBetDefinitionDto =
    SpecialBetDefinitionDto(
        id = this.id,
        competitionId = this.competition.id,
        type = this.type,
        deadline = this.deadline
    )