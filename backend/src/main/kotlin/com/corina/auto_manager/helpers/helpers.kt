package com.corina.auto_manager.helpers

import java.util.*

internal fun Date.shouldAlert() = ((this.time / Date().time) / (1000 * 60 * 60 * 24)) <= 7