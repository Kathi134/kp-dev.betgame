package de.kpdev.backendbetgame.service.scoring

import de.kpdev.backendbetgame.model.Match
import org.springframework.stereotype.Service

@Service
class ScoringEngine(
    private val matchBetScoring: MatchBetScoringService,
    private val specialBetScoring: SpecialBetScoringService,
) {
    fun processMatchFinished(match: Match) =
        matchBetScoring.scoreMatchBets(match)

    fun processSpecialBetsOnMatchFinished(match: Match) =
        specialBetScoring.scoreIfNeeded(match)
}