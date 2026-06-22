package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.Standing
import org.springframework.data.jpa.repository.JpaRepository

interface StandingRepository : JpaRepository<Standing, Long> {
    fun deleteByGroup(group: Char): List<Standing>
}