package de.kpdev.backendbetgame.model

import jakarta.persistence.*
import org.hibernate.annotations.ColumnDefault
import java.time.Instant

@Entity
class MatchBet(
    @Id
    @GeneratedValue
    val id: Long = 0,

    @ManyToOne
    val user: User,

    @ManyToOne
    val match: Match,

    var predictedHomeGoals: Int = 0,

    var predictedAwayGoals: Int = 0,

    @Enumerated(EnumType.STRING)
    var predictedDuration: MatchDuration = MatchDuration.REGULAR,

    var awardedPoints: Int? = null,
    var matchPoints: Int? = null,
    var extraDurationPoints: Int? = null,

    @ColumnDefault("'2026-06-11 18:00:00.000000 +00:00'")
    var lastUpdate: Instant = Instant.now(),
)