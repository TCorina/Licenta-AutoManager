package com.corina.auto_manager.controllers

import com.corina.auto_manager.models.User
import com.corina.auto_manager.models.Vehicle
import com.corina.auto_manager.models.VehicleAttribute
import com.corina.auto_manager.services.VehicleService
import io.swagger.annotations.ApiOperation
import org.bson.Document
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController()
@CrossOrigin("*")
@RequestMapping("vehicle")
class VehicleController @Autowired constructor(
    private val vehicleService: VehicleService
) {

    @PostMapping("/{username}/vehicle")
    @ApiOperation("Add a vehicle to a user")
    fun addVehicle(
        @PathVariable username: String,
        @RequestBody vehicle: Vehicle
    ): ResponseEntity<User> {
        return vehicleService.addVehicle(username, vehicle)

    }

    @DeleteMapping("/{username}/vehicle/{regNo}")
    @ApiOperation("Remove a vehicle from a user")
    fun removeVehicle(
        @PathVariable username: String,
        @PathVariable regNo: String
    ): ResponseEntity<User> {
        return vehicleService.removeVehicle(username, regNo)
    }

    @GetMapping("/{username}/vehicle/{regNo}")
    @ApiOperation("Get a vehicle from a user")
    fun fetchVehicle(
        @PathVariable username: String,
        @PathVariable regNo: String
    ): ResponseEntity<Vehicle> {
        return vehicleService.fetchVehicle(username, regNo)
    }

    @GetMapping("/{username}/vehicles")
    @ApiOperation("Get all vehicles from a user")
    fun fetchVehicles(
        @PathVariable username: String,
    ): ResponseEntity<List<Vehicle>> {
        return vehicleService.fetchVehicles(username)
    }

    @PutMapping("/{username}/vehicle/{regNo}/itp")
    @ApiOperation("Update ITP for a vehicle")
    fun adjustITP(
        @PathVariable username: String,
        @PathVariable regNo: String,
        @RequestBody attribute: VehicleAttribute
    ): ResponseEntity<User> {
        return vehicleService.adjustITP(username, regNo, attribute)

    }

    @PutMapping("/{username}/vehicle/{regNo}/rca")
    @ApiOperation("Update RCA for a vehicle")
    fun adjustRCA(
        @PathVariable username: String,
        @PathVariable regNo: String,
        @RequestBody attribute: VehicleAttribute
    ): ResponseEntity<User> {
        return vehicleService.adjustRCA(username, regNo, attribute)

    }

    @PutMapping("/{username}/vehicle/{regNo}/vig")
    @ApiOperation("Update Vignette for a vehicle")
    fun adjustVIG(
        @PathVariable username: String,
        @PathVariable regNo: String,
        @RequestBody attribute: VehicleAttribute
    ): ResponseEntity<User> {
        return vehicleService.adjustVIG(username, regNo, attribute)

    }

    @PutMapping("/{username}/vehicle/{regNo}/oil")
    @ApiOperation("Update oil change info for a vehicle")
    fun adjustOIL(
        @PathVariable username: String,
        @PathVariable regNo: String,
        @RequestBody attribute: VehicleAttribute
    ): ResponseEntity<User> {
        return vehicleService.adjustOIL(username, regNo, attribute)

    }

    @GetMapping("/{username}/vehicle/{regNo}/alerts")
    @ApiOperation("Check which alerts are active for a vehicle")
    fun checkAlerts(
        @PathVariable username: String,
        @PathVariable regNo: String
    ): ResponseEntity<Document> {
        return vehicleService.checkAlerts(username, regNo)

    }

}