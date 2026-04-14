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

// save sign message
function sendMsg(e) {
    e.preventDefault(); // stop page reload
    
    let name = document.getElementById("visitorName").value;
    let msg = document.getElementById("visitorMessage").value;
    
    console.log("From: " + name + " | Msg: " + msg);
    alert("Sign placed! Thanks " + name);
    
    // clear input
    document.getElementById("contactForm").reset();
}

// easter egg: break cards on 5 clicks
let blocks = document.querySelectorAll('.mc-card');

for (let i = 0; i < blocks.length; i++) {
    blocks[i].dataset.hits = 0; // set start count
    
    blocks[i].addEventListener('click', function() {
        let hits = parseInt(this.dataset.hits) + 1;
        this.dataset.hits = hits;
        
        // flash red
        let oldBg = this.style.backgroundColor;
        this.style.backgroundColor = "#ff5555";
        
        let currentBlock = this;
        setTimeout(function() {
            currentBlock.style.backgroundColor = oldBg;
        }, 150);
        
        // destroy block
        if (hits >= 5) {
            this.style.display = 'none';
            console.log("boom! block broken");
        }
    });
}