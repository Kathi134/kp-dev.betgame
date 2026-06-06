package de.kpdev.backendbetgame.dto

import de.kpdev.backendbetgame.model.Competition

data class CompetitionDto(
    val id: Long,
    val code: String,
    val name: String,
    val season: Int,
    val active: Boolean
)

fun Competition.toDto(): CompetitionDto =
    CompetitionDto(
        id = this.id,
        code = this.code,
        name = this.name,
        season = this.season,
        active = this.active
    )