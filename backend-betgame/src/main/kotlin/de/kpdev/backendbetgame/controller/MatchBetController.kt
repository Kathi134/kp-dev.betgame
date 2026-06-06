package de.kpdev.backendbetgame.controller

import de.kpdev.backendbetgame.dto.MatchBetDto
import de.kpdev.backendbetgame.dto.MatchBetRequest
import de.kpdev.backendbetgame.service.MatchBetService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/bets/matches")
class MatchBetController(
    private val matchBetService: MatchBetService
) {

    @GetMapping
    fun myBets(): List<MatchBetDto> =
        matchBetService.getMyBets()

    @PostMapping
    fun create(@RequestBody req: MatchBetRequest): MatchBetDto =
        matchBetService.createOrUpdate(req)
}