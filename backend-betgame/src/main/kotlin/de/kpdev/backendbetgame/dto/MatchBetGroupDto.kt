package de.kpdev.backendbetgame.dto


data class MatchBetGroupDto(
    val match: MatchDto,
    val bets: List<MatchBetDto>
)

data class SpecialBetGroupDto(
    val definition: SpecialBetDefinitionDto,
    val bets: List<SpecialBetDto>
)