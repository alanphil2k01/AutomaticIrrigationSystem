#include "ldr.hpp"

void ldr_init() {
    pinMode(LDR_PIN, INPUT);
}

byte ldr_read() {
    return analogRead(LDR_PIN);
}
