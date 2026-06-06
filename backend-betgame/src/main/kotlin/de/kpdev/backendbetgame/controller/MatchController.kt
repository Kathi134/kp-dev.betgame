package de.kpdev.backendbetgame.controller

import de.kpdev.backendbetgame.dto.MatchDto
import de.kpdev.backendbetgame.service.MatchService
import org.springframework.web.bind.annotation.*
import java.util.*


@RestController
@RequestMapping("/matches")
class MatchController(
    private val matchService: MatchService
) {

    @GetMapping
    fun all(): List<MatchDto> {
        return matchService.getAllMatches()
    }

    @GetMapping("/{id}")
    fun byId(@PathVariable id: Long): MatchDto {
        return matchService.getMatch(id)
    }

    @GetMapping("/live")
    fun live(): List<MatchDto> {
        return matchService.getLiveMatches()
    }
}