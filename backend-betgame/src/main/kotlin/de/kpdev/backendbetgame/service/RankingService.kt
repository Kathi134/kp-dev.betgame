package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.BetStatisticDto
import de.kpdev.backendbetgame.repository.MatchBetRepository
import de.kpdev.backendbetgame.repository.MatchRepository
import de.kpdev.backendbetgame.repository.SpecialBetRepository
import de.kpdev.backendbetgame.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class RankingService(
    private val userRepository: UserRepository,
    private val matchBetRepository: MatchBetRepository,
    private val specialBetRepository: SpecialBetRepository,
    private val matchRepository: MatchRepository
) {

    fun globalRanking(): List<BetStatisticDto> {

        val users = userRepository.findAll()
        val matchBets = matchBetRepository.findAll()
        val specialBets = specialBetRepository.findAll()
        val numMatchesWithResult = matchRepository.findMatchesWithResult().size
        val numSpecialBetsWithResult = specialBetRepository.findBySelectedTeamIsNotNullOrStageIsNotNull().size

        return users
            .map { user ->
                val userMatchBets = matchBets.filter { it.user.id == user.id }
                val userSpecialBets = specialBets.filter { it.user.id == user.id }

                val matchPoints = userMatchBets.sumOf { it.awardedPoints ?: 0 }
                val matchAvg = if (userMatchBets.isEmpty()) 0.0 else matchPoints.toDouble() / numMatchesWithResult

                val specialPoints = userSpecialBets.sumOf { it.awardedPoints ?: 0 }
                val specialAvg = if (userMatchBets.isEmpty()) 0.0 else specialPoints.toDouble() / numSpecialBetsWithResult

                val allPoints = matchPoints + specialPoints
                val allBetCount = userMatchBets.size + userSpecialBets.size
                val allAvg = if (allBetCount == 0) 0.0 else allPoints.toDouble() / allBetCount


                BetStatisticDto(
                    userId = user.id.toString(),
                    username = user.username,

                    totalPoints = allPoints,
                    totalBetCount = allBetCount,
                    totalAveragePoints =  allAvg,

                    matchPoints = matchPoints,
                    matchBetCount = matchBets.size,
                    matchAveragePoints = matchAvg,

                    specialPoints = specialPoints,
                    specialBetCount = specialBets.size,
                    specialAveragePoints = specialAvg,
                )
            }
            .sortedByDescending { it.totalPoints }
    }
}