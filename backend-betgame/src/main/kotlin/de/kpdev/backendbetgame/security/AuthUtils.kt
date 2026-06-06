package de.kpdev.backendbetgame.security

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt

object AuthUtils {

    fun userId(): String {
        val auth = SecurityContextHolder.getContext().authentication

        val jwt = auth.principal as Jwt

        return jwt.subject
    }

    fun username(): String {
        val jwt = SecurityContextHolder.getContext().authentication.principal as Jwt
        return jwt.getClaim("username")
    }

    fun roles(): List<String> {
        val jwt = SecurityContextHolder.getContext().authentication.principal as Jwt
        return jwt.getClaim("roles")
    }
}