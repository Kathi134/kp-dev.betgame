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

    var predictedHomeGoals: Int,

    var predictedAwayGoals: Int,

    @Enumerated(EnumType.STRING)
    var predictedDuration: MatchDuration,

    var awardedPoints: Int? = null
)