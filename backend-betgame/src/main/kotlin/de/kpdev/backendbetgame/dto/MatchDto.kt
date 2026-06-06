package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.CompetitionStage
import de.kpdev.backendbetgame.model.Match
import de.kpdev.backendbetgame.model.MatchDuration
import de.kpdev.backendbetgame.model.MatchStatus
import java.time.Instant


data class MatchDto(
    val id: Long,
    val competitionId: Long,
    val utcDate: Instant,
    val status: MatchStatus,
    val stage: CompetitionStage,

    val homeTeam: TeamDto?,
    val awayTeam: TeamDto?,

    val homeGoals: Int?,
    val awayGoals: Int?,

    val duration: MatchDuration?
)

fun Match.toDto(): MatchDto =
    MatchDto(
        id = this.id,
        competitionId = this.competition.id,
        utcDate = this.utcDate,
        status = this.status,
        stage = this.stage,

        homeTeam = this.homeTeam?.toDto(),
        awayTeam = this.awayTeam?.toDto(),

        homeGoals = this.homeGoals,
        awayGoals = this.awayGoals,

        duration = this.winnerDuration
    )