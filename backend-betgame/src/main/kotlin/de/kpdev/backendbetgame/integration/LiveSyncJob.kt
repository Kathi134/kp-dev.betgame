package de.kpdev.backendbetgame.integration

import de.kpdev.backendbetgame.integration.service.SyncMatchesService
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.util.concurrent.TimeUnit

@Component
class LiveSyncJob(
    private val syncService: SyncMatchesService,
) {
    @Scheduled(fixedDelay = 1, timeUnit = TimeUnit.MINUTES) // jede Minute
    fun run() {
        syncService.syncLiveMatches()
    }
}