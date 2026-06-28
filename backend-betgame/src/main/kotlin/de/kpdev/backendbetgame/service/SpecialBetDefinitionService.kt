package de.kpdev.backendbetgame.service

import de.kpdev.backendbetgame.model.Match
import de.kpdev.backendbetgame.model.SpecialBetDefinition
import de.kpdev.backendbetgame.model.SpecialBetType
import de.kpdev.backendbetgame.repository.SpecialBetDefinitionRepository
import org.springframework.stereotype.Service

@Service
class SpecialBetDefinitionService(
    private val specialBetDefinitionRepository: SpecialBetDefinitionRepository
) {
    fun getSpecialBetDefinitionForGroup(match: Match? = null, group: Char?=null) : SpecialBetDefinition? {
        val group = group ?: match?.group
            ?: return null
        val type = SpecialBetType.valueByGroupIdentifier(group)
            ?: return null
        val definition = specialBetDefinitionRepository.findByType(type)
        return definition
    }
}