#include <config.h>
#include "firebase.hpp"
#include <WiFi.h>
#include <pump.hpp>
#include <FirebaseESP32.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

String store_path;

bool isPumpRunning = false;
bool start_pump = false;

unsigned long sendDataPrevMillis = 0;
unsigned long handleWaterPumpPrevMillis = 0;

void firebase_init(Payload data) {
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;

  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);

  Firebase.reconnectWiFi(true);
  Firebase.setDoubleDigits(5);

  store_path = data.device_id;
}

void auto_water_pump(byte soil, int min, int max) {
    if (soil < min) {
        if (!isPumpRunning) {
            start_water_pump();
            isPumpRunning = true;
            Firebase.setBool(fbdo, store_path + "/is_pump_running", isPumpRunning);
        }
    } else if (soil >= max) {
        if (isPumpRunning) {
            stop_water_pump();
            isPumpRunning = false;
            Firebase.setBool(fbdo, store_path + "/is_pump_running", isPumpRunning);
        }
        Firebase.setBool(fbdo, store_path + "/start_water_pump", false);
    }
}

void handle_water_pump(bool start_pump, byte soil) {
    if (start_pump) {
        auto_water_pump(soil, MAX_SOIL_THRESHOLD, MAX_SOIL_THRESHOLD);
    } else {
        auto_water_pump(soil, MIN_SOIL_THRESHOLD, MAX_SOIL_THRESHOLD);
    }
}

void firebase_loop(Payload data) {
  if (Firebase.ready() && (millis() - handleWaterPumpPrevMillis > 5000 || handleWaterPumpPrevMillis == 0)) {
    handleWaterPumpPrevMillis = millis();

    Firebase.getBool(fbdo, store_path + "/start_water_pump", &start_pump);
    handle_water_pump(start_pump, data.soil);
  }

  if (Firebase.ready() && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    Firebase.setInt(fbdo, store_path + "/soil", data.soil);
    Firebase.setFloat(fbdo, store_path + "/temperature", data.dht.temperature);
    Firebase.setFloat(fbdo, store_path + "/humidity", data.dht.humidity);
    // send_data_int(data.rain, "rain");
    // send_data_int(data.light, "light");
  }
}
