package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.dto.StandingDto
import de.kpdev.backendbetgame.dto.toDto
import de.kpdev.backendbetgame.repository.StandingRepository
import org.springframework.stereotype.Service

@Service
class StandingService(
    private val standingRepository: StandingRepository
) {

    fun getAllStandings(): List<StandingDto> =
        standingRepository.findAll()
            .map { it.toDto() }
}