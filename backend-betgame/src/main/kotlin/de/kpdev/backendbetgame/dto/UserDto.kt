package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.User
import de.kpdev.backendbetgame.model.UserRole
import java.util.UUID


data class UserDto(
    val id: UUID,
    val username: String
)

fun User.toDto(): UserDto =
    UserDto(
        id = this.id,
        username = this.username
    )