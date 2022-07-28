#include <Arduino.h>
#include <AFMotor.h>

#define INPUT_PIN 2
AF_DCMotor motor(1);

void setup() {
    Serial.begin(9600);
    pinMode(INPUT_PIN, INPUT);
    motor.setSpeed(200);
}

int val = 0;

void loop() {
    val = digitalRead(INPUT_PIN);
    if (val) {
        motor.run(FORWARD);
    } else {
        motor.run(RELEASE);
    }
    Serial.print(val);
    delay(1000);
}
