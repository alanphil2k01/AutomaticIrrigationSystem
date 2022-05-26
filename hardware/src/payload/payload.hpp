#include <sensors/sensors.hpp>

class Payload {
    public:
    byte soil;
    int temperature;
    int pressure;
    byte light;
    bool rain;
    dht11 dht;

    Payload();

    void payload_init();
    void get_payload_data();
    void debug_payload_data();
};
