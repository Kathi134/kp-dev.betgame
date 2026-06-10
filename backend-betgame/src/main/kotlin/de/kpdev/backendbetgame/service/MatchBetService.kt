package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.*
import de.kpdev.backendbetgame.model.MatchBet
import de.kpdev.backendbetgame.model.MatchDuration
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

        val user = userRepository.findById(userId)
            .orElseThrow()

        val bet = matchBetRepository.findByUserIdAndMatchId(userId, req.matchId)
            ?: MatchBet(user = user, match = match)

        return applyPatch(bet, req.toPatchRequest())
    }

    fun patch(id: Long, req: PatchMatchBetRequest): MatchBetDto {
        val bet = matchBetRepository.findById(id)
            .orElseThrow()
        return applyPatch(bet, req)
    }

    private fun applyPatch(bet: MatchBet, req: PatchMatchBetRequest): MatchBetDto {
        req.predictedHomeGoals?.let { bet.predictedHomeGoals = it }
        req.predictedAwayGoals?.let { bet.predictedAwayGoals = it }
        req.predictedDuration?.let { bet.predictedDuration = it }

        return matchBetRepository.save(bet).toDto()
    }

    fun globalMatchBets(): List<MatchBetGroupDto> =
        matchBetRepository.findAll()
            .groupBy { it.match.id }
            .map { (matchId, betsForMatch) ->
                MatchBetGroupDto(
                    matchId = matchId,
                    bets = betsForMatch.map { it.toDto() }
                )
            }
}