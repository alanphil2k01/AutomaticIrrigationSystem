#include <ArduinoNvs.h>

void nvs_init();

String nvs_get_ssid();
String nvs_get_pwd();
uint64_t nvs_get_device_id();

void nvs_set_ssid(String);
void nvs_set_pwd(String);
void nvs_set_device_id(uint64_t);
