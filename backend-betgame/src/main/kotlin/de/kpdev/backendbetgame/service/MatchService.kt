package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.MatchDto
import de.kpdev.backendbetgame.dto.toDto
import de.kpdev.backendbetgame.model.MatchStatus
import de.kpdev.backendbetgame.repository.MatchRepository
import org.springframework.stereotype.Service

@Service
class MatchService(
    private val matchRepository: MatchRepository
) {

    fun getAllMatches(): List<MatchDto> =
        matchRepository.findAllByActiveCompetition()
            .map { it.toDto() }

    fun getMatch(id: Long): MatchDto =
        matchRepository.findById(id)
            .map { it.toDto() }
            .orElseThrow()

    fun getLiveMatches(): List<MatchDto> =
        matchRepository.findByStatusIn(listOf(MatchStatus.LIVE))
            .map { it.toDto() }
}

