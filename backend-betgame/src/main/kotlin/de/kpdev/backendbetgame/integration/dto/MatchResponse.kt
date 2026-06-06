package de.kpdev.backendbetgame.integration.dto

import de.kpdev.backendbetgame.model.*
import java.time.Instant

data class MatchResponse (
    val id: Long,
    val utcDate: String,
    val status: String,
    val stage: String,
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

    utcDate = Instant.parse(this.utcDate),

    status = when (this.status) {
        "SCHEDULED" -> MatchStatus.SCHEDULED
        "LIVE", "IN_PLAY", "PAUSED" -> MatchStatus.LIVE
        "FINISHED" -> MatchStatus.FINISHED
        else -> MatchStatus.SCHEDULED
    },
    stage = CompetitionStage.entries.find { it.name == this.stage } ?: CompetitionStage.CHAMPIONSHIP,

    homeGoals = this.score?.fullTime?.home,
    awayGoals = this.score?.fullTime?.away,

    winnerDuration = null,
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

    this.utcDate = Instant.parse(dto.utcDate)

    this.homeGoals = dto.score?.fullTime?.home
    this.awayGoals = dto.score?.fullTime?.away

    // optional: extra time / penalties
    val hasExtra = dto.score?.extraTime != null
    val hasPenalties = dto.score?.penalties != null

    this.winnerDuration = when {
        hasPenalties -> MatchDuration.PENALTY_SHOOTOUT
        hasExtra -> MatchDuration.EXTRA_TIME
        this.status == MatchStatus.FINISHED -> MatchDuration.REGULAR
        else -> this.winnerDuration
    }

    this.lastExternalUpdate = Instant.now()
}