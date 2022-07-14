#include <config.h>
#include "firebase.hpp"
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

String store_path;

unsigned long sendDataPrevMillis = 0;

void firebase_init(Payload data) {
  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;

  config.token_status_callback = tokenStatusCallback;

  Firebase.begin(&config, &auth);

  Firebase.reconnectWiFi(true);
  Firebase.setDoubleDigits(5);

  store_path = data.device_id;
  Serial.println(store_path);
}

void firebase_loop(Payload data) {
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    Serial.printf("Soil value = %d\n", data.soil);
    Serial.printf("Set soil data... %s\n", Firebase.setInt(fbdo, store_path + "/soil", data.soil) ? "ok" : fbdo.errorReason().c_str());
    Serial.println();
  }
}
