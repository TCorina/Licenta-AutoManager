package com.corina.auto_manager.models

import com.corina.auto_manager.helpers.shouldAlert
import java.util.*

class VehicleAttribute(
    var startDate: Date,
    var endDate: Date,
    var startKm: Int,
    var endKm: Int? = null
) {

    fun shouldAlert(): Boolean {
        return endDate.shouldAlert()
    }

}


enum class VehicleAttributeType {
    ITP,
    RCA,
    VIG,
    OIL
}