package com.corina.auto_manager.services

import com.corina.auto_manager.models.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import java.security.MessageDigest

@Service
class UserService @Autowired constructor(
    private val db: MongoTemplate
) {

    fun createUser(user: User): ResponseEntity<User> {
        if (user.userName.isBlank()) return ResponseEntity<User>(HttpStatus.EXPECTATION_FAILED)
        if (user.passwordHash.isBlank()) return ResponseEntity<User>(HttpStatus.EXPECTATION_FAILED)

        val userExists = db.exists(Query.query(Criteria.where("username").`is`(user.userName)), User::class.java)
        if (userExists) return ResponseEntity<User>(HttpStatus.ALREADY_REPORTED)

        user.passwordHash = user.passwordHash.hashPassword()

        return try {
            val createdUser = db.save(user)
            ResponseEntity.ok(createdUser)
        } catch (x: Exception) {
            ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    fun login(username: String, password: String): ResponseEntity<User> {
        if (username.isBlank()) return ResponseEntity<User>(HttpStatus.EXPECTATION_FAILED)
        if (password.isBlank()) return ResponseEntity<User>(HttpStatus.EXPECTATION_FAILED)

        val user = db.findById(username, User::class.java) ?: return ResponseEntity<User>(HttpStatus.NOT_FOUND)
        if (user.passwordHash != password.hashPassword()) return ResponseEntity<User>(HttpStatus.UNAUTHORIZED)
        return ResponseEntity.ok(user)
    }


    private fun String.hashPassword(): String {
        val bytes = MessageDigest.getInstance("SHA-256").digest(toByteArray())
        return bytes.joinToString("") { "%02x".format(it) }
    }
}