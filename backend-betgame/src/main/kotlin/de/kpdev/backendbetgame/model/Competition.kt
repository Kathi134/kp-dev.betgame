package de.kpdev.backendbetgame.model

import de.kpdev.backendbetgame.model.CompetitionStage.GROUP_STAGE
import de.kpdev.backendbetgame.model.CompetitionStage.LAST_64
import de.kpdev.backendbetgame.model.CompetitionStage.LAST_32
import de.kpdev.backendbetgame.model.CompetitionStage.LAST_16
import de.kpdev.backendbetgame.model.CompetitionStage.QUARTER_FINALS
import de.kpdev.backendbetgame.model.CompetitionStage.SEMI_FINALS
import de.kpdev.backendbetgame.model.CompetitionStage.THIRD_PLACE
import de.kpdev.backendbetgame.model.CompetitionStage.FINAL
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.transaction.Transactional
import java.time.Instant

@Entity
class Competition(
    @Id
    val id: Long = 0,

    val code: String,

    val name: String,

    val season: Int,

    val startDate: Instant,

    val endDate: Instant,

    var active: Boolean,

    @OneToMany(mappedBy = "competition")
    var matches: MutableList<Match> = mutableListOf()
) {
    companion object {
        val stages = listOf(GROUP_STAGE, LAST_64, LAST_32, LAST_16, QUARTER_FINALS, SEMI_FINALS, THIRD_PLACE, FINAL )
    }

    @Transactional
    fun getCompetitionStage(): CompetitionStage {
        var lastStage = matches.filter { it.status == MatchStatus.FINISHED }
            .maxBy { it.stage }.stage
        val allFinishedOnLastStage = matches.filter { it.stage == lastStage }.all { it.status == MatchStatus.FINISHED }
        if(allFinishedOnLastStage) {
            return ++lastStage
        }
        return lastStage
    }

    fun doesStageContainTeam(stage: CompetitionStage, team: Team): Boolean? {
        if(getCompetitionStage() < stage)
            return null
        val stageMatches = matches.filter { it.stage == stage }
        if(stageMatches.any { it.homeTeam == null || it.awayTeam == null })
            return null

        return stageMatches.any { it.homeTeam == team || it.awayTeam == team }
    }

    fun getHighestStageContainingTeam(team: Team): CompetitionStage =
        stages.sorted().last { doesStageContainTeam(it, team) == true }

}