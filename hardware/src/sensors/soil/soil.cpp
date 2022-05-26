#include <config.h>
#include "soil.hpp"

byte soil_read() {
    return map(analogRead(SOIL_PIN), WATER_VAL, DRY_VAL, 100, 0);
}
