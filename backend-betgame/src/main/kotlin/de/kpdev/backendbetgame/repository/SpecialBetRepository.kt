package de.kpdev.backendbetgame.repository

import de.kpdev.backendbetgame.model.SpecialBet
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.util.UUID

interface SpecialBetRepository : JpaRepository<SpecialBet, Long> {

    fun findByUserId(userId: UUID): List<SpecialBet>

    fun findByUserIdAndDefinitionId(userId: UUID, definitionId: Long): SpecialBet?

    fun findByDefinitionId(definitionId: Long): List<SpecialBet>

    fun findBySelectedTeamIsNotNullOrStageIsNotNull(): List<SpecialBet>

    @Query("""
        SELECT COALESCE(SUM(s.awardedPoints), 0)
        FROM SpecialBet s
        WHERE s.user.id = :userId
    """)
    fun sumPointsByUser(@Param("userId") userId: UUID): Int
}