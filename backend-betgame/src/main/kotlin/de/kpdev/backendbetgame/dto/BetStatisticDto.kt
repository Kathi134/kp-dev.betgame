package de.kpdev.backendbetgame.dto

data class BetStatisticDto(
    val userId: String,
    val username: String,
    val totalPoints: Int,
    val betCount: Int,
    val averagePoints: Double
)