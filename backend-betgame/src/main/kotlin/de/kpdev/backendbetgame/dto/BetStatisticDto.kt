package de.kpdev.backendbetgame.dto

data class BetStatisticDto(
    val userId: String,
    val username: String,

    val totalPoints: Int,
    val totalBetCount: Int,
    val totalAveragePoints: Double,

    val matchPoints: Int,
    val matchBetCount: Int,
    val matchAveragePoints: Double,

    val specialPoints: Int,
    val specialBetCount: Int,
    val specialAveragePoints: Double,
)