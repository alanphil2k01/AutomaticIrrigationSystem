#include <Arduino.h>
#include <payload/payload.hpp>
#include <wifi/wifi.hpp>
#include <serial_debugger/debug.hpp>
#include <nvs/nvs.hpp>

Payload data;

void setup() {
    Serial.begin(115200);
    nvs_init();
    wifi_init();
}

void loop() {
    data.get_payload_data();
    DEBUG("Soil data = %d", data.soil);
}
