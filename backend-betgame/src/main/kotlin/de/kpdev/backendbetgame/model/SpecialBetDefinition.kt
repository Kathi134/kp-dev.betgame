package de.kpdev.backendbetgame.model

import jakarta.persistence.*
import org.hibernate.annotations.ColumnDefault
import java.time.Instant

@Entity
class SpecialBetDefinition(
    @Id
    @GeneratedValue
    val id: Long = 0,

    @ManyToOne
    val competition: Competition,

    val deadline: Instant,

    @Enumerated(EnumType.STRING)
    val type: SpecialBetType,

    @ManyToOne
    var resultTeam: Team? = null,

    @Enumerated(EnumType.STRING)
    var resultStage: CompetitionStage? = null,

    @ColumnDefault("false")
    var isFinalized: Boolean = false,
)
