#include "DHT20.h"

class dht20 {
    DHT20 DHT;
    public:
    float humidity;
    float temperature;

    void dht20_init();
    void dht20_read();
};

