#include <Arduino.h>
#include <payload.hpp>

void print_sensor_data(char* str, int val) {
    Serial.print(str);
    Serial.println(val);
}

void print_payload(Payload *data) {
    print_sensor_data((char*)"Soil=", data->soil);
    print_sensor_data((char*)"Humidity=", data->dht.humidity);
    print_sensor_data((char*)"Temperature=", data->dht.temperature);
    print_sensor_data((char*)"Soil=", data->soil);
}
