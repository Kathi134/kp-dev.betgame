package de.kpdev.backendbetgame.integration

import de.kpdev.backendbetgame.integration.dto.*
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.reactive.function.client.WebClient

@Service
class FootballDataClient(
    @Value("\${football.api.url}") private val baseUrl: String,
    @Value("\${football.api.key}") private val apiKey: String
) {

    private val webClient = WebClient.builder()
        .baseUrl(baseUrl)
        .defaultHeader("X-Auth-Token", apiKey)
        .build()

    fun fetchCompetition(code: String): CompetitionResponse {
        return webClient.get()
            .uri("/v4/competitions/$code")
            .retrieve()
            .bodyToMono(CompetitionResponse::class.java)
            .block()!!
    }

    fun fetchTeams(code: String): List<TeamResponse> {
        return webClient.get()
            .uri("/v4/competitions/$code/teams")
            .retrieve()
            .bodyToMono(TeamListResponse::class.java)
            .block()
            ?.teams
            ?: emptyList()
    }

    fun fetchWorldCupMatches(): List<MatchResponse> {
        return webClient.get()
            .uri("/v4/competitions/WC/matches")
            .retrieve()
            .bodyToMono(MatchListResponse::class.java)
            .block()
            ?.matches
            ?: emptyList()
    }

    fun fetchLiveMatches(): List<MatchResponse> {
        return webClient.get()
            .uri("/v4/competitions/WC/matches?status=LIVE")
            .retrieve()
            .bodyToMono(MatchListResponse::class.java)
            .block()
            ?.matches
            ?: emptyList()
    }

    fun fetchFinishedMatches(): List<MatchResponse>  {
        return webClient.get()
            .uri("/v4/competitions/WC/matches?status=FINISHED")
            .retrieve()
            .bodyToMono(MatchListResponse::class.java)
            .block()
            ?.matches
            ?: emptyList()
    }

    fun fetchMatch(id: Long): MatchResponse {
        return webClient.get()
            .uri("/v4/matches/$id")
            .retrieve()
            .bodyToMono(MatchResponse::class.java)
            .block()!!
    }

    fun fetchStandings(): List<StandingResponse> {
        return webClient.get()
            .uri("/v4/competitions/WC/standings")
            .retrieve()
            .bodyToMono(StandingListResponse::class.java)
            .block()
            ?.standings
            ?: emptyList()
    }


}

