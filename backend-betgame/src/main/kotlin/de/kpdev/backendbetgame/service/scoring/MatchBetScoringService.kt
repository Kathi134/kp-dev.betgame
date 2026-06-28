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
            val pts = calculatePoints(bet, match)
            bet.awardedPoints = pts
            matchBetRepository.save(bet)
            return@map pts != null
        }.any()
        return success
    }


    private fun calculatePoints(bet: MatchBet, match: Match): Int? {
        if(match.awayGoals == null || match.homeGoals == null)
            return null

        val correctDuration = if ((match.stage != CompetitionStage.GROUP_STAGE)
                && (bet.predictedDuration == match.duration)) 1 else 0

        val exact = bet.predictedHomeGoals == match.homeGoals &&  bet.predictedAwayGoals == match.awayGoals
        if (exact) return 3 + correctDuration

        val proportion = match.homeGoals!! - match.awayGoals!! == bet.predictedHomeGoals - bet.predictedAwayGoals
        if(proportion) return 2 + correctDuration

        val correctOutcome =
            (bet.predictedHomeGoals > bet.predictedAwayGoals && match.homeGoals!! > match.awayGoals!!) ||
            (bet.predictedHomeGoals < bet.predictedAwayGoals &&  match.homeGoals!! < match.awayGoals!!)
        if (correctOutcome) return 1 + correctDuration

        return 0
    }
}