package de.kpdev.backendbetgame.security.usercontext

import org.springframework.stereotype.Component
import java.util.UUID

@Component
class AuthFacade(
    private val authContext: AuthContext
) {

    fun userId(): UUID = authContext.userId()

    fun username(): String = authContext.username()

    fun roles(): List<String> = authContext.roles()

    fun user(): AuthUser = authContext.toUser()

    fun requireUser(): AuthUser = authContext.requireUser()
}