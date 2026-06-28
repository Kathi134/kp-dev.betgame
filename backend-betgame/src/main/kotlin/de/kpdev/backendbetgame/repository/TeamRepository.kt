package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.Team
import org.springframework.data.jpa.repository.JpaRepository


interface TeamRepository : JpaRepository<Team, Long> {
    fun findByName(name: String): Team?
}