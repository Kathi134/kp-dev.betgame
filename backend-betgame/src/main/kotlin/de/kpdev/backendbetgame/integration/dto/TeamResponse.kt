package de.kpdev.backendbetgame.integration.dto

import de.kpdev.backendbetgame.integration.service.getContinentFromTeamName
import de.kpdev.backendbetgame.integration.service.getIsFirstCupFromTeamName
import de.kpdev.backendbetgame.model.Team

data class TeamResponse(
    val id: Long,
    val name: String,
    val shortName: String?,
    val tla: String?,
    val crest: String?
)

data class TeamListResponse(
    val teams: List<TeamResponse>
)

fun TeamResponse.toEntity() = Team(
    id = this.id,
    name = this.name,
    shortName = this.shortName,
    tla = this.tla,
    crestUrl = this.crest,
    continent = getContinentFromTeamName(this.name),
    isFirstWorldCup = getIsFirstCupFromTeamName(this.name)
)