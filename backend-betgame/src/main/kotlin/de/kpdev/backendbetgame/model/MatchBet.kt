package de.kpdev.backendbetgame.model

import jakarta.persistence.*

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

    var awardedPoints: Int? = null
)