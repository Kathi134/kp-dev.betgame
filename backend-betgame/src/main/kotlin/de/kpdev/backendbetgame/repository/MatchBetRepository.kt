package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.MatchBet
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface MatchBetRepository : JpaRepository<MatchBet, Long> {

    fun findByMatchId(matchId: Long): List<MatchBet>

    fun findByUserId(userId: UUID): List<MatchBet>

    fun findByUserIdAndMatchId(userId: UUID, matchId: Long): MatchBet?
}