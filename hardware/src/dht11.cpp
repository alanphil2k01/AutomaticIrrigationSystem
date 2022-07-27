#include "esp32-hal.h"
#include <Arduino.h>
#include <dht11.hpp>

dht11::dht11() {
    humidity = 0;
    temperature = 0;
}

void dht11::dht_init() {
  dht_sensor.begin();
}

void dht11::dht_read() {
  float t = dht_sensor.readTemperature();
  delay(500);
  float h = dht_sensor.readHumidity();

  if (!isnan(t)) {
    temperature = t;
  }

  if (!isnan(h)) {
    humidity = h;
  }
}

