#ifndef DHT11_H
#define DHT11_H

#include <DHT.h>
#include <Arduino.h>
#include <config.h>

class dht11 {
    DHT dht_sensor = DHT(DHT_SENSOR_PIN, DHT11);
    public:
    dht11();
    float humidity;
    float temperature;

    void dht_init();
    void dht_read();
};

#endif
