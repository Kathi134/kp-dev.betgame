package de.kpdev.backendbetgame.service.scoring

import de.kpdev.backendbetgame.model.Match
import de.kpdev.backendbetgame.model.MatchBet
import de.kpdev.backendbetgame.repository.MatchBetRepository
import org.springframework.stereotype.Service

@Service
class MatchBetScoringService(
    private val matchBetRepository: MatchBetRepository
) {
    fun scoreMatchBets(match: Match) {
        val bets = matchBetRepository.findByMatchId(match.id)
        bets.forEach { bet ->
            bet.awardedPoints = calculatePoints(bet, match)
            matchBetRepository.save(bet)
        }
    }

    // TODO: implement own scoring
    private fun calculatePoints(bet: MatchBet, match: Match): Int {
        val exact = bet.predictedHomeGoals == match.homeGoals &&  bet.predictedAwayGoals == match.awayGoals

        if (exact) return 3

        val correctOutcome =
            (bet.predictedHomeGoals > bet.predictedAwayGoals && match.homeGoals!! > match.awayGoals!!) ||
            (bet.predictedHomeGoals < bet.predictedAwayGoals &&  match.homeGoals!! < match.awayGoals!!) ||
            (bet.predictedHomeGoals == bet.predictedAwayGoals && match.homeGoals == match.awayGoals)
        if (correctOutcome) return 1

        return 0
    }
}