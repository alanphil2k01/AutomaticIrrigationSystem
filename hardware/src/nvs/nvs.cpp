#include "nvs.hpp"

#define WIFI_SSID "ssid"
#define WIFI_PASS "pass"
#define DEVICE_ID "device_id"

void nvs_init() {
    NVS.begin();
}

String nvs_get_ssid() {
    return NVS.getString(WIFI_SSID);
}

String nvs_get_pwd() {
    return NVS.getString(WIFI_PASS);
}

uint64_t nvs_get_device_id() {
    return NVS.getInt(DEVICE_ID);
}

void nvs_set_ssid(String ssid) {
    NVS.setString(WIFI_SSID, ssid);
}

void nvs_set_pwd(String pwd) {
    NVS.setString(WIFI_PASS, pwd);
}

void nvs_set_device_id(uint64_t device_id) {
    NVS.setInt(DEVICE_ID, device_id);
}
