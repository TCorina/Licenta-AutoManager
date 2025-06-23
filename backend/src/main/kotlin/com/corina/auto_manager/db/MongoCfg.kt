package com.corina.auto_manager.db

import com.mongodb.client.MongoClients
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
class MongoConfig {

    @Bean
    fun mongoTemplate(): MongoTemplate {
        val client = MongoClients.create("mongodb://localhost:27017")
        return MongoTemplate(client, "automanager")
    }
}