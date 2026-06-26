package de.kpdev.backendbetgame.controller

import de.kpdev.backendbetgame.dto.*
import de.kpdev.backendbetgame.service.SpecialBetService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/bets/special")
class SpecialBetController(
    private val specialBetService: SpecialBetService
) {

    @GetMapping
    fun myBets(): List<SpecialBetDto> =
        specialBetService.getMyBets()

    @PostMapping
    fun create(@RequestBody req: SpecialBetRequest): SpecialBetDto =
        specialBetService.createOrUpdate(req)

    @PutMapping("{betId}")
    fun update(@RequestBody req: PatchSpecialBetRequest, @PathVariable betId: Long): SpecialBetDto =
        specialBetService.patch(betId, req)


}