package de.kpdev.backendbetgame.model

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
class Competition(
    @Id
    val id: Long = 0,

    val code: String,

    val name: String,

    val season: Int,

    var active: Boolean
)