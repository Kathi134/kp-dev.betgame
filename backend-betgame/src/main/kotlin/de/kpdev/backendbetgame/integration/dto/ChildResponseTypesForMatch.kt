package de.kpdev.backendbetgame.integration.dto


data class TeamRef(
    val id: Long?,
    val name: String?,
    val tla: String?
)

data class ScoreDto(
    val fullTime: ResultDto?,
    val extraTime: ResultDto?,
    val penalties: ResultDto?
)

data class ResultDto(
    val home: Int?,
    val away: Int?
)

