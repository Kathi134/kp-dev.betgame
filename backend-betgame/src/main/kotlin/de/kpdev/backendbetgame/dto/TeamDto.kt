package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.Team
import java.util.*

data class TeamDto(
    val id: Long,
    val name: String,
    val shortName: String?,
    val tla: String?,
    val crestUrl: String?,
    val group: Char?,
    val standing: GroupStandingDto?
)

fun Team.toDto(group: Char? = null): TeamDto =
    TeamDto(
        id = this.id,
        name = this.name,
        shortName = this.shortName,
        tla = this.tla,
        crestUrl = this.crestUrl,
        group = group
    )

data class GroupStandingDto(
    val position: Int,
     val playedGames : Int,
     val form : Int,
     val won : Int,
     val draw : Int,
     val lost : Int,
     val points : Int,
     val goalsFor : Int,
     val goalsAgainst : Int,
     val goalDifference : Int
)