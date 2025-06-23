package com.corina.auto_manager.services

import com.corina.auto_manager.models.User
import com.corina.auto_manager.models.Vehicle
import com.corina.auto_manager.models.VehicleAttribute
import com.corina.auto_manager.models.VehicleAttributeType
import org.bson.Document
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service

@Service
class VehicleService @Autowired constructor(
    private val db: MongoTemplate
) {

    fun addVehicle(username: String, vehicle: Vehicle): ResponseEntity<User> {
        val user = db.findById(username, User::class.java) ?: return ResponseEntity<User>(HttpStatus.NOT_FOUND)
        if (vehicle in user.vehicles) return ResponseEntity<User>(HttpStatus.ALREADY_REPORTED)
        user.vehicles.add(vehicle)
        return ResponseEntity.ok(db.save(user))
    }

    fun removeVehicle(username: String, regNo: String): ResponseEntity<User> {
        val user = db.findById(username, User::class.java) ?: return ResponseEntity<User>(HttpStatus.NOT_FOUND)
        user.vehicles.removeIf { it.regNo == regNo }
        return ResponseEntity.ok(db.save(user))
    }

    fun fetchVehicle(username: String, regNo: String): ResponseEntity<Vehicle> {
        val user = db.findById(username, User::class.java) ?: return ResponseEntity<Vehicle>(HttpStatus.NOT_FOUND)
        val vehicle = user.vehicles.find { it.regNo == regNo} ?: return ResponseEntity<Vehicle>(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(vehicle)
    }

    fun fetchVehicles(username: String): ResponseEntity<List<Vehicle>> {
        val user = db.findById(username, User::class.java) ?: return ResponseEntity<List<Vehicle>>(HttpStatus.NOT_FOUND)
        return ResponseEntity.ok(user.vehicles)
    }

    fun adjustITP(username: String, regNo: String, attribute: VehicleAttribute): ResponseEntity<User> {
        val user = db.findById(username, User::class.java) ?: return ResponseEntity<User>(HttpStatus.NOT_FOUND)
        val vehicle = user.vehicles.find { it.regNo == regNo }
            ?: return ResponseEntity<User>(HttpStatus.EXPECTATION_FAILED)

        if(attribute.startKm > vehicle.km) vehicle.km = attribute.startKm
        vehicle.itp = attribute
        return ResponseEntity.ok(db.save(user))
    }

    fun adjustRCA(username: String, regNo: String, attribute: VehicleAttribute): ResponseEntity<User> {
        val user = db.findById(username, User::class.java) ?: return ResponseEntity<User>(HttpStatus.NOT_FOUND)
        val vehicle =
            user.vehicles.find { it.regNo == regNo } ?: return ResponseEntity<User>(HttpStatus.EXPECTATION_FAILED)
        if(attribute.startKm > vehicle.km) vehicle.km = attribute.startKm
        vehicle.rca = attribute
        return ResponseEntity.ok(db.save(user))
    }

    fun adjustVIG(username: String, regNo: String, attribute: VehicleAttribute): ResponseEntity<User> {
        val user = db.findById(username, User::class.java) ?: return ResponseEntity<User>(HttpStatus.NOT_FOUND)
        val vehicle =
            user.vehicles.find { it.regNo == regNo } ?: return ResponseEntity<User>(HttpStatus.EXPECTATION_FAILED)
        if(attribute.startKm > vehicle.km) vehicle.km = attribute.startKm
        vehicle.vignette = attribute
        return ResponseEntity.ok(db.save(user))
    }

    fun adjustOIL(username: String, regNo: String, attribute: VehicleAttribute): ResponseEntity<User> {
        val user = db.findById(username, User::class.java) ?: return ResponseEntity<User>(HttpStatus.NOT_FOUND)
        val vehicle =
            user.vehicles.find { it.regNo == regNo } ?: return ResponseEntity<User>(HttpStatus.EXPECTATION_FAILED)
        if(attribute.startKm > vehicle.km) vehicle.km = attribute.startKm
        vehicle.oilChange = attribute
        return ResponseEntity.ok(db.save(user))
    }

    fun checkAlerts(username: String, regNo: String): ResponseEntity<Document> {
        val user = db.findById(username, User::class.java) ?: return ResponseEntity<Document>(HttpStatus.NOT_FOUND)
        val vehicle =
            user.vehicles.find { it.regNo == regNo } ?: return ResponseEntity<Document>(HttpStatus.EXPECTATION_FAILED)

        val alerts = mutableListOf<VehicleAttributeType>()
        if (vehicle.rca?.shouldAlert() == true) alerts += VehicleAttributeType.RCA
        if (vehicle.oilChange?.shouldAlert() == true) alerts += VehicleAttributeType.OIL
        if (vehicle.vignette?.shouldAlert() == true) alerts += VehicleAttributeType.VIG
        if (vehicle.itp?.shouldAlert() == true) alerts += VehicleAttributeType.ITP

        return ResponseEntity.ok(Document("alerts", alerts))
    }


}