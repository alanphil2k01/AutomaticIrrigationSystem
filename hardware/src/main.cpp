#include "esp32-hal-adc.h"
#include "esp32-hal-gpio.h"
#include <Arduino.h>
#include <payload/payload.hpp>
#include <wifi/wifi.hpp>
#include <serial_debugger/debug.hpp>
#include <nvs/nvs.hpp>

Payload data;

#define motor 15

void setup() {
    Serial.begin(115200);
    pinMode(motor, OUTPUT);
    analogReadResolution(9);
    // nvs_init();
    // wifi_init();
    data.payload_init();
}

void loop() {
    data.get_payload_data();
    // dht20_read(&d);
    data.debug_payload_data();
    delay(1000);
    // delay(1000);
    // Serial.println("ON");
    // digitalWrite(motor, LOW);
    // delay(1000);
    // digitalWrite(motor, HIGH);
    // Serial.println("OFF");
    // data.get_payload_data();
    // DEBUG("Soil data = %d", data.soil);
}
