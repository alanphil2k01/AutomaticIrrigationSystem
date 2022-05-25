#include <Arduino.h>
#include <config.h>
#include "soil.hpp"

int get_soil_val() {
    return analogRead(SOIL_PIN);
}
