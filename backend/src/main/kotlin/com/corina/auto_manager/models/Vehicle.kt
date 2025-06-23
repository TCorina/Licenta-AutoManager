package com.corina.auto_manager.models

class Vehicle(
    var regNo: String,
    var brand: String,
    var km: Int,
    var itp: VehicleAttribute?,
    var rca: VehicleAttribute?,
    var vignette: VehicleAttribute?,
    var oilChange: VehicleAttribute?
) {



}