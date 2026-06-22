package de.kpdev.backendbetgame.controller

import de.kpdev.backendbetgame.dto.StandingDto
import de.kpdev.backendbetgame.service.StandingService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/standings")
class StandingController(
    private val standingService: StandingService
) {

    @GetMapping
    fun all(): List<StandingDto> {
        return standingService.getAllStandings()
    }
}