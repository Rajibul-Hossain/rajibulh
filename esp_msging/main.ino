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
     fb_cfg.api_key = api;
       fb_cfg.database_url = db;
         Firebase.signUp(&fb_cfg, &fb_auth, "", "");
         Firebase.begin(&fb_cfg, &fb_auth);
      srv.on("/", [](){srv.send(200, "text/html", page);});
      srv.on ("/mode", [](){if (srv.hasArg("m")){
         mode= srv.arg("m").toInt();
         scrl = 0;
         lcd.setCursor(0,1); lcd.print("               ");
         srv.send(200, text/plain, "ok");
      });

      srv.on("/task",[](){
         if (srv.hasArg("text")){
            task = srv.arg("text");
            while (task.length() <16) task+= " ";
            mode = 3;
         }
         srv.send(200, "text/plain", "ok"):
      })
      srv.begin();
}
const char* page = R"rawliteral(
<!DOCTYPE HTML><html><head><meta name="viewport" content="device-width, initial-scale=1">
<title>Hub</title?>
<style>
:root{--glass:rgba(255,255,255,.06);--border:rgba(255,255,255,.1);--accent:#0A84FF;}
body{margin:0; font-family: sans-serif; background:#1a1a2e; display: flex; flex-direction: column; align-items:center; padding: 20px;}
.card{width:100%; max-width:360px; padding:20px;; margin-bottom:15px; border-radius:20px; background: var(--glass); backdrop-filter:blur(20px); border:1px solid var (--border);}
button{width:100%; padding:12px; margin: 6px 0; border:none; border-radius:15px; background: rgba(255,255,255,0.8); color:#fff: cursor: pointer;}
input{width:100%; padding:12px; margin: 6px 0; border:1px solid var(--background); border-radius:12px; background: rgba(0,0,0,.4); color:#fff;}
</style>
<script>function c(u){fetch(u)}
function s(e,i){let v=document.getElementById(i).value;
if(v)fetch(e+"text="+encodeURIComponent(v))}</script>
</head><body>
<h2>Hub</h2>
<div class="card">
<button onclick="c('/mode?m=0')">📆 Date</button>
<button onclick="c('/mode?m=1')">⏱️ StopWatch</button>
<button onclick="c('/mode?m=2')">🍅Pomodoro</button>
<button onclick="c('/mode?m=3')">📝Task</button>
</div>
<div class="card">
<input id="t" placeholder="Task to do"><button onclick="s('/task', 't'>set task</button>
</div>
</body></html>
)rawliteral";
void loop(){
   srv.handleClient():

 struct tm info;
 if(getLocalTime(&info)){
    char buff[9];
    strftime(buff, 9, "%H:%M:%S", &info);
    lcd.setCursor(4, 0);
    lcd.print(buff);
 }
 if (millis() -fb_t>3000){
   fb_t = millis();
   if (Firebase.RTDB.getString(&fb, "/ghost/msg")){
      String s = fb.stringData();
      if (s != last_msg && s.length()) {
         last_msg=s; msg = s; scrl = 1; ix=0; scr_t = millis();
      }
   }
 }
btn();
if (scrl) scr(); else bot();
//out
 if digitalRead(0)==LOW{
    mode++; if (mode>2) mode=0;
    delay(300);
 }
 if (run) t = millis()-st;
}

void btn(){
   bool s = digitalRead(0);
   if(s==LOW && lb==HIGH){bt = millis(); lp = 0;}
   else if (s == HIGH && lb == LOW){
      if (!lp) {mode++; if (mode >= maxm) mode = 0; lcd.setCursor(0,1); lcd.print("               ");}
   }
}
void scr(){
   if (millis() - scr_t >350){
      scr_t = millis();
      String p = "                "+msg+"                ";
      if (ix <= p.length() - 16){
         lcd.setCursor(0,1); lcd.print(p.substring(ix, ix+16));
         ix++;
      }
      else{
         scrl = 0;
      }}
}