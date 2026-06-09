package de.kpdev.backendbetgame.controller

import de.kpdev.backendbetgame.dto.MatchBetDto
import de.kpdev.backendbetgame.dto.MatchBetRequest
import de.kpdev.backendbetgame.dto.PatchMatchBetRequest
import de.kpdev.backendbetgame.service.MatchBetService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/bets/matches")
class MatchBetController(
    private val matchBetService: MatchBetService
) {

    @GetMapping
    fun myBets(): List<MatchBetDto> =
        matchBetService.getMyBets()

    @PostMapping
    fun create(@RequestBody req: MatchBetRequest): MatchBetDto =
        matchBetService.createOrUpdate(req)

    @PutMapping("{betId}")
    fun update(@RequestBody req: PatchMatchBetRequest, @PathVariable betId: Long): MatchBetDto =
        matchBetService.patch(betId, req)
}