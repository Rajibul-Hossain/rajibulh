#include <Wifi.h>
#include <LiquidCrystal_I2C.h>
#include <time.h>

const char* ntp="pool.ntp.org";
const long gmt=19800;
const char* ssid="RAJESHHOSSAIN";
const char* pass="jinaT@15";
LiquidCrystal_I2C lcd(0x3F, 16, 2);

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
}