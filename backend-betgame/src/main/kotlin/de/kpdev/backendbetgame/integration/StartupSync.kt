package de.kpdev.backendbetgame.integration

import de.kpdev.backendbetgame.integration.service.SyncCompetitionService
import de.kpdev.backendbetgame.integration.service.SyncMatchesService
import de.kpdev.backendbetgame.integration.service.SyncStandingService
import de.kpdev.backendbetgame.integration.service.SyncTeamsService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
class StartupSync(
    private val matchesSyncService: SyncMatchesService,
    private val competitionSyncService: SyncCompetitionService,
    private val teamSyncService: SyncTeamsService,
    private val standingSyncService: SyncStandingService,
) {
    private val logger: Logger = LoggerFactory.getLogger(SyncMatchesService::class.java)

    @EventListener(ApplicationReadyEvent::class)
    fun init() {
        competitionSyncService.syncCompetition()
        teamSyncService.syncTeams()
        matchesSyncService.syncMatches()
        standingSyncService.syncStandings()
        logger.info("startup data integration completed.")
    }
}