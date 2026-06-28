package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.*
import de.kpdev.backendbetgame.model.*
import de.kpdev.backendbetgame.repository.SpecialBetDefinitionRepository
import de.kpdev.backendbetgame.repository.SpecialBetRepository
import de.kpdev.backendbetgame.repository.TeamRepository
import de.kpdev.backendbetgame.repository.UserRepository
import de.kpdev.backendbetgame.security.usercontext.AuthFacade
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class SpecialBetService(
    private val auth: AuthFacade,
    private val specialBetRepository: SpecialBetRepository,
    private val definitionRepository: SpecialBetDefinitionRepository,
    private val teamRepository: TeamRepository,
    private val userRepository: UserRepository,
) {

    fun getMyBets(): List<SpecialBetDto> {
        val userId = auth.userId()

        return specialBetRepository.findByUserId(userId)
            .map { it.toDto() }
    }

    fun createOrUpdate(req: SpecialBetRequest): SpecialBetDto {
        if (req.selectedTeam == null && req.stage == null)
            throw ResponseStatusException(HttpStatus.BAD_REQUEST)

        val userId = auth.userId()

        val def = definitionRepository.findById(req.definitionId)
            .orElseThrow()

        val team = req.selectedTeam?.let { teamRepository.findById(it).orElseThrow() }
        val stage = req.stage

        val user = userRepository.findById(userId)
            .orElseThrow { RuntimeException("User not found") }

        val bet = specialBetRepository.findByUserIdAndDefinitionId(userId, req.definitionId)
            ?: SpecialBet(
                user = user,
                definition = def
            )

        return applyPatch(bet, team, stage)
    }

    fun patch(id: Long, req: PatchSpecialBetRequest): SpecialBetDto {
        val bet = specialBetRepository.findById(id)
            .orElseThrow()
        val team = req.selectedTeam?.let { teamRepository.findById(it).orElseThrow() }
        return applyPatch(bet, team, req.stage)
    }

    private fun applyPatch(bet: SpecialBet, team: Team?, stage: CompetitionStage?): SpecialBetDto {
        team?.let { bet.selectedTeam = it }
        stage?.let { bet.stage = it }

        return specialBetRepository.save(bet).toDto()
    }

    fun globalSpecialBets(): List<SpecialBetGroupDto> =
        specialBetRepository.findAll()
            .groupBy { it.definition.id }
            .map { (_, betsForDef) ->
                SpecialBetGroupDto(
                    definition = betsForDef.first().definition.toDto(),
                    bets = betsForDef.map { it.toDto() }
                )
            }
}