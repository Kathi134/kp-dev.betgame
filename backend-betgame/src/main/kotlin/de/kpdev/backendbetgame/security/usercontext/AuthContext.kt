package de.kpdev.backendbetgame.security.usercontext

import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.stereotype.Component
import org.springframework.web.server.ResponseStatusException
import java.util.UUID


@Component
class AuthContext {

    fun jwt(): Jwt {
        return try {
            SecurityContextHolder.getContext().authentication.principal as Jwt
        } catch (e:Exception) {
            throw ResponseStatusException(HttpStatus.UNAUTHORIZED)
        }
    }

    fun userId(): UUID {
        return UUID.fromString(jwt().subject)
    }

    fun username(): String {
        return jwt().getClaim("username")
    }

    fun roles(): List<String> {
        val raw = jwt().getClaim<List<*>>("roles")
        return raw.map { it.toString() }
    }
}