package de.kpdev.backendbetgame.service.scoring

import de.kpdev.backendbetgame.model.CompetitionStage
import de.kpdev.backendbetgame.model.Match
import de.kpdev.backendbetgame.model.MatchBet
import de.kpdev.backendbetgame.repository.MatchBetRepository
import org.springframework.stereotype.Service

@Service
class MatchBetScoringService(
    private val matchBetRepository: MatchBetRepository
) {
    fun scoreMatchBets(match: Match): Boolean {
        val bets = matchBetRepository.findByMatchId(match.id)
        val success = bets.map { bet ->
            val success = awardPoints(bet, match)
            matchBetRepository.save(bet)
            return@map success
        }.any()
        return success
    }


    private fun awardPoints(bet: MatchBet, match: Match): Boolean {
        if (match.awayGoals == null || match.homeGoals == null)
            return false

        val exact = bet.predictedHomeGoals == match.homeGoals && bet.predictedAwayGoals == match.awayGoals
        val proportion = match.homeGoals!! - match.awayGoals!! == bet.predictedHomeGoals - bet.predictedAwayGoals
        val correctOutcome =
            (bet.predictedHomeGoals > bet.predictedAwayGoals && match.homeGoals!! > match.awayGoals!!) ||
                    (bet.predictedHomeGoals < bet.predictedAwayGoals && match.homeGoals!! < match.awayGoals!!)

        if (exact) {
            bet.matchPoints = 3
        } else if (proportion) {
            bet.matchPoints = 2
        } else if (correctOutcome) {
            bet.matchPoints = 1
        } else {
            bet.matchPoints = 0
        }

        val correctDuration = if ((match.stage != CompetitionStage.GROUP_STAGE)
            && (bet.predictedDuration == match.duration)
        ) 1 else 0
        bet.extraDurationPoints = if (bet.matchPoints == 0) 0 else correctDuration

        bet.awardedPoints = (bet.matchPoints ?: 0) + (bet.extraDurationPoints ?: 0)

        return true
    }
}