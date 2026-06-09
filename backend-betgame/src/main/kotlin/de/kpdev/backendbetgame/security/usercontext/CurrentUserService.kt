//package de.kpdev.backendbetgame.security.usercontext
//
//import de.kpdev.backendbetgame.model.User
//import de.kpdev.backendbetgame.repository.UserRepository
//import org.springframework.stereotype.Component
//import org.springframework.transaction.annotation.Transactional
//
//@Component
//class CurrentUserService(
//    private val authContext: AuthContext,
//    private val userRepository: UserRepository
//) {
//
//    @Transactional
//    fun currentUser(): User {
//        val authUser = authContext.requireUser()
//
//        return userRepository.findById(authUser.userId)
//            .orElseGet {
//                userRepository.save(
//                    User(
//                        id = authUser.userId,
//                        username = authUser.username
//                    )
//                )
//            }
//    }
//}