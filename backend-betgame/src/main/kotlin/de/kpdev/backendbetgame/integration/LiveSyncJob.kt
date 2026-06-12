package de.kpdev.backendbetgame.integration

import de.kpdev.backendbetgame.integration.service.SyncMatchesService
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class LiveSyncJob(
    private val syncService: SyncMatchesService
) {

    @Scheduled(fixedDelay = 60000) // jede Minute
    fun run() {
        syncService.syncMatches()
    }
}