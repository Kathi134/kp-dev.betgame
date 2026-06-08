package de.kpdev.backendbetgame.security

import io.jsonwebtoken.security.Keys
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.oauth2.jose.jws.MacAlgorithm
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter
import java.nio.charset.StandardCharsets

@Configuration
@EnableConfigurationProperties(JwtProperties::class)
class JwtConfig {

    @Bean
    fun jwtDecoder(jwtProperties: JwtProperties): JwtDecoder {

        val key = Keys.hmacShaKeyFor(jwtProperties.key.toByteArray(StandardCharsets.UTF_8))

        return NimbusJwtDecoder
            .withSecretKey(key)
            .macAlgorithm(MacAlgorithm.HS256)
            .build()
    }

    @Bean
    fun jwtAuthenticationConverter(): JwtAuthenticationConverter {
        val converter = JwtAuthenticationConverter()

        converter.setJwtGrantedAuthoritiesConverter { jwt ->
            val roles = jwt.getClaimAsStringList("roles") ?: emptyList()
            roles.map { SimpleGrantedAuthority("ROLE_$it") }
        }

        return converter
    }
}