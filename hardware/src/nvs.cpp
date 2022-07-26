#include <nvs.hpp>

#define WIFI_SSID "ssid"
#define WIFI_PASS "pass"

void nvs_init() {
    NVS.begin();
}

String nvs_get_ssid() {
    return NVS.getString(WIFI_SSID);
}

String nvs_get_pwd() {
    return NVS.getString(WIFI_PASS);
}

void nvs_set_ssid(String ssid) {
    NVS.setString(WIFI_SSID, ssid);
}

void nvs_set_pwd(String pwd) {
    NVS.setString(WIFI_PASS, pwd);
}
