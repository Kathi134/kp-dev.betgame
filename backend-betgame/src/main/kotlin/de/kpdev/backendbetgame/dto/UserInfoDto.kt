package de.kpdev.backendbetgame.dto

data class UserInfoDto(
    val userId: String,
    val username: String,
    val roles: List<String>
)