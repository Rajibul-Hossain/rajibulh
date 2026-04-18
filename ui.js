let term = document.querySelector('.mc-terminal');
let header = document.getElementById('termHeader');
let pinIcon = document.getElementById('pinBtn');

let isPinned = false;
let isDragging = false;
let offsetX, offsetY;

function pin() {
    isPinned = !isPinned;
    if (isPinned) {
        term.classList.add('floating');
        pinIcon.style.filter = "grayscale(0%)"; 
        term.style.left = "";
        term.style.top = "";
        
        showToast("System", "Terminal Pinned to HUD");
    } else {
        term.classList.remove('floating');
        pinIcon.style.filter = "grayscale(100%)"; // make it gray
        term.style.left = "";
        term.style.top = "";
        term.style.bottom = "";
        term.style.right = "";
        term.style.transform = "";
    }
}
header.addEventListener('mousedown', function(e) {
    if (!isPinned) return;
    isDragging = true;
    let rect = term.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    term.style.transition = "none"; 
});

document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    term.style.bottom = "auto";
    term.style.right = "auto";
    term.style.left = (e.clientX - offsetX) + "px";
    term.style.top = (e.clientY - offsetY) + "px";
});
document.addEventListener('mouseup', function() {
    if (isDragging) {
        isDragging = false;
        term.style.transition = "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    }
});
// minimize / restore terminal
let minimized = false;

function minimize() {
    minimized = !minimized;

    if (minimized) {
        term.classList.add('minimized');
        showToast("System", "Terminal hidden for now");
    } else {
        term.classList.remove('minimized');
    }
}
function sysstatus() {
    let bg = document.getElementById("sysBg");
    let box = document.getElementById("sysBox");
    bg.style.display = "block";
    setTimeout(() => {
        box.classList.add("show-sys");
    }, 10);
}
function closesys() {
    let bg = document.getElementById("sysBg");
    let box = document.getElementById("sysBox");
    box.classList.remove("show-sys");
    setTimeout(() => {
        bg.style.display = "none";
    }, 300);
}
const myID = "1263909288624132248"; 
async function getSong() {
    try {
        let req = await fetch(`https://api.lanyard.rest/v1/users/${myID}`);
        let res = await req.json(); 
        let songText = document.querySelector('.song-name');
        let eqBars = document.querySelector('.eq-bars');
        let status = document.querySelector('.status-label');
        if (res.success && res.data && res.data.spotify) {
            let track = res.data.spotify;
            songText.innerText = `${track.song} • ${track.artist}`;
            eqBars.style.display = "flex";      
            status.innerText = "🎵 NOW PLAYING";
            status.style.color = "#55ff55";     
        } 
        else {
            songText.innerText = "System Idle • No Song Playing";
            
            eqBars.style.display = "none";      
            status.innerText = "⏸️ PAUSED";
            status.style.color = "#aaa";        
        }
    } catch (err) {
        console.log("Could not reach API, bro.", err);
    }
}

getSong();
setInterval(getSong, 10000);
let box = document.getElementById("musicWidget");
let moving = false;
let gapX = 0;
let gapY = 0;
box.addEventListener("mousedown", (e) => {
    moving = true;
    let rect = box.getBoundingClientRect(); 
    gapX = e.clientX - rect.left;
    gapY = e.clientY - rect.top;
    box.style.cursor = "grabbing";
    document.querySelector('.drag-tooltip').style.display = 'none';
});
document.addEventListener("mousemove", (e) => {
    if (!moving) return; 
    box.style.right = "auto"; 
    box.style.left = (e.clientX - gapX) + "px";
    box.style.top = (e.clientY - gapY) + "px";
});
document.addEventListener("mouseup", () => {
    moving = false;
    box.style.cursor = "grab";
});
// --- Discord Mail Engine ---
const hook = "PASTE_YOUR_WEBHOOK_URL_HERE"; 

let mail = document.getElementById('mail');
let who = document.getElementById('who');
let msg = document.getElementById('msg');
let btn = document.getElementById('send');

// 1-liners to show/hide
const showMail = () => mail.classList.remove('hide');
const hideMail = () => mail.classList.add('hide');
async function sendMsg() {
    if (msg.value.trim() === "") return; 
    btn.innerText = "[ SENDING... ]";
    let payload = {
        content: `🚨 **NEW PING** 🚨\n**From:** ${who.value || 'Anon'}\n**Msg:** ${msg.value}`
    };
    try {
        await fetch(hook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        btn.innerText = "[ SENT ]";
        btn.style.background = "#55ff55";
        btn.style.color = "#111";
        setTimeout(() => {
            who.value = "";
            msg.value = "";
            btn.innerText = "[ TRANSMIT ]";
            btn.style.background = "#111";
            btn.style.color = "#55ff55";
            hideMail();
        }, 2000);
    } catch (err) {
        console.log("Failed", err);
        btn.innerText = "[ ERROR ]";
        btn.style.color = "#ff5555";
    }
}