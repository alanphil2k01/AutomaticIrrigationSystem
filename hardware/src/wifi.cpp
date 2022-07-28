#include <WiFi.h>
#include <WebServer.h>
#include <nvs.hpp>
#include <wifi.hpp>

const char* ssid = "ESP32-WiFi";
const char* passphrase = "password";

int statusCode;
String st;
String content;
String esid;
String epass = "";
int lastRetry = 0;

WebServer server(80);

void wifi_init() {
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();

    Serial.println("Reading NVS ssid");
    esid = nvs_get_ssid();
    Serial.printf("SSID: %s\n", esid.c_str());

    Serial.println("Reading NVS pass");
    epass = nvs_get_pwd();
    Serial.printf("PASS: %s\n", epass.c_str());

    WiFi.begin(esid.c_str(), epass.c_str());
}


void wifi_loop() {
    if (testWifi()) {
        return;
    } else {
        while ((WiFi.status() != WL_CONNECTED)) {
            delay(100);
            if (millis() - lastRetry > 60000 || lastRetry == 0) {
                lastRetry = millis();
                wifi_init();
                if (!testWifi()) launchWeb();
            }
            server.handleClient();
        }
    }
}

bool testWifi(void) {
    int c = 0;
    while ( c < 20 ) {
        if (WiFi.status() == WL_CONNECTED) {
            return true;
        }
        delay(500);
        Serial.print("*");
        c++;
    }
    Serial.println();
    Serial.println("Connect timed out, opening AP");
    return false;
}

void launchWeb() {
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();

    Serial.print("Local IP: ");
    Serial.println(WiFi.localIP());
    Serial.print("SoftAP IP: ");
    Serial.println(WiFi.softAPIP());

    WiFi.softAP("ESP32-WiFi", "password");

    Serial.println("");
    if (WiFi.status() == WL_CONNECTED)
        Serial.println("WiFi connected");

    Serial.print("Local IP: ");
    Serial.println(WiFi.localIP());
    Serial.print("SoftAP IP: ");
    Serial.println(WiFi.softAPIP());

    createWebServer();
    server.begin();
}

void createWebServer() {
    server.on("/setting", []() {
            String qsid = server.arg("ssid");
            String qpass = server.arg("pass");

            if (qsid.length() > 0 && qpass.length() > 0) {
                Serial.println(qsid);
                Serial.println("");
                Serial.println(qpass);
                Serial.println("");

                Serial.println("writing eeprom ssid:");
                nvs_set_ssid(qsid);

                Serial.println("writing eeprom pass:");
                nvs_set_pwd(qpass);

                content = "{\"Success\":\"Successfully recieved data... restarting device\"}";
                statusCode = 200;
            } else {
                content = "{\"Error\":\"404 not found\"}";
                statusCode = 404;
                Serial.println("Sending 404");
            }
            server.sendHeader("Access-Control-Allow-Origin", "*");
            server.send(statusCode, "application/json", content);
            server.stop();
            if(statusCode == 200) wifi_init();
    });
}
