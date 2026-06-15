package de.kpdev.backendbetgame.integration.dto

import de.kpdev.backendbetgame.model.*
import java.time.Instant

data class MatchResponse (
    val id: Long,
    val utcDate: Instant,
    val status: String,
    val stage: String,
    val group: String?,
    val homeTeam: TeamRef?,
    val awayTeam: TeamRef?,
    val score: ScoreDto?
)

data class MatchListResponse(
    val matches: List<MatchResponse>
)

fun MatchResponse.toEntity(
    competition: Competition,
    homeTeam: Team?,
    awayTeam: Team?
) = Match(
    id = this.id,
    competition = competition,

    homeTeam = homeTeam,
    awayTeam = awayTeam,

    utcDate = utcDate,

    status = when (this.status) {
        "SCHEDULED" -> MatchStatus.SCHEDULED
        "LIVE", "IN_PLAY", "PAUSED" -> MatchStatus.LIVE
        "FINISHED" -> MatchStatus.FINISHED
        else -> MatchStatus.SCHEDULED
    },
    stage = CompetitionStage.entries.find { it.name == this.stage } ?: CompetitionStage.CHAMPIONSHIP,
    group = this.group?.last(),

    homeGoals = this.score?.fullTime?.home,
    awayGoals = this.score?.fullTime?.away,

    duration = null,
    lastExternalUpdate = Instant.now()
)


fun Match.updateFrom(dto: MatchResponse) {
    this.status = when (dto.status) {
        "SCHEDULED" -> MatchStatus.SCHEDULED
        "LIVE", "IN_PLAY", "PAUSED" -> MatchStatus.LIVE
        "FINISHED" -> MatchStatus.FINISHED
        else -> this.status
    }
    this.stage = CompetitionStage.entries.find { it.name == dto.stage } ?: CompetitionStage.CHAMPIONSHIP
    this.group = dto.group?.last()

    this.utcDate = dto.utcDate

    this.homeGoals = dto.score?.fullTime?.home
    this.awayGoals = dto.score?.fullTime?.away

    // optional: extra time / penalties
    val hasExtra = dto.score?.extraTime != null
    val hasPenalties = dto.score?.penalties != null

    this.duration = when {
        hasPenalties -> MatchDuration.PENALTY_SHOOTOUT
        hasExtra -> MatchDuration.EXTRA_TIME
        this.status == MatchStatus.FINISHED -> MatchDuration.REGULAR
        else -> this.duration
    }

    this.lastExternalUpdate = Instant.now()
}