package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.util.*

interface MatchRepository : JpaRepository<Match, Long> {

    fun findByCompetitionId(competitionId: Long): List<Match>

    fun findByStatus(status: MatchStatus): List<Match>

    fun findByStatusIn(statuses: List<MatchStatus>): List<Match>

    @Query("""
        SELECT m FROM Match m
        WHERE m.competition.active = true
    """)
    fun findAllByActiveCompetition(): List<Match>

    @Query("""
        SELECT m FROM Match m
        WHERE m.status = "LIVE"
    """)
    fun findLiveMatches(): List<Match>
}