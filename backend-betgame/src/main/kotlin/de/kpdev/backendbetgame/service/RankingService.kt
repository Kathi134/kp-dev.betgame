package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.BetStatisticDto
import de.kpdev.backendbetgame.repository.MatchBetRepository
import de.kpdev.backendbetgame.repository.SpecialBetRepository
import de.kpdev.backendbetgame.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class RankingService(
    private val userRepository: UserRepository,
    private val matchBetRepository: MatchBetRepository,
    private val specialBetRepository: SpecialBetRepository
) {

    fun globalRanking(): List<BetStatisticDto> {

        val users = userRepository.findAll()
        val matchBets = matchBetRepository.findAll()
        val specialBets = specialBetRepository.findAll()

        return users
            .map { user ->
                val userMatchBets = matchBets.filter { it.user.id == user.id }
                val userSpecialBets = specialBets.filter { it.user.id == user.id }

                val allPoints =
                    userMatchBets.sumOf { it.awardedPoints ?: 0 } +
                            userSpecialBets.sumOf { it.awardedPoints ?: 0 }

                val betCount = userMatchBets.size + userSpecialBets.size

                val avg = if (betCount == 0) 0.0 else allPoints.toDouble() / betCount

                BetStatisticDto(
                    userId = user.id.toString(),
                    username = user.username,
                    totalPoints = allPoints,
                    betCount = betCount,
                    averagePoints = avg
                )
            }
            .sortedByDescending { it.totalPoints }
    }
}