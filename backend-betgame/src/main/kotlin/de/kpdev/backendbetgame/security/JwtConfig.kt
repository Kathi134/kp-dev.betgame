package de.kpdev.backendbetgame.security

import io.jsonwebtoken.security.Keys
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder

@Configuration
@EnableConfigurationProperties(JwtProperties::class)
class JwtConfig {

    @Bean
    fun jwtDecoder(jwtProperties: JwtProperties): JwtDecoder {

        val key = Keys.hmacShaKeyFor(jwtProperties.key.toByteArray() + jwtProperties.key.toByteArray())

        return NimbusJwtDecoder
            .withSecretKey(key)
            .build()
    }
}