#include <Arduino.h>
#include <wifi.hpp>
#include <debug.hpp>
#include <firebase.hpp>
#include <nvs.hpp>
#include <pump.hpp>
#include <payload.hpp>

Payload data;

void setup() {
    Serial.begin(115200);
    analogReadResolution(9);
    nvs_init();
    pump_init();
    wifi_init();
    firebase_init(data);
    data = Payload();
}

void loop() {
    wifi_loop();
    data.get_payload_data();
    firebase_loop(data);
    delay(1000);
}
