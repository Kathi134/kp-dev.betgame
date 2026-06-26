package de.kpdev.backendbetgame.service.scoring

import de.kpdev.backendbetgame.model.CompetitionStage
import de.kpdev.backendbetgame.model.Match
import de.kpdev.backendbetgame.service.StandingService
import de.kpdev.backendbetgame.model.SpecialBetType
import de.kpdev.backendbetgame.model.Team
import de.kpdev.backendbetgame.repository.*
import de.kpdev.backendbetgame.service.MatchService
import org.springframework.stereotype.Service

@Service
class SpecialBetScoringService(
    private val specialBetRepository: SpecialBetRepository,
    private val matchRepository: MatchRepository,
    private val standingService: StandingService,
    private val specialBetDefinitionRepository: SpecialBetDefinitionRepository,
    private val teamRepository: TeamRepository,
    private val standingRepository: StandingRepository,
    private val matchService: MatchService,
) {
    // TODO: implement bonus system
    fun scoreIfNeeded(match: Match) {
        // if germany played and lost, check germany exit bet
        val germany = teamRepository.findGermany()
        if(match.doesTeamPlay(germany)) {
            scoreGermanyExitIfNeeded(match, germany)
        }

        // if group stage, check winner bet
        if(match.stage == CompetitionStage.GROUP_STAGE) {
            scoreGroupStageIfNeeded(match)
        }
        else if(match.isTop4()) {

        }
    }

    fun scoreGermanyExitIfNeeded(match: Match, germany: Team) {
        val group = match.group
            ?: return
        val stage = match.stage

        if(match.stage == CompetitionStage.GROUP_STAGE) {
            val position = standingService.getGermanyPositionIfFinalized(germany, group)
                ?: return
            if(position == 4 )
               scoreGermanyExitForStage(stage)
            else if(position == 1 || position == 2)
                return
            else
                // TODO check if any game in next stage contains germany
                return
        }
        else {
            val homeGoals = match.homeGoals
            val awayGoals = match.awayGoals
            if (awayGoals == null || homeGoals == null)
                return
            val lost = (match.homeTeam == germany && homeGoals < awayGoals ||
                        match.awayTeam == germany && awayGoals < homeGoals)
            if(!lost)
                return
            scoreGermanyExitForStage(stage)
        }
    }

    fun doesGermanyPlayInKo(germany: Team): Boolean? {
        val koMatches = matchService.getMatchesForFirstKoStage()
        if(koMatches.any { it.homeTeam == null || it.awayTeam == null })
            return null
        return koMatches.any{ it.doesTeamPlay(germany)}
    }

    fun scoreGermanyExitForStage(stage: CompetitionStage) {

    }


    fun scoreGroupStageIfNeeded(match: Match) {
        val group = match.group
            ?: return
        val leader = standingService.getGroupLeaderIfFinalized(group)
            ?: return
        val type = SpecialBetType.valueByGroupIdentifier(group)
            ?: return
        val definition = specialBetDefinitionRepository.findByType(type)
        val bets = specialBetRepository.findByDefinitionId(definition.id)

        bets.forEach {
            if(it.selectedTeam == leader)
                it.awardedPoints = 5
            else
                it.awardedPoints = 0
        }
        return
    }
}

