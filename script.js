// go to projects
function clickBtn() {
    console.log("click registered");
    alert("Navigating to projects...");
}

function onHover(card) {
    card.style.border = "4px solid #fff";
    card.style.transform = "scale(1.05)";
    card.style.cursor = "pointer";
}

// reset card
function offHover(card) {
    card.style.border = "4px solid #111";
    card.style.transform = "scale(1)";
}

function sendMsg(e) {
    e.preventDefault(); // stop page reload
    
    let name = document.getElementById("visitorName").value;
    let msg = document.getElementById("visitorMessage").value;
    console.log("From: " + name + " | Msg: " + msg);
    alert("Sign placed! Thanks " + name);
    
    document.getElementById("contactForm").reset();
}

let blocks = document.querySelectorAll('.mc-card');
for (let i = 0; i < blocks.length; i++) {
    blocks[i].dataset.hits = 0; // set start count
    
    blocks[i].addEventListener('click', function() {
        let hits = parseInt(this.dataset.hits) + 1;
        this.dataset.hits = hits;
        
        let oldBg = this.style.backgroundColor;
        this.style.backgroundColor = "#ff5555";
        
        let currentBlock = this;
        setTimeout(function() {
            currentBlock.style.backgroundColor = oldBg;
        }, 150);
        
        if (hits >= 5) {
            this.style.display = 'none';
            console.log("boom! block broken");
        }
    });
}
function openPop(title, desc) {
    document.getElementById("popTitle").innerText = title;
    document.getElementById("popDesc").innerText = desc;
    
    document.getElementById("projModal").style.display = "flex";
}
function closePop() {
    document.getElementById("projModal").style.display = "none";
}
function open_ar(btn) {
    let bg = document.getElementById("achieveBg");
    let box = document.getElementById("achieveBox");

    let btnPos = btn.getBoundingClientRect();

    bg.style.display = "block";

    box.style.left = btnPos.left + "px";
    box.style.top = btnPos.top + "px";
    box.style.transform = "scale(0)";
    box.style.opacity = "0";

    setTimeout(function() {
        box.style.left = "50%";
        box.style.top = "50%";
        box.style.transform = "translate(-50%, -50%) scale(1)";
        box.style.opacity = "1";
    }, 10);
}
function close_ar() {
    let bg = document.getElementById("achieveBg");
    let box = document.getElementById("achieveBox");
    box.style.left = "20px";
    box.style.top = "50%";
    box.style.transform = "translate(0, -50%) scale(0)";
    box.style.opacity = "0";
    setTimeout(function() {
        bg.style.display = "none";
    }, 350);
}
let panels = document.querySelectorAll('.side-panel');
panels.forEach(panel => {
    panel.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
       
            this.classList.toggle('active-mobile');
            
            if (this.classList.contains('active-mobile')) {
                this.style.animation = "none";
            } else {
                this.style.animation = ""; 
            }
        }});});
document.querySelector('body').addEventListener('click', function(e) {
    if (!e.target.closest('.side-panel') && window.innerWidth <= 768) {
        panels.forEach(p => p.classList.remove('active-mobile'));
    }
}, true);
let inputStr = "";

document.addEventListener('keydown', function(e) {
    inputStr += e.key.toLowerCase();
    
    if (inputStr.endsWith("goat")) {
        activateGoatMode();
        inputStr = ""; 
}
    if (inputStr.length > 10) inputStr = inputStr.slice(1);
});

function activateGoatMode() {
    document.body.style.transition = "all 1s ease";
    document.body.style.backgroundColor = "#2b2300"; 
    let levelTxt = document.querySelector('.magic-tt');
    if (levelTxt) levelTxt.style.cssText = "filter: drop-shadow(0 0 6px #ffaa00) drop-shadow(0 0 14px #ff9900) drop-shadow(0 0 28px #ff5500); text-shadow: 0 0 8px #ffaa00, 0 0 18px #ff8800, 0 0 36px rgba(255,140,0,0.7); transform: scale(1.08); transition: all 0.25s ease; animation: glowPulse 1.4s infinite ease-in-out;";

document.body.innerHTML += `<div id="coolTxt" style="
position:fixed;
top:50%;
left:50%;
transform:translate(-50%,-50%) scale(0.8);
font-size:4rem;
font-weight:bold;
color:#ffaa00;
text-shadow:0 0 10px #ffaa00,0 0 25px #ff8800,0 0 50px #ff5500;
z-index:9999;
opacity:0;
transition:all 0.4s ease;
">THIS IS COOL</div>`;

let coolTxt = document.getElementById("coolTxt");

setTimeout(() => {
    coolTxt.style.opacity = "1";
    coolTxt.style.transform = "translate(-50%,-50%) scale(1.1)";
}, 50);

setTimeout(() => {
    coolTxt.style.opacity = "0";
    coolTxt.style.transform = "translate(-50%,-50%) scale(0.8)";
}, 1200);

setTimeout(() => {
    coolTxt.remove();
}, 3000);
    showToast("GOAT STATUS", "Legendary theme unlocked!");
    console.log("GOAT mode on. You're the best, Rajibul.");
}
function runCmd(e) {
    if (e.key === 'Enter' || e.keyCode === 13) {
        let inputBox = document.getElementById("termInput");
        let log = document.getElementById("termLog");
        let cmd = inputBox.value.trim().toLowerCase();

        log.innerHTML += `<p class="term-txt"><span class="term-prompt">C:\\Rajibul></span> ${cmd}</p>`;

        if (cmd === '/projects') {
            log.innerHTML += `<p class="term-txt">> Opening inventory...</p>`;
            window.location.href = "#projects";
        } 
        else if (cmd === '/skills') {
            log.innerHTML += `<p class="term-txt">> Fetching player stats...</p>`;
            window.location.href = "#skills";
        }
        else if (cmd === '/contact') {
            log.innerHTML += `<p class="term-txt">> Loading wooden sign...</p>`;
            window.location.href = "#contact";
        }
        else if (cmd === '/botani') {
            log.innerHTML += `<p class="term-txt">> Triggering project modal...</p>`;
            openPop('Botani Talk', 'ESP32-based smart plant monitor. Features an AI dashboard with emotional plant status updates.');
        }
        else if (cmd === '/team') {
            log.innerHTML += `<p class="term-txt" style="color:#55ffff;">> I am an individual project maker</p>`;
        }
        else if (cmd === '/secret') {
            log.innerHTML += `<p class="term-txt" style="color:#ff55ff;">> Secret unlocked! ❤️</p>`;
        }
        else if (cmd === '/about') {
            log.innerHTML += `<p class="term-txt">> Loading player bio...</p>`;
            window.location.href = "#about";
        }
        else if (cmd === '/resume') {
            log.innerHTML += `<p class="term-txt">> Downloading resume...</p>`;
            window.open("resume.pdf", "_blank");
        }
        else if (cmd === '/github') {
            log.innerHTML += `<p class="term-txt">> Opening GitHub portal...</p>`;
            window.open("https://github.com/", "_blank");
        }
        else if (cmd === '/time') {
            let now = new Date().toLocaleTimeString();
            log.innerHTML += `<p class="term-txt">> Current time: ${now}</p>`;
        }
        else if (cmd === '/date') {
            let today = new Date().toDateString();
            log.innerHTML += `<p class="term-txt">> Today is ${today}</p>`;
        }
        else if (cmd === '/whoami') {
            log.innerHTML += `<p class="term-txt">> Rajibul | Developer | Builder</p>`;
        }
        else if (cmd === '/help') {
            log.innerHTML += `<p class="term-txt">> Commands: /projects /skills /contact /about /botani /team /resume /github /time /date /whoami /clear</p>`;
        }
        else if (cmd === '/hack') {
            log.innerHTML += `<p class="term-txt" style="color:#00ff00;">> Access granted... LOL!</p>`;
        }
        else if (cmd === '/clear') {
            log.innerHTML = `<p class="term-txt">Terminal cleared.</p>`;
        }
                else if (cmd === '/help') {
            log.innerHTML = `<p class="term-txt">> Commands: /projects /skills /contact /about /botani /team /resume /github /time /date /whoami /logs /clear</p>`;
        }
        else if (cmd === '/crafting' || cmd === '/logs') {
            log.innerHTML += `<p class="term-txt" style="color:#55ff55;">> Accessing Crafting Logs...</p>`;
            logs()
        }
        else if (cmd !== "") {
            log.innerHTML += `<p class="term-txt" style="color:#ff5555;">> Error: Unknown command. Try /help for a list of commands</p>`;
        }
        
        inputBox.value = "";
        log.scrollTop = log.scrollHeight;
    }
}
function logs() {
    let ui = document.getElementById("craftingUI");
    ui.style.display = "flex";
    
    ui.style.animation = "chestOpen 0.3s ease-out";
}

function closeCrafting() {
    document.getElementById("craftingUI").style.display = "none";
}
function loadLog(project, clickedBtn) {
    let slots = document.querySelectorAll('.recipe-slot');
    slots.forEach(slot => slot.classList.remove('active-recipe'));
    
    clickedBtn.classList.add('active-recipe');
if (project === 'botani') {
    document.getElementById("logTitle").innerText = "Botani Talk";
    document.getElementById("logRecipe").innerText = "ESP32 + Soil Moisture Sensor + DB + AI API";
    document.getElementById("logWhy").innerText = "My plants kept dying because I forgot to water them. I wanted a system that actually gave the plant an 'emotional' voice to yell at me when thirsty.";
    document.getElementById("logProb").innerText = "The cheap analog soil sensors kept corroding within a week due to electrolysis. API rate limits were also an issue.";
    document.getElementById("logTrade").innerText = "Instead of leaving the sensor powered 24/7, I coded the ESP32 to only send power for 1 second every hour. Saved the hardware, but sacrificed real-time data.";
} 

else if (project === 'hamara') {
    document.getElementById("logTitle").innerText = "HamaraLabs";
    document.getElementById("logRecipe").innerText = "Web Stack + Firebase + Bulk Automation";
    document.getElementById("logWhy").innerText = "ATL Mentors and students were struggling with task management. Needed a centralized digital platform to handle bulk enrollments and task assignments smoothly.";
    document.getElementById("logProb").innerText = "Syncing real-time updates for bulk task generation was causing the database to choke and the UI to freeze for mentors.";
    document.getElementById("logTrade").innerText = "Sacrificed live-typing features for a batched-update system. It saves DB reads and keeps the platform lightweight, even though it takes an extra second to refresh.";
}

else if (project === 'wheel') {
    document.getElementById("logTitle").innerText = "Eye-Controlled Wheelchair";
    document.getElementById("logRecipe").innerText = "Python (OpenCV/Mediapipe) + Arduino + L298N Motor Driver";
    document.getElementById("logWhy").innerText = "Wanted to build hardware for accessibility that doesn't cost thousands of dollars. Using standard webcams to track iris movement seemed like a perfect challenge.";
    document.getElementById("logProb").innerText = "Computer vision processing lag was causing the Arduino to receive delayed serial commands, making the wheelchair stutter dangerously.";
    document.getElementById("logTrade").innerText = "Lowered the camera resolution and aggressively cropped the processing frame just to the eyes. Dropped video quality, but gained the crucial 60fps needed for safe motor control.";
}

else if (project === 'pi-server') {
    document.getElementById("logTitle").innerText = "Raspberry Pi Home Server";
    document.getElementById("logRecipe").innerText = "Raspberry Pi 3B + Pi-hole + File Server + DNS";
    document.getElementById("logWhy").innerText = "Wanted full control over my home network instead of relying on external services. Also a good way to learn real networking.";
    document.getElementById("logProb").innerText = "Limited RAM (1GB) caused slowdowns when running multiple services together.";
    document.getElementById("logTrade").innerText = "Dropped heavier services and optimized everything to lightweight alternatives. Not flashy, but stable and always running.";
}

else if (project === 'portfolio') {
    document.getElementById("logTitle").innerText = "Minecraft Portfolio";
    document.getElementById("logRecipe").innerText = "HTML + CSS + JavaScript + Custom UI Logic";
    document.getElementById("logWhy").innerText = "Didn’t want another boring portfolio. Wanted something that actually reflects how I think and build.";
    document.getElementById("logProb").innerText = "Balancing heavy animations with performance, especially on mobile devices.";
    document.getElementById("logTrade").innerText = "Reduced animation intensity on smaller screens. Looks slightly less cool, but keeps it smooth and usable.";
}

else if (project === 'dns') {
    document.getElementById("logTitle").innerText = "Private DNS / Ad Blocker";
    document.getElementById("logRecipe").innerText = "Pi-hole + Custom Blocklists";
    document.getElementById("logWhy").innerText = "Ads everywhere were slowing down browsing and felt unnecessary. Wanted a network-wide solution.";
    document.getElementById("logProb").innerText = "Some essential services broke because they relied on blocked domains.";
    document.getElementById("logTrade").innerText = "Whitelisted required domains manually. Less aggressive blocking, but keeps everything functional.";
}

else if (project === 'file-share') {
    document.getElementById("logTitle").innerText = "Local File Sharing System";
    document.getElementById("logRecipe").innerText = "Raspberry Pi + Samba / HTTP Server";
    document.getElementById("logWhy").innerText = "Needed a simple way to share files across devices at home without using cloud storage.";
    document.getElementById("logProb").innerText = "Network permissions and access control were confusing to set up properly.";
    document.getElementById("logTrade").innerText = "Kept it simple with basic authentication instead of complex user roles. Easier to use, slightly less secure.";
}

else {
    document.getElementById("logTitle").innerText = "Unknown Project";
    document.getElementById("logRecipe").innerText = "-";
    document.getElementById("logWhy").innerText = "No data available.";
    document.getElementById("logProb").innerText = "-";
    document.getElementById("logTrade").innerText = "-";
}
}
function checkPiStatus() {
    const piIP = "http://192.168.29.35";
    const statusText = document.getElementById("piStatusText");
    let img = new Image();
    let startTime = Date.now();
    img.onload = function() {
        let ping = Date.now() - startTime;
        if(statusText) {
            statusText.innerHTML = `Online <span style="color: #55ffff; font-size: 14px;">(${ping}ms)</span>`;
            statusText.className = "sys-val glow-green"; 
            statusText.style.color = ""; 
        }
    };
    img.onerror = function() {
        if(statusText) {
            statusText.innerHTML = `Online<span style="color: #55ff6c; font-size: 14px;">(Connected)</span>`;
            statusText.className = "sys-val";
            statusText.style.color = "#5bff55"; 
            statusText.style.textShadow = "0 0 8px rgba(85, 255, 218, 0.47)"; 
        }
    };

    img.src = piIP + "/favicon.ico?" + Math.random();
}
function startLiveMonitor() {

    let upDays = 14; let upHours = 7; let upMins = 22; let upSecs = 0;
    setInterval(() => {
        upSecs++;
        if (upSecs >= 60) { upSecs = 0; upMins++; }
        if (upMins >= 60) { upMins = 0; upHours++; }
        if (upHours >= 24) { upHours = 0; upDays++; }

        let uptimeElement = document.getElementById("liveUptime");
        if (uptimeElement) uptimeElement.innerText = `${upDays}d ${upHours}h ${upMins}m ${upSecs}s`;
    }, 1000);

    checkPiStatus(); 
    setInterval(checkPiStatus, 5000); 
}

window.addEventListener('load', () => {
    startLiveMonitor();
});