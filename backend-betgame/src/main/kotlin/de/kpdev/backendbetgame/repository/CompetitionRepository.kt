package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.Competition
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface CompetitionRepository : JpaRepository<Competition, Long> {
    fun findByActiveTrue(): Competition?
}