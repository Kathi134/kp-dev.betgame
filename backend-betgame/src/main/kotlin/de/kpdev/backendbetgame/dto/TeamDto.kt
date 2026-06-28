package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.Continent
import de.kpdev.backendbetgame.model.Team

data class TeamDto(
    val id: Long,
    val name: String,
    val shortName: String?,
    val tla: String?,
    val crestUrl: String?,
    val group: Char?,
    val continent: Continent?,
    val isFirstWorldCup: Boolean,
)

fun Team.toDto(group: Char? = null): TeamDto =
    TeamDto(
        id = this.id,
        name = this.name,
        shortName = this.shortName,
        tla = this.tla,
        crestUrl = this.crestUrl,
        group = group,
        continent = this.continent,
        isFirstWorldCup = this.isFirstWorldCup,
    )

