#include <Wifi.h>
#include <LiquidCrystal_I2C.h>
#include <time.h>
#include <WebServer.h>
#include <Firebase_ESP_Client.h>
//timezone: GMT 
const char* ntp="pool.ntp.org";
const long gmt=19800;
const int dst=0;
const char* ssid="RAJESHHOSSAIN";
const char* pass="jinaT@15";
int mode=0;
bool run = 0;
unsigned long st = 0, t = 0;
LiquidCrystal_I2C lcd(0x3F, 16, 2);
//firebase credentails
#define api "api";
#define db "db url";

FirebaseData fb;
FirebaseAuth fb_auth;
FirebaseConfig fb_cfg;

unsigned long fb_t = 0;
String last_msg = "", task="ot yet given", song = "not playing", msg = "rajibul hossain";
int views = 0; maxm = 6;
bool lb = HIGH, lp = 0, scrl = 0;
int ix = 0;
unsigned long bt=0, sw_s=0, sw_t=0, scr_t=0;
long pm = 1500;

void setup(){
    lcd.init();
    lcd.backlight();
    lcd.print("Booting...");
    configTime(gmt,0, ntp);
    WiFi.begin(ssid,pass);
    while(WiFi.status()!=WL_CONNECTED){
        delay(300); lcd.print(".");
    }
     lcd.clear();
     lcd.print(WiFi.localIP());
}

void loop(){
 struct tm t;
 if(getLocalTime($t)){
    char b[9];
    strftime(b, 9, "%H:%M:%S", &t);
    lcd.setCursor(0, 0);
    lcd.print(b);
 }
 if digitalRead(0)==LOW{
    mode++; if (mode>2) mode=0;
    delay(300);
 }
 if (run) t = millis()-st;
}