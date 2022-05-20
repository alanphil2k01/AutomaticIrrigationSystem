#include <Arduino.h>
#include <config.h>
#include "soil.h"

int get_soil_val() {
    return analogRead(SOIL_PIN);
}
