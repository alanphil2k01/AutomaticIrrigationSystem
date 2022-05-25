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
    // nvs_init();
    // wifi_init();
    data.dht.dht20_init();
}

void loop() {
    data.get_payload_data();
    // dht20_read(&d);
    DEBUG("Humidity=%f Temperature=%f", data.dht.humidity, data.dht.temperature);
    delay(500);
    // delay(1000);
    // Serial.println("ON");
    // digitalWrite(motor, LOW);
    // delay(1000);
    // digitalWrite(motor, HIGH);
    // Serial.println("OFF");
    // data.get_payload_data();
    // DEBUG("Soil data = %d", data.soil);
}
