#include "rain.hpp"

void rain_init() {
    pinMode(RAIN_PIN, INPUT);
}

bool rain_read() {
    if(digitalRead(RAIN_PIN) == LOW) {
        return true;
    }
    return false;
}
