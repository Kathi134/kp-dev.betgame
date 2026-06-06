package de.kpdev.backendbetgame.model

import jakarta.persistence.*
import java.util.UUID

@Entity
@Table(name = "users")
class User(
    @Id
    val id: UUID,

    @Column(unique = true)
    val username: String,

    val passwordHash: String,

    val enabled: Boolean = true,

    @Enumerated(EnumType.STRING)
    val role: UserRole = UserRole.DEFAULT
)