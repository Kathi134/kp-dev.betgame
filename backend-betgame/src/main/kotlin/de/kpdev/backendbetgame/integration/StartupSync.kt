package de.kpdev.backendbetgame.integration

import de.kpdev.backendbetgame.integration.service.SyncCompetitionService
import de.kpdev.backendbetgame.integration.service.SyncMatchesService
import de.kpdev.backendbetgame.integration.service.SyncTeamsService
import org.springframework.boot.context.event.ApplicationReadyEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component

@Component
class StartupSync(
    private val matchesSyncService: SyncMatchesService,
    private val competitionSyncService: SyncCompetitionService,
    private val teamSyncService: SyncTeamsService,

) {
    @EventListener(ApplicationReadyEvent::class)
    fun init() {
//        competitionSyncService.syncCompetition()
//        teamSyncService.syncTeams()
//        matchesSyncService.syncMatches()
    }
}