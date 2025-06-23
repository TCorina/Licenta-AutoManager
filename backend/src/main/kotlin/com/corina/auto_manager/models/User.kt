package com.corina.auto_manager.models

import com.fasterxml.jackson.annotation.JsonProperty
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document("users")
class User(
    @Id val userName: String,
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) var passwordHash: String,
    val vehicles: MutableList<Vehicle> = mutableListOf()
) {
}