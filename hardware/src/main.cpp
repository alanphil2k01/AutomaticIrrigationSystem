#include "esp32-hal-adc.h"
#include "esp32-hal-gpio.h"
#include <Arduino.h>
#include <wifi.hpp>
#include <debug.hpp>
#include <firebase.hpp>
#include <nvs.hpp>
#include <payload.hpp>

Payload data;

#define motor 15

void setup() {
    Serial.begin(115200);
    pinMode(motor, OUTPUT);
    analogReadResolution(9);
    nvs_init();
    wifi_init();
    data = Payload();
    firebase_init(data);
}

void loop() {
    data.get_payload_data();
    firebase_loop(data);
    delay(1000);
}
