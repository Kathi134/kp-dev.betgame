package de.kpdev.backendbetgame.dto


data class MatchBetGroupDto(
    val matchId: Long,
    val bets: List<MatchBetDto>
)

data class SpecialBetGroupDto(
    val definitionId: Long,
    val bets: List<SpecialBetDto>
)