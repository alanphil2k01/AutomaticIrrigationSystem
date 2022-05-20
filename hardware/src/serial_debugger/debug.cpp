#include <Arduino.h>
#include <payload/payload.hpp>

void print_sensor_data(char* str, int val) {
    Serial.print(str);
    Serial.println(val);
}

void print_payload(Payload *data) {
    print_sensor_data((char*)"Soil=", data->soil);
    print_sensor_data((char*)"Humidity=", data->humidity);
    print_sensor_data((char*)"Temperature=", data->temperature);
    print_sensor_data((char*)"Soil=", data->soil);
}
