package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.MatchBetDto
import de.kpdev.backendbetgame.dto.MatchBetRequest
import de.kpdev.backendbetgame.dto.toDto
import de.kpdev.backendbetgame.model.MatchBet
import de.kpdev.backendbetgame.repository.MatchBetRepository
import de.kpdev.backendbetgame.repository.MatchRepository
import de.kpdev.backendbetgame.repository.UserRepository
import de.kpdev.backendbetgame.security.usercontext.AuthFacade
import org.springframework.stereotype.Service

@Service
class MatchBetService(
    private val auth: AuthFacade,
    private val matchBetRepository: MatchBetRepository,
    private val matchRepository: MatchRepository,
    private val userRepository: UserRepository
) {

    fun getMyBets(): List<MatchBetDto> {
        val userId = auth.userId()

        return matchBetRepository.findByUserId(userId)
            .map { it.toDto() }
    }

    fun createOrUpdate(req: MatchBetRequest): MatchBetDto {
        val userId = auth.userId()

        val match = matchRepository.findById(req.matchId)
            .orElseThrow()

        val existing = matchBetRepository
            .findByUserIdAndMatchId(userId, req.matchId)

        val user = userRepository.findById(userId)
            .orElseThrow { RuntimeException("User not found") }

        val bet = existing?.apply {
            predictedHomeGoals = req.homeGoals
            predictedAwayGoals = req.awayGoals
            predictedDuration = req.duration
        } ?: MatchBet(
            user = user,
            match = match,
            predictedHomeGoals = req.homeGoals,
            predictedAwayGoals = req.awayGoals,
            predictedDuration = req.duration
        )

        return matchBetRepository.save(bet).toDto()
    }
}