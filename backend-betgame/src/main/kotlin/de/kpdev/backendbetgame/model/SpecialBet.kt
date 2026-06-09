package de.kpdev.backendbetgame.model

import jakarta.persistence.*

@Entity
class SpecialBet(
    @GeneratedValue
    @Id
    val id: Long = 0,

    @ManyToOne
    val user: User,

    @ManyToOne
    val definition: SpecialBetDefinition,

    @ManyToOne
    var selectedTeam: Team? = null,

    @Enumerated(EnumType.STRING)
    var stage: CompetitionStage? = null,

    var awardedPoints: Int? = null
)