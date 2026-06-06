package de.kpdev.backendbetgame.model

import jakarta.persistence.Entity
import jakarta.persistence.Id

@Entity
class Team(
    @Id
    val id: Long = 0,

    var name: String,

    val shortName: String?,

    val tla: String?,

    val crestUrl: String?
)