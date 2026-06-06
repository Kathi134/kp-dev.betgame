package de.kpdev.backendbetgame.controller;

import de.kpdev.backendbetgame.dto.CompetitionDto
import de.kpdev.backendbetgame.dto.TeamDto
import de.kpdev.backendbetgame.service.CompetitionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/competition")
class CompetitionController(
    private val competitionService: CompetitionService
) {

    @GetMapping
    fun active(): CompetitionDto {
        return competitionService.getActiveCompetition()
    }

    @GetMapping("/teams")
    fun teams(): List<TeamDto> {
        return competitionService.getTeams()
    }
}