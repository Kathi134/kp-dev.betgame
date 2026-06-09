package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.MatchDuration

data class MatchBetRequest(
    val matchId: Long,
    val predictedHomeGoals: Int?,
    val predictedAwayGoals: Int?,
    val predictedDuration: MatchDuration?
)

fun MatchBetRequest.toPatchRequest() =
    PatchMatchBetRequest(
        predictedHomeGoals = predictedHomeGoals,
        predictedAwayGoals = predictedAwayGoals,
        predictedDuration = predictedDuration
    )

data class PatchMatchBetRequest(
    val predictedHomeGoals: Int?,
    val predictedAwayGoals: Int?,
    val predictedDuration: MatchDuration?
)