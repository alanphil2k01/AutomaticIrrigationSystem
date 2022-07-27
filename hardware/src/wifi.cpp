#include <WiFi.h>
#include <WebServer.h>
#include <nvs.hpp>
#include "wifi.hpp"

const char* ssid = "ESP32-WiFi";
const char* passphrase = "password";

int statusCode;
String st;
String content;
String esid;
String epass = "";


bool testWifi(void);
void launchWeb(void);
void setupAP(void);
void createWebServer(void);

WebServer server(80);

void wifi_init() {
    WiFi.disconnect();

    Serial.println("Reading NVS ssid");
    esid = nvs_get_ssid();
    Serial.println();
    Serial.printf("SSID: %s\n", esid.c_str());

    Serial.println("Reading NVS pass");
    epass = nvs_get_pwd();
    Serial.printf("PASS: %s\n", epass.c_str());

    WiFi.begin(esid.c_str(), epass.c_str());
    wifi_loop();
}

void wifi_loop() {
    if (testWifi()) {
        return;
    } else {
        launchWeb();
        setupAP();
    }

    while ((WiFi.status() != WL_CONNECTED)) {
        delay(100);
        server.handleClient();
    }
    delay(1000);
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
    Serial.println("");
    Serial.println("Connect timed out, opening AP");
    return false;
}

void launchWeb() {
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

void setupAP(void) {
    WiFi.mode(WIFI_STA);
    WiFi.disconnect();
    delay(100);
    byte n = WiFi.scanNetworks();
    Serial.println("scan done");
    if (n == 0)
        Serial.println("no networks found");
    else {
        Serial.print(n);
        Serial.println(" networks found");
        for (int i = 0; i < n; ++i) {
            Serial.print(i + 1);
            Serial.print(": ");
            Serial.print(WiFi.SSID(i));
            Serial.print(" (");
            Serial.print(WiFi.RSSI(i));
            Serial.print(")");
            delay(10);
        }
    }

    st = "<ol>";
    for (int i = 0; i < n; ++i) {
        // Print SSID and RSSI for each network found
        st += "<li>";
        st += WiFi.SSID(i);
        st += " (";
        st += WiFi.RSSI(i);
        st += ")";
        //st += (WiFi.encryptionType(i) == ENC_TYPE_NONE) ? " " : "*";
        st += "</li>";
    }
    st += "</ol>";
    delay(100);

    WiFi.softAP("ESP32-WiFi", "password");
    launchWeb();
}

void createWebServer() {
    server.on("/", []() {
            IPAddress ip = WiFi.softAPIP();
            String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);
            content = "<!DOCTYPE HTML>\r\n<html>Welcome to Wifi Credentials Update page";
            content += "<form action=\"/scan\" method=\"POST\"><input type=\"submit\" value=\"scan\"></form>";
            content += ipStr;
            content += "<p>";
            content += st;
            content += "</p><form method='get' action='setting'><label>SSID: </label><input name='ssid' length=32><input name='pass' length=64><input type='submit'></form>";
            content += "</html>";
            server.send(200, "text/html", content);
            });

    server.on("/scan", []() {
            //setupAP();
            IPAddress ip = WiFi.softAPIP();
            String ipStr = String(ip[0]) + '.' + String(ip[1]) + '.' + String(ip[2]) + '.' + String(ip[3]);
            content = "<!DOCTYPE HTML>\r\n<html>go back";
            server.send(200, "text/html", content);
            });

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
                ESP.restart();
            } else {
                content = "{\"Error\":\"404 not found\"}";
                statusCode = 404;
                Serial.println("Sending 404");
            }
            server.sendHeader("Access-Control-Allow-Origin", "*");
            server.send(statusCode, "application/json", content);
    });
}
