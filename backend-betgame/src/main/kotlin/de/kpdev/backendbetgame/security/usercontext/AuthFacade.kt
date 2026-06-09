package de.kpdev.backendbetgame.security.usercontext

import de.kpdev.backendbetgame.model.User
import de.kpdev.backendbetgame.repository.UserRepository
import org.springframework.stereotype.Component
import org.springframework.transaction.annotation.Transactional
import java.util.UUID

@Component
class AuthFacade(
    private val authContext: AuthContext,
    private val userRepository: UserRepository
) {
    fun userId(): UUID = user().id

    fun username(): String = user().username

    fun roles(): List<String> = authContext.roles()

    fun user(): User {
        val authId = authContext.userId()

        return userRepository.findById(authId)
            .orElseGet {
                userRepository.save(
                    User(
                        id = authId,
                        username = authContext.username()
                    )
                )
            }
    }

}