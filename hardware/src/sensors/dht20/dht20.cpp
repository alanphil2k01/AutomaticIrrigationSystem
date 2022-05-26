#include "dht20.hpp"

dht20::dht20() {
    humidity = 0;
    temperature = 0;
}

void dht20::dht_init() {
  DHT.begin();
  Wire.setClock(400000);
}


void dht20::dht_read() {
  if (millis() - DHT.lastRead() >= 1000) {
    int status = DHT.read();
    if (status == DHT20_OK) {
        humidity = DHT.getHumidity();
        temperature = DHT.getTemperature();
    } else {
        humidity = 0;
        temperature = 0;
    }
  }
}
