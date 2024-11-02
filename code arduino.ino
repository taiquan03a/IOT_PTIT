#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include "DHT.h"


DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "iPhone";
const char* password = "123456789";

const char* mqtt_server = "172.20.10.2";
const char* mqtt_username = "taiquan"; // MQTT username
const char* mqtt_password = "b21dccn614"; // MQTT password

WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

#define DHTPIN 14
#define AO_PIN 34
#define DHTTYPE DHT11 
// LED Pin
const int ledPin1 = 4;
const int ledPin2 = 21;
const int ledPin3 = 18;
const int ledPin4 = 13;

bool led1State = LOW;
bool led2State = LOW;
bool led3State = LOW;
bool led4State = LOW;

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 2004);
  client.setCallback(callback);
  dht.begin();
  pinMode(AO_PIN, INPUT);
  pinMode(ledPin1, OUTPUT);
  pinMode(ledPin2, OUTPUT);
  pinMode(ledPin3, OUTPUT);
  pinMode(ledPin4, OUTPUT);
}

void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();
  
  if (String(topic) == "esp32/output") {
    if(messageTemp == "onLed1" && led1State == LOW){
      Serial.println("onLed1");
      led1State = HIGH;
      digitalWrite(ledPin1, HIGH);
      client.publish("response",String("onLed1").c_str());
    }
    else if(messageTemp == "offLed1" && led1State == HIGH){
      led1State = LOW;
      Serial.println("offLed1");
      digitalWrite(ledPin1, LOW);
      client.publish("response",String("offLed1").c_str());
    }
    else if(messageTemp == "onLed2" && led2State == LOW){
      Serial.println("onLed2");
      led2State = HIGH;
      digitalWrite(ledPin2, HIGH);
      client.publish("response",String("onLed2").c_str());
    }
    else if(messageTemp == "offLed2" && led2State == HIGH){
      Serial.println("offLed2");
      led2State = LOW;
      digitalWrite(ledPin2, LOW);
      client.publish("response",String("offLed2").c_str());
    }
    else if(messageTemp == "onLed3" && led3State == LOW){
      Serial.println("onLed3");
      led3State = HIGH;
      digitalWrite(ledPin3, HIGH);
      client.publish("response",String("onLed3").c_str());
    }
    else if(messageTemp == "offLed3" && led3State == HIGH){
      Serial.println("offLed3");
      led3State = LOW;
      digitalWrite(ledPin3, LOW);
      client.publish("response",String("offLed3").c_str());
    }
    else if(messageTemp == "onLed4" && led4State == LOW){
      Serial.println("onLed4");
      led4State = HIGH;
      digitalWrite(ledPin4, HIGH);
      client.publish("response",String("onLed4").c_str());
    }
    else if(messageTemp == "offLed4" && led4State == HIGH){
      Serial.println("offLed4");
      led4State = LOW;
      digitalWrite(ledPin4, LOW);
      client.publish("response",String("offLed4").c_str());
    }
    else if(messageTemp == "onAll"){
      Serial.println("on All led");
      if(led1State == LOW) {
        led1State = HIGH;
        digitalWrite(ledPin1, HIGH);
        client.publish("response",String("onLed1").c_str());
      }
      if(led2State == LOW){
        led2State = HIGH;
        digitalWrite(ledPin2, HIGH);
        client.publish("response",String("onLed2").c_str());
      } 
      if(led3State == LOW){
        led3State = HIGH;
        digitalWrite(ledPin3, HIGH);
        client.publish("response",String("onLed3").c_str());
      }
      
    }
    else if(messageTemp == "offAll"){
      Serial.println("off All led");
      if(led1State == HIGH) {
        led1State = LOW;
        digitalWrite(ledPin1, LOW);
        client.publish("response",String("offLed1").c_str());
      }
      if(led2State == HIGH){
        led2State = LOW;
        digitalWrite(ledPin2, LOW);
        client.publish("response",String("offLed2").c_str());
      } 
      if(led3State == HIGH){
        led3State = LOW;
        digitalWrite(ledPin3, LOW);
        client.publish("response",String("offLed3").c_str());
      }
    }else {
      client.publish("response",String("false").c_str());
    }
  }  
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32Client",mqtt_username, mqtt_password)) {
      Serial.println("connected");
      // Subscribe
      client.subscribe("esp32/output");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

long interval = 2000; // khoảng thời gian giữa các lần gửi dữ liệu sensor

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  
  // Gọi hàm client.loop() liên tục để kiểm tra tin nhắn từ MQTT broker
  client.loop();
  
  // Lấy thời gian hiện tại
  long now = millis();
  
  // Kiểm tra nếu đã đủ thời gian để gửi dữ liệu sensor
  if (now - lastMsg > interval) {
    lastMsg = now;
    
    // Đọc cảm biến và gửi dữ liệu
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    float lightValue = (float)analogRead(AO_PIN);
    int randomValue = random(0, 101);
    Serial.println(randomValue);

    Serial.print("Humidity: ");
    Serial.print(h);
    Serial.println(" %");
    Serial.print("Temperature: ");
    Serial.print(t);
    Serial.println(" *C");
    Serial.print("Light: ");
    Serial.println(lightValue);

    if (client.publish("data/sensor", ("{\"temperature\":" + String(t) +  ", \"humidity\":" + String(h) + ", \"light\":" + String(lightValue) + ", \"random\":" + String(randomValue) + "}").c_str())) {
      Serial.println("{\"temperature\":" + String(t) +  ", \"humidity\":" + String(h) + ", \"light\":" + String(lightValue) + ", \"random\":" + String(randomValue) + "}");
      if(randomValue > 70){
        for (int i = 0; i < 2; i++) {
          digitalWrite(ledPin4, HIGH);  // Bật LED
          delay(500);                 // Chờ 1 giây
          digitalWrite(ledPin4, LOW);   // Tắt LED
          delay(500);                 // Chờ 1 giây
        }
        if(led4State == LOW){
          digitalWrite(ledPin4, LOW);
        }else{
          digitalWrite(ledPin4, HIGH);
        }
      }
    } else {
      Serial.println("Humidity failed to send. Reconnecting to MQTT Broker and trying again");
      client.connect("ESP32Client", mqtt_username, mqtt_password);
      delay(10);
      client.publish("data/sensor",("{temperature:" + String(t) + ",humidity:" + String(h) + ",light:" + String(lightValue) + "}").c_str());
            if(randomValue > 70){
        for (int i = 0; i < 4; i++) {
          digitalWrite(ledPin4, HIGH);  // Bật LED
          delay(500);                 // Chờ 1 giây
          digitalWrite(ledPin4, LOW);   // Tắt LED
          delay(500);                 // Chờ 1 giây
        }
      }
    }
  }
}
