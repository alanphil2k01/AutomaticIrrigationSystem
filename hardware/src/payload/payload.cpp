#include <sensors/sensors.h>
#include "payload.hpp"

Payload::Payload() {
    soil = 0;
    temperature = 0;
    humidity = 0;
    pressure = 0;
    light = 0;
    rain = false;
}

void Payload::get_payload_data() {
    soil = get_soil_val();
}
