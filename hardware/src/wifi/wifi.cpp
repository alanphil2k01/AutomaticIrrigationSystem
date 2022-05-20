#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <nvs/nvs.hpp>
#include <config.h>
#include "wifi.hpp"

bool wifi_test(void) {
  byte c = 0;
  while (c < 20) {
    if (WiFi.status() == WL_CONNECTED) {
      return true;
    }
    delay(500);
    c++;
  }
  return false;
}

void wifi_init() {
    if(!wifi_test()) {
        // check_eeprom();
    }
}

// bool check_eeprom() {
//     WiFi.mode(WIFI_STA);
//     String ssid = read_from_eeprom(SSID_ADDR, SSID_MAX_LEN);
//     return true;
// }
