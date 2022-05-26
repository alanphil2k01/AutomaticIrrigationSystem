#include "DHT20.h"

class dht20 {
    DHT20 DHT;
    public:
    dht20();
    float humidity;
    float temperature;

    void dht_init();
    void dht_read();
};

