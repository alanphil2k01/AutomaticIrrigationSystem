#include "ldr.hpp"

int ldr_read() {
    return analogRead(LDR_PIN);
}
