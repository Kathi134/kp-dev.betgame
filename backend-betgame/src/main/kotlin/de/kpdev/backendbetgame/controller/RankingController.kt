package de.kpdev.backendbetgame.controller

import de.kpdev.backendbetgame.dto.BetStatisticDto
import de.kpdev.backendbetgame.dto.MatchBetGroupDto
import de.kpdev.backendbetgame.dto.SpecialBetGroupDto
import de.kpdev.backendbetgame.service.MatchBetService
import de.kpdev.backendbetgame.service.RankingService
import de.kpdev.backendbetgame.service.SpecialBetService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/ranking")
class RankingController(
    private val rankingService: RankingService,
    private val matchBetService: MatchBetService,
    private val specialBetService: SpecialBetService
) {

    @GetMapping("/global")
    fun global(): List<BetStatisticDto> =
        rankingService.globalRanking()

    @GetMapping("/global/bets/matches")
    fun globalMatchBets(): List<MatchBetGroupDto> =
        matchBetService.globalMatchBets()

    @GetMapping("/global/bets/special")
    fun globalSpecialBets(): List<SpecialBetGroupDto> =
        specialBetService.globalSpecialBets()

    // TODO
//    @GetMapping("/group/{groupId}")
//    fun group(@PathVariable groupId: Long): List<RankingDto> =
//        rankingService.groupRanking(groupId)
}