#include <sensors/sensors.hpp>

class Payload {
    public:
    int soil;
    int temperature;
    int humidity;
    int pressure;
    int light;
    bool rain;
    dht20 dht;

    Payload();

    void get_payload_data();
};
