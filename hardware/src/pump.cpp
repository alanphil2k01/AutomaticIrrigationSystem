#include "esp32-hal-gpio.h"
#include <pump.hpp>
#include <Arduino.h>
#include <config.h>

void pump_init() {
    pinMode(PUMP_PIN, OUTPUT);
    digitalWrite(PUMP_PIN, LOW);
}

void start_water_pump() {
    digitalWrite(PUMP_PIN, HIGH);
}

void stop_water_pump() {
    digitalWrite(PUMP_PIN, LOW);
}
