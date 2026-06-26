package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.Standing
import de.kpdev.backendbetgame.model.Team
import org.springframework.data.jpa.repository.JpaRepository

interface StandingRepository : JpaRepository<Standing, Long> {
    fun deleteByGroup(group: Char): List<Standing>
    fun findByGroup(group: Char): List<Standing>
    fun findByTeam(team: Team): Standing
}