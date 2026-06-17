package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

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

    @Query("""
        SELECT m FROM Match m
        WHERE m.status = "LIVE" OR m.status = "FINISHED"
    """)
    fun findMatchesWithResult(): List<Match>

    @Query("""
    SELECT m
    FROM Match m
    WHERE m.homeTeam.id = :teamId
       OR m.awayTeam.id = :teamId
""")
    fun findByTeamInMatch(@Param("teamId") teamId: Long): List<Match>

    fun findByStatusNotAndIsFinalizedFalse(status: MatchStatus): List<Match>

}