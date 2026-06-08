package de.kpdev.backendbetgame.integration

import de.kpdev.backendbetgame.integration.service.SyncMatchesService
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class SafetySyncJob(
    private val syncService: SyncMatchesService
) {

    @Scheduled(fixedDelay = 3600000) // jede Stunde
    fun run() {
//        syncService.safetySync()
    }
}