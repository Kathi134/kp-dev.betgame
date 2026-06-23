package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.MatchBet
import de.kpdev.backendbetgame.model.MatchDuration
import java.time.Instant
import java.util.UUID


data class MatchBetDto(
    val id: Long,
    val match: MatchDto,
    val userId: UUID,
    val username: String,

    val predictedHomeGoals: Int,
    val predictedAwayGoals: Int,
    val predictedDuration: MatchDuration,

    val awardedPoints: Int?,

    val lastUpdate: Instant
)

fun MatchBet.toDto(): MatchBetDto =
    MatchBetDto(
        id = this.id,
        match = this.match.toDto(),
        userId = this.user.id,
        username = this.user.username,

        predictedHomeGoals = this.predictedHomeGoals,
        predictedAwayGoals = this.predictedAwayGoals,
        predictedDuration = this.predictedDuration,

        awardedPoints = this.awardedPoints,

        lastUpdate = this.lastUpdate
    )