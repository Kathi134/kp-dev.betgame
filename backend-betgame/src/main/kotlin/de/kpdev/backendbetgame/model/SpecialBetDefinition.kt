package de.kpdev.backendbetgame.model

import jakarta.persistence.*
import java.time.Instant

@Entity
class SpecialBetDefinition(
    @Id
    @GeneratedValue
    val id: Long = 0,

    @ManyToOne
    val competition: Competition,

    val title: String,

    val deadline: Instant,

    @Enumerated(EnumType.STRING)
    val type: SpecialBetType
) 