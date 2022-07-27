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

void send_data_int(int data, String loc) {
    Serial.printf("%s value = %d\n", loc.c_str(), data);
    Serial.printf("Set %s data... %s\n", loc.c_str(), Firebase.setInt(fbdo, store_path + "/" + loc, data) ? "ok" : fbdo.errorReason().c_str());
}

void firebase_loop(Payload data) {
  if (Firebase.ready() && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    send_data_int(data.soil, "soil");
    send_data_int(data.dht.temperature, "temperature");
    send_data_int(data.dht.humidity, "humidity");
    send_data_int(data.rain, "rain");
    send_data_int(data.light, "light");

    Serial.println();
  }
}
