package de.kpdev.backendbetgame.config

import jakarta.servlet.http.HttpServletResponse
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig
{

    @Bean
    fun filterChain(http: HttpSecurity): SecurityFilterChain {

        return http
            .csrf { it.disable() }
            .sessionManagement {
                it.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            }
            .authorizeHttpRequests {
                // TOOD: die user spezifischen anpassen
//                it.requestMatchers("/auth/**").permitAll()
                it.anyRequest().permitAll()
            }
            .oauth2ResourceServer {
                it.jwt { }
            }
            .exceptionHandling {
                it.authenticationEntryPoint { _, response, _ ->
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
                }

                it.accessDeniedHandler { _, response, _ ->
                    response.sendError(HttpServletResponse.SC_FORBIDDEN)
                }
            }
            .build()
    }
}