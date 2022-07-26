#ifndef PAYLOAD_H
#define PAYLOAD_H

#include <sensors.hpp>

class Payload {
    public:
    String device_id;
    byte soil;
    int temperature;
    int pressure;
    byte light;
    bool rain;
    dht11 dht;

    Payload();

    void get_payload_data();
    void debug_payload_data();
};

#endif
