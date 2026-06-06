package de.kpdev.backendbetgame.model

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne

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
    var selectedTeam: Team,

    var awardedPoints: Int? = null
)