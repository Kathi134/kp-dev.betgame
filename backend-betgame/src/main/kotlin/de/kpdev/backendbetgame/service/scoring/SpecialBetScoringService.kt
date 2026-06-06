package de.kpdev.backendbetgame.service.scoring

import de.kpdev.backendbetgame.model.Match
import de.kpdev.backendbetgame.repository.MatchRepository
import de.kpdev.backendbetgame.repository.SpecialBetRepository
import org.springframework.stereotype.Service

@Service
class SpecialBetScoringService(
    private val specialBetRepository: SpecialBetRepository,
    private val matchRepository: MatchRepository
) {
    // TODO: implement bonus system
    fun scoreIfNeeded(match: Match) {
        return
    }
}

