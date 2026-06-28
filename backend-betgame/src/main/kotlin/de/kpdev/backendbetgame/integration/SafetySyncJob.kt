package de.kpdev.backendbetgame.integration

import de.kpdev.backendbetgame.integration.service.SyncMatchesService
import de.kpdev.backendbetgame.integration.service.SyncStandingService
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class SafetySyncJob(
    private val syncMatchesService: SyncMatchesService,
    private val syncStandingService: SyncStandingService
) {

    @Scheduled(fixedDelay = 3600000) // jede Stunde
    fun run() {
        syncMatchesService.syncMatches()
        syncStandingService.syncStandings()
    }
}