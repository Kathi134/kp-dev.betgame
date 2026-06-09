package de.kpdev.backendbetgame.model

import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.time.Instant

@Entity
class Competition(
    @Id
    val id: Long = 0,

    val code: String,

    val name: String,

    val season: Int,

    val startDate: Instant,

    val endDate: Instant,

    var active: Boolean
)