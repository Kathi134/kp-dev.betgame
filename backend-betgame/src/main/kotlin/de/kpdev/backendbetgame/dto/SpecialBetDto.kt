package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.CompetitionStage
import de.kpdev.backendbetgame.model.SpecialBet
import java.util.*

data class SpecialBetDto(
    val id: Long,
    val definitionId: Long,
    val userId: UUID,

    val selectedTeam: TeamDto?,
    val stage: CompetitionStage?,

    val awardedPoints: Int?
)

fun SpecialBet.toDto(): SpecialBetDto =
    SpecialBetDto(
        id = this.id,
        definitionId = this.definition.id,
        userId = this.user.id,

        selectedTeam = this.selectedTeam?.toDto(),
        stage = this.stage,

        awardedPoints = this.awardedPoints
    )