// go to projects
function clickBtn() {
    console.log("click registered");
    alert("Navigating to projects...");
}

// highlight card
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

// close the popup
function closePop() {
    document.getElementById("projModal").style.display = "none";
}
// fly out achievements from the exact button
function openAchieve(btn) {
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
function closeAchieve() {
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
        // check if we are on mobile
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
    
    // check for secret word
    if (inputStr.endsWith("goat")) {
        activateGoatMode();
        inputStr = ""; // reset
    }

    // keep string short
    if (inputStr.length > 10) inputStr = inputStr.slice(1);
});

function activateGoatMode() {
    // flashy transition
    document.body.style.transition = "all 1s ease";
    
    // change to a "Golden" theme
    document.body.style.backgroundColor = "#2b2300"; 
    
    // change the level 10 glow to something insane
    let levelTxt = document.querySelector('.magic-tt');
    if(levelTxt) levelTxt.style.filter = "drop-shadow(0 0 15px #ffaa00)";
    
    // show a pro notification
    showToast("GOAT STATUS", "Legendary theme unlocked!");
    
    console.log("GOAT mode on. You're the best, Rajibul.");
}