# AutomaticIrrigationSystem

Automatic Irrigation System using ESP32 and Firebase.

### Setup
#### ESP32 firmware
```sh
cd hardware
platformio run --target upload
```
#### Web App
Create a ./web-app/.env file with values from firebase project
```
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
```
To run the dev server
```sh
cd web-app
npm install
npm start
```
