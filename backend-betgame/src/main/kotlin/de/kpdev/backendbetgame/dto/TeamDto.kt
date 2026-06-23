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

