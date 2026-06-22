package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.Standing

data class StandingDto(
    val group: Char,
    val team: TeamDto,
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

fun Standing.toDto(): StandingDto =
    StandingDto(
        group = group,
        team = team.toDto(),
        position = position,
        playedGames = playedGames,
        won = won,
        draw = draw,
        lost = lost,
        points = points,
        goalsFor = goalsFor,
        goalsAgainst = goalsAgainst,
        goalDifference  = goalDifference,
    )
