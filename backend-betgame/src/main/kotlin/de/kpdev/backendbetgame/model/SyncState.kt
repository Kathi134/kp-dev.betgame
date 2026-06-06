package de.kpdev.backendbetgame.model

import jakarta.persistence.Entity
import jakarta.persistence.Id
import java.time.Instant

@Entity
class SyncState(

    @Id
    val competitionCode: String,

    var lastMatchSync: Instant?,

    var lastLiveSync: Instant?,

    var lastSuccessfulSync: Instant?
)