#include <Arduino.h>
#include "dht11.hpp"

dht11::dht11() {
    humidity = 0;
    temperature = 0;
}

void dht11::dht_init() {
  dht_sensor.begin();
}

void dht11::dht_read() {
  temperature = dht_sensor.readTemperature();
  humidity = dht_sensor.readHumidity();

  if (isnan(temperature)) {
    temperature = 0;
  }
  if (isnan(humidity)) {
    humidity = 0;
  }
}

