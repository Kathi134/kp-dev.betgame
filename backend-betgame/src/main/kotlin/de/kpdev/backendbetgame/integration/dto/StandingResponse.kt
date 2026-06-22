package de.kpdev.backendbetgame.integration.dto

import de.kpdev.backendbetgame.model.*

data class StandingResponse(
    val group: String,
    val table: List<StandingTableEntry>
)

data class StandingTableEntry(
    val team: TeamResponse,
    val position: Int,
    val playedGames: Int,
    val won: Int,
    val draw: Int,
    val lost: Int,
    val points: Int,
    val goalsFor: Int,
    val goalsAgainst: Int,
    val goalDifference: Int
)

data class StandingListResponse(
    val standings: List<StandingResponse>
)

fun StandingTableEntry.toEntity(group: Char) = Standing(
    group = group,
    team = this.team.toEntity(),
    position = this.position,
    playedGames = this.playedGames,
    won = this.won,
    draw = this.draw,
    lost = this.lost,
    points = this.points,
    goalsFor = this.goalsFor,
    goalsAgainst = this.goalsAgainst,
    goalDifference = this.goalDifference,
)