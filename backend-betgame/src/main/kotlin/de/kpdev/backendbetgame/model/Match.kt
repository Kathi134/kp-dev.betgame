package de.kpdev.backendbetgame.model

import jakarta.persistence.*
import java.time.Instant

@Entity
class Match(
    @Id
    val id: Long = 0,

    @ManyToOne
    val competition: Competition,

    @Enumerated(EnumType.STRING)
    var stage: CompetitionStage,

    @Column(name = "group_identifier", nullable = true)
    var group: Char?,

    @ManyToOne
    var homeTeam: Team?,
    @ManyToOne
    var awayTeam: Team?,

    var utcDate: Instant,

    @Enumerated(EnumType.STRING)
    var status: MatchStatus,

    var homeGoals: Int?,
    var awayGoals: Int?,

    @Enumerated(EnumType.STRING)
    var duration: MatchDuration?,

    var lastExternalUpdate: Instant?,
) {
    override fun toString(): String {
        return "${homeTeam?.name ?: "UNKNOWN"} vs ${awayTeam?.name ?: "UNKNOWN"}"
    }
}