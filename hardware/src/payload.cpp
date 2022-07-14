#include "payload.hpp"
#include <debug.hpp>
#include <nvs.hpp>
#include <config.h>

Payload::Payload() {
    device_id = DEVICE_ID;
    soil = 0;
    temperature = 0;
    pressure = 0;
    light = 0;
    rain = false;
    dht.dht_init();
    rain_init();
}

void Payload::get_payload_data() {
    soil = soil_read();
    rain = rain_read();
    light = ldr_read();
    dht.dht_read();
}

void Payload::debug_payload_data() {
    DEBUG("soil=%d, rain=%d, light=%d, humidity=%.2f temperature=%.2f", soil, rain, light, dht.humidity, dht.temperature);
}
