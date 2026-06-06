package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.User
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UserRepository : JpaRepository<User, UUID> {

    fun findByUsername(username: String): User?

    fun existsByUsername(username: String): Boolean
}