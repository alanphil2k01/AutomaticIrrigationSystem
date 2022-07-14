#ifndef DHT20_H
#define DHT20_H

#include "DHT20.h"
#include <Arduino.h>

class dht20 {
    DHT20 DHT;
    public:
    dht20();
    float humidity;
    float temperature;

    void dht_init();
    void dht_read();
};


#endif
