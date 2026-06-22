package de.kpdev.backendbetgame.integration.service

import de.kpdev.backendbetgame.integration.FootballDataClient
import de.kpdev.backendbetgame.integration.dto.toEntity
import de.kpdev.backendbetgame.repository.StandingRepository
import jakarta.transaction.Transactional
import org.springframework.stereotype.Service

@Service
class SyncStandingService(
    private val footballDataClient: FootballDataClient,
    private val standingRepository: StandingRepository
) {

    @Transactional
    fun syncStandings() {
        val standingsResponse = footballDataClient.fetchStandings()

        standingsResponse.forEach { dto ->
            if (dto.table.size != 4)
                return@forEach

            val group = dto.group.last()

            standingRepository.deleteByGroup(group)
            standingRepository.flush()
            standingRepository.saveAll(dto.table.map { it.toEntity(group) })
        }
    }
}