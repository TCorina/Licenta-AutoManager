package com.corina.auto_manager.controllers

import com.corina.auto_manager.models.User
import com.corina.auto_manager.services.UserService
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiParam
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@RestController()
@RequestMapping("user")
@CrossOrigin("*")
class UserController @Autowired constructor(
    private val userService: UserService
) {

    @PostMapping("register")
    @ApiOperation("Register a user")
    fun createUser(
        @RequestBody user: User
    ): ResponseEntity<User> {
        return userService.createUser(user)
    }

    @PostMapping("login")
    @ApiOperation("Login")
    fun loginUser(
        @RequestParam @ApiParam(required = true, allowEmptyValue = false) username: String,
        @RequestParam @ApiParam(required = true, allowEmptyValue = false) password: String
    ): ResponseEntity<User> {
        return userService.login(username, password)
    }


}