package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.MatchDuration

data class MatchBetRequest(
    val matchId: Long,
    val homeGoals: Int,
    val awayGoals: Int,
    val duration: MatchDuration
)