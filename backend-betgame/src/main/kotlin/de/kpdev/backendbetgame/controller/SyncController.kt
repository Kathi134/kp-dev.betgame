package de.kpdev.backendbetgame.controller

import de.kpdev.backendbetgame.integration.service.SyncMatchesService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/admin/sync")
class SyncController(
    private val syncService: SyncMatchesService
) {

    @PostMapping("/matches")
    fun syncMatches() {
        syncService.syncMatches()
    }

    @PostMapping("/live")
    fun syncLive() {
        syncService.syncLiveMatches()
    }
}