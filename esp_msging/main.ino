#include <Wifi.h>
#include <LiquidCrystal_I2C.h>
#include <time.h>

const char* ntp="pool.ntp.org";
const long gmt=19800;
LiquidCrystal_I2C lcd(0x3F, 16, 2);

void setup(){
    lcd.init();
    lcd.backlight();
    lcd.print("Booting...");
    configTime(gmt,0, ntp);
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