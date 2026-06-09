package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.CompetitionStage

data class SpecialBetRequest(
    val definitionId: Long,
    val selectedTeam: Long?,
    val stage: CompetitionStage?
)

fun SpecialBetRequest.toPatch() =
    PatchSpecialBetRequest(selectedTeam = this.selectedTeam, stage = this.stage)

data class PatchSpecialBetRequest(
    val selectedTeam: Long?,
    val stage: CompetitionStage?
)