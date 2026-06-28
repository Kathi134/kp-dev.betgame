package de.kpdev.backendbetgame.service.scoring

import de.kpdev.backendbetgame.model.*
import de.kpdev.backendbetgame.repository.SpecialBetDefinitionRepository
import de.kpdev.backendbetgame.repository.SpecialBetRepository
import de.kpdev.backendbetgame.repository.TeamRepository
import de.kpdev.backendbetgame.service.SpecialBetDefinitionService
import de.kpdev.backendbetgame.service.StandingService
import org.springframework.stereotype.Service

@Service
class SpecialBetScoringService(
    private val specialBetRepository: SpecialBetRepository,
    private val standingService: StandingService,
    private val specialBetDefinitionRepository: SpecialBetDefinitionRepository,
    private val teamRepository: TeamRepository,
    private val specialBetDefinitionService: SpecialBetDefinitionService,
) {
    fun scoreIfNeeded(match: Match): Set<SpecialBetDefinition> {
        val finalizedDefinitions = mutableSetOf<SpecialBetDefinition>()

        // if germany played, check germany exit bet
        val germany = teamRepository.findByName("Germany")
        if(match.doesTeamPlay(germany))
            scoreGermanyExitIfNeeded(match, germany)?.let { finalizedDefinitions.add(it) }

        // if group stage, check group winner bet
        if (match.stage == CompetitionStage.GROUP_STAGE) {
            scoreGroupStageIfNeeded(match)?.let { finalizedDefinitions.add(it) }
        }
        // if top 4, check top 4 placement bets
        else if (match.isTop4()) {
            scoreTop4IfNeeded(match)?.let { finalizedDefinitions.addAll(it) }
        }

        return finalizedDefinitions
    }


    fun scoreGermanyExitIfNeeded(match: Match, germany: Team?): SpecialBetDefinition? {
        if(germany == null)
            return null
        val definition = specialBetDefinitionRepository.findByType(SpecialBetType.GERMANY_FINAL_STAGE)
            ?: return null
        val competitionStage = match.competition.getCompetitionStage()

        if (competitionStage == CompetitionStage.GROUP_STAGE)
            return null

        val hasGermany = match.competition.doesStageContainTeam(competitionStage, germany)
        // competition has not yet fully reached the stage || germany is in the stage -> bet is not to be scored yet
        if (hasGermany == null || hasGermany)
            return null

        // double check that this is actually the first stage that doesn't contain germany
        val lastContainedStage = match.competition.getHighestStageContainingTeam(germany)

        definition.resultStage = lastContainedStage
        specialBetDefinitionRepository.save(definition)

        return scoreBetsForDefinitionOnResult(definition)
    }


    fun scoreGroupStageIfNeeded(match: Match): SpecialBetDefinition? {
        val group = match.group
            ?: return null
        val definition = specialBetDefinitionService.getSpecialBetDefinitionForGroup(group = group)
            ?: return null
        val leader = standingService.getGroupLeaderIfFinalized(group)
            ?: return null

        definition.resultTeam = leader
        specialBetDefinitionRepository.save(definition)

        return scoreBetsForDefinitionOnResult(definition)
    }


    fun scoreTop4IfNeeded(match: Match): Set<SpecialBetDefinition>? {
        val homeGoals = match.homeGoals
        val awayGoals = match.awayGoals
        if (awayGoals == null || homeGoals == null)
            return null

        if (match.stage == CompetitionStage.FINAL) {
            return processPlaceXAndY(SpecialBetType.PLACE_1, SpecialBetType.PLACE_2, match, homeGoals, awayGoals)
        }
        if (match.stage == CompetitionStage.THIRD_PLACE) {
            return processPlaceXAndY(SpecialBetType.PLACE_3, SpecialBetType.PLACE_4, match, homeGoals, awayGoals)
        }
        return null
    }

    fun processPlaceXAndY(
        winner: SpecialBetType,
        loser: SpecialBetType,
        match: Match,
        homeGoals: Int,
        awayGoals: Int
    ): Set<SpecialBetDefinition>? {
        val winnerDefinition = specialBetDefinitionRepository.findByType(winner)
            ?: return null
        val loserDefinition = specialBetDefinitionRepository.findByType(loser)
            ?: return null

        val winnerTeam = if (homeGoals > awayGoals) match.homeTeam else match.awayTeam
        winnerDefinition.resultTeam = winnerTeam
        specialBetDefinitionRepository.save(winnerDefinition)
        scoreBetsForDefinitionOnResult(winnerDefinition)
            ?: return null

        val loserTeam = if (winnerTeam == match.homeTeam) match.awayTeam else match.homeTeam
        loserDefinition.resultTeam = loserTeam
        specialBetDefinitionRepository.save(loserDefinition)
        scoreBetsForDefinitionOnResult(loserDefinition)
            ?: return null

        return setOf(winnerDefinition, loserDefinition)
    }


    fun scoreBetsForDefinitionOnResult(betDefinition: SpecialBetDefinition): SpecialBetDefinition? {
        var success = true
        val bets = specialBetRepository.findByDefinitionId(betDefinition.id)
        bets.forEach {
            val correctBetAnswer = isBetCorrect(it)
            if (correctBetAnswer == null)
                success = false
            else {
                if (correctBetAnswer)
                    it.awardedPoints = 5
                else
                    it.awardedPoints = 0
                specialBetRepository.save(it)
            }
        }
        return if (success) betDefinition else null
    }

    fun isBetCorrect(bet: SpecialBet): Boolean? =
        when {
            bet.definition.resultStage != null
                -> bet.stage == bet.definition.resultStage

            bet.definition.resultTeam != null
                -> bet.selectedTeam == bet.definition.resultTeam

            else -> null
        }

}

