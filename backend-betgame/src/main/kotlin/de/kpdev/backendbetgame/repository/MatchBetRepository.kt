package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.*
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.*

interface MatchBetRepository : JpaRepository<MatchBet, Long> {

    fun findByMatchId(matchId: Long): List<MatchBet>

    fun findByUserId(userId: UUID): List<MatchBet>

    fun findByUserIdAndMatchId(userId: UUID, matchId: Long): MatchBet?

    @Query("""
        SELECT COALESCE(SUM(m.awardedPoints), 0)
        FROM MatchBet m
        WHERE m.user.id = :userId
    """)
    fun sumPointsByUser(@Param("userId") userId: UUID): Int
}