
#define PRINT(...)   Serial.print(__VA_ARGS__)
#define PRINTLN(...) Serial.println(__VA_ARGS__)
#define PRINTF(...)  Serial.printf(__VA_ARGS__)

#define DEBUG(...)   {Serial.print(__FUNCTION__);Serial.print("() ["); \
                     Serial.print(__FILE__); Serial.print(":");Serial.print(__LINE__); Serial.print("]:\t"); \
                     Serial.printf(__VA_ARGS__);Serial.println();}
