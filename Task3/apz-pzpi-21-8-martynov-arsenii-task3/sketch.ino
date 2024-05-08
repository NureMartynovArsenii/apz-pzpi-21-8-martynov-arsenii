#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include "DHTesp.h"

// Визначення пінів для датчиків
const int PHOTOSENSOR_PIN = 35; // Припустимо, що Photosensor підключений до піна 34
const int NTC_PIN = 34;         // Припустимо, що NTC термістор підключений до піна 15
const int DHT_PIN = 15;
const char* ssid = "Wokwi-GUEST"; // Замените на имя вашей Wi-Fi сети
const char* password = "";
DHT dht(DHT_PIN, DHT22);
// Константи для рівняння Стейнхарта-Гарта
const float BETA = 3950;
const float GAMMA = 0.7;
const float RL10 = 50;
const float Ro = 10000;
const float A = 0.001129148;
const float B = 0.000234125;
const float C = 0.0000000876741;

void setup() {
  Serial.begin(9600); // Установка скорости порта
  analogReadResolution(10); // Установка разрешения АЦП
  pinMode(NTC_PIN, INPUT); // Настройка пина NTC_PIN как вход
  pinMode(PHOTOSENSOR_PIN, INPUT);// Настройка пина 14 как выход
  dht.begin();
  WiFi.begin(ssid, password); // Подключение к Wi-Fi

  // Чекаємо поки не підключимось до Wi-Fi
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");
}
void loop() {
  // Вимірювання та відправка освітленості
  sendLightIntensity();

  // Вимірювання та відправка температури
  sendTemperature();

  sendHumidity();
  delay(10000); // Пауза між вимірюваннями
}

void sendLightIntensity() {
  int lightValue = analogRead(PHOTOSENSOR_PIN);
  // Конвертація в освітленість (прикладна формула, потрібна калібрування)
  float voltage = lightValue / 1024. * 5; 
  float resistance = 2000 * voltage / (1 - voltage / 5);
  float lux = pow(RL10 * 1e3 * pow(10, GAMMA) / resistance, (1 / GAMMA));
  if (isnan(lux)) {
    lux = 0;
  }

  Serial.print("Lux: ");
  Serial.println(lux);

  sendSensorData("LightIntensity", lux);
}

void sendTemperature() {
  int adcValue = analogRead(NTC_PIN);
  Serial.print("ADC Value: ");
  Serial.println(adcValue);
  if (adcValue <= 1) {
    Serial.println("NTC read error");
    return;
  }
  // Calculate the voltage across the thermistor
  float Vout = (adcValue * 3.3) / 1023.0;
  // Calculate the resistance of the thermistor
  float Rt = (Vout * Ro) / (3.3 - Vout);
  // Steinhart-Hart Equation to calculate temperature in Kelvin
  float TempK = 1 / (A + (B * log(Rt)) + C * pow(log(Rt), 3));
  // Convert Kelvin to Celsius
  float TempC = TempK - 273.15;

  if (isnan(TempC)) {
    Serial.println("Failed to read from NTC sensor!");
    return;
  }

  Serial.print("Temperature: ");
  Serial.print(TempC);
  Serial.println(" ℃");
  sendSensorData("Temperature", TempC);
}

void sendHumidity() {
  float humidity = dht.readHumidity();
  if (isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  sendSensorData("Humidity", humidity);
}


void sendSensorData(const char* type, float value) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("http://70e4-2a03-7380-238a-357-68f5-8037-7b59-50d2.ngrok-free.app/api/Measurements");
    http.addHeader("Content-Type", "application/json");

    StaticJsonDocument<200> jsonDoc;
    jsonDoc["DeviceId"] = "ESP32_Device";
    jsonDoc["MeasurementType"] = type;
    jsonDoc["Value"] = String(value); // Конвертація числа в рядок

    String requestBody;
    serializeJson(jsonDoc, requestBody);

    int httpResponseCode = http.POST(requestBody);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    } else {
      Serial.print("Error on sending POST: ");
      Serial.println(httpResponseCode);
    }

    http.end();
  } else {
    Serial.println("Error in WiFi connection");
  }
}
