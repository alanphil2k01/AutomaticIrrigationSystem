#include <soil.hpp>

byte soil_read() {
    byte soil_val = map(analogRead(SOIL_PIN), WATER_VAL, DRY_VAL, 100, 0);
    if (soil_val > 100) soil_val = 100;
    return soil_val;
}
