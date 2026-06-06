package de.kpdev.backendbetgame.controller

import de.kpdev.backendbetgame.dto.UserInfoDto
import org.springframework.security.core.Authentication
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/auth")
class AuthController {

    @GetMapping("/me")
    fun me(authentication: Authentication): UserInfoDto {

        val jwt = authentication.principal as Jwt

        return UserInfoDto(
            userId = jwt.subject,
            username = jwt.getClaim("username"),
            roles = jwt.getClaim("roles")
        )
    }
}