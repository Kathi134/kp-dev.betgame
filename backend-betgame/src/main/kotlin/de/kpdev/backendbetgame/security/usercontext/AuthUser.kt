package de.kpdev.backendbetgame.security.usercontext

import java.util.UUID

data class AuthUser(
    val userId: UUID,
    val username: String,
    val roles: List<String>
)