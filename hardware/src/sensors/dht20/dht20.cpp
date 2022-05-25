#include "dht20.hpp"


void dht20::dht20_init() {
  DHT.begin();
  Wire.setClock(400000);
}


void dht20::dht20_read() {
  if (millis() - DHT.lastRead() >= 1000) {
    int status = DHT.read();
    if (status == DHT20_OK) {
        humidity = DHT.getHumidity();
        temperature = DHT.getTemperature();
    } else {
        humidity = INT_MIN;
        temperature = INT_MIN;
    }
  }
}
