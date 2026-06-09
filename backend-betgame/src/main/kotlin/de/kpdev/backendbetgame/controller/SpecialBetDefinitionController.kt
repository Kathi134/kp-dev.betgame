package de.kpdev.backendbetgame.controller

import de.kpdev.backendbetgame.dto.SpecialBetDefinitionDto
import de.kpdev.backendbetgame.dto.toDto
import de.kpdev.backendbetgame.repository.SpecialBetDefinitionRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/bets/special/definitions")
class SpecialBetDefinitionController(
    private val repo: SpecialBetDefinitionRepository
) {
    @GetMapping
    fun getAll(): List<SpecialBetDefinitionDto> =
        repo.findAll().map { it.toDto() }
}