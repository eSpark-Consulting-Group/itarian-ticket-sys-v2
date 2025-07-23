package com.itarianticketsys

import android.content.pm.PackageManager
import com.facebook.react.bridge.*

class NavigationAppCheckerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val context = reactContext

    override fun getName(): String = "NavigationAppChecker"

    @ReactMethod
    fun getInstalledNavigationApps(promise: Promise) {
        val knownPackages = mapOf(
            "Google Maps" to "com.google.android.apps.maps",
            "Waze" to "com.waze",
            "HERE WeGo" to "com.here.app.maps",
            "Sygic" to "com.sygic.aura",
            "MAPS.ME" to "com.mapswithme.maps.pro"
        )

        val pm = context.packageManager
        val installedApps = Arguments.createArray()

        knownPackages.forEach { (name, pkg) ->
            try {
                pm.getPackageInfo(pkg, PackageManager.GET_ACTIVITIES)
                val map = Arguments.createMap()
                map.putString("name", name)
                map.putString("package", pkg)
                installedApps.pushMap(map)
            } catch (_: PackageManager.NameNotFoundException) {
                // Not installed
            }
        }

        promise.resolve(installedApps)
    }
}
