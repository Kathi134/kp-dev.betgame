package de.kpdev.backendbetgame.security.usercontext

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.stereotype.Component
import java.util.UUID


@Component
class AuthContext {

    fun jwt(): Jwt {
        return SecurityContextHolder.getContext().authentication.principal as Jwt
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

    fun toUser(): AuthUser {
        return AuthUser(
            userId = userId(),
            username = username(),
            roles = roles()
        )
    }

    fun requireUser(): AuthUser {
        return toUser()
    }
}