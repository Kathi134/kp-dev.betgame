package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.SpecialBetDto
import de.kpdev.backendbetgame.dto.SpecialBetRequest
import de.kpdev.backendbetgame.dto.toDto
import de.kpdev.backendbetgame.model.SpecialBet
import de.kpdev.backendbetgame.repository.SpecialBetDefinitionRepository
import de.kpdev.backendbetgame.repository.SpecialBetRepository
import de.kpdev.backendbetgame.repository.TeamRepository
import de.kpdev.backendbetgame.repository.UserRepository
import de.kpdev.backendbetgame.security.usercontext.AuthFacade
import org.springframework.stereotype.Service

@Service
class SpecialBetService(
    private val auth: AuthFacade,
    private val specialBetRepository: SpecialBetRepository,
    private val definitionRepository: SpecialBetDefinitionRepository,
    private val teamRepository: TeamRepository,
    private val userRepository: UserRepository
) {

    fun getMyBets(): List<SpecialBetDto> {
        val userId = auth.userId()

        return specialBetRepository.findByUserId(userId)
            .map { it.toDto() }
    }

    fun createOrUpdate(req: SpecialBetRequest): SpecialBetDto {
        val userId = auth.userId()

        val def = definitionRepository.findById(req.definitionId)
            .orElseThrow()

        val team = teamRepository.findById(req.teamId)
            .orElseThrow()

        val existing = specialBetRepository
            .findByUserIdAndDefinitionId(userId, req.definitionId)

        val user = userRepository.findById(userId)
            .orElseThrow { RuntimeException("User not found") }

        val bet = existing?.apply {
            selectedTeam = team
        } ?: SpecialBet(
            user = user,
            definition = def,
            selectedTeam = team
        )

        return specialBetRepository.save(bet).toDto()
    }
}