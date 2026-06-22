package de.kpdev.backendbetgame.integration.service

import de.kpdev.backendbetgame.model.Continent


fun getIsFirstCupFromTeamName(name: String) : Boolean {
    return firstTimeWorldCupTeams.contains(name)
}

fun getContinentFromTeamName(name: String) : Continent? {
    return teamContinentMap[name]
}

private val firstTimeWorldCupTeams = setOf(
    "Cape Verde Islands",
    "Curaçao",
    "Jordan",
    "Uzbekistan",
    "Haiti",
    "Congo DR",
    "Iraq"
)

private val teamContinentMap = mapOf(
    // South America
    "Argentina" to Continent.SOUTH_AMERICA,
    "Brazil" to Continent.SOUTH_AMERICA,
    "Uruguay" to Continent.SOUTH_AMERICA,
    "Ecuador" to Continent.SOUTH_AMERICA,
    "Colombia" to Continent.SOUTH_AMERICA,
    "Paraguay" to Continent.SOUTH_AMERICA,
    "Haiti" to Continent.SOUTH_AMERICA,
    "Panama" to Continent.SOUTH_AMERICA,
    "Curaçao" to Continent.SOUTH_AMERICA,

    // Europe
    "Germany" to Continent.EUROPE,
    "Belgium" to Continent.EUROPE,
    "Spain" to Continent.EUROPE,
    "Portugal" to Continent.EUROPE,
    "England" to Continent.EUROPE,
    "France" to Continent.EUROPE,
    "Switzerland" to Continent.EUROPE,
    "Sweden" to Continent.EUROPE,
    "Czechia" to Continent.EUROPE,
    "Croatia" to Continent.EUROPE,
    "Turkey" to Continent.EUROPE,
    "Austria" to Continent.EUROPE,
    "Netherlands" to Continent.EUROPE,
    "Norway" to Continent.EUROPE,
    "Scotland" to Continent.EUROPE,
    "Bosnia-Herzegovina" to Continent.EUROPE,

    // Africa
    "Ghana" to Continent.AFRICA,
    "South Africa" to Continent.AFRICA,
    "Algeria" to Continent.AFRICA,
    "Tunisia" to Continent.AFRICA,
    "Senegal" to Continent.AFRICA,
    "Morocco" to Continent.AFRICA,
    "Egypt" to Continent.AFRICA,
    "Congo DR" to Continent.AFRICA,
    "Ivory Coast" to Continent.AFRICA,
    "Cape Verde Islands" to Continent.AFRICA,

    // Asia
    "Japan" to Continent.ASIA,
    "South Korea" to Continent.ASIA,
    "Saudi Arabia" to Continent.ASIA,
    "Iran" to Continent.ASIA,
    "Qatar" to Continent.ASIA,
    "Jordan" to Continent.ASIA,
    "Iraq" to Continent.ASIA,
    "Uzbekistan" to Continent.ASIA,

    // North America (CONCACAF)
    "United States" to Continent.NORTH_AMERICA,
    "Mexico" to Continent.NORTH_AMERICA,
    "Canada" to Continent.NORTH_AMERICA,

    // Oceania
    "Australia" to Continent.OCEANIA,
    "New Zealand" to Continent.OCEANIA
)

