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
function openSystemStatus() {
    let bg = document.getElementById("sysBg");
    let box = document.getElementById("sysBox");
    bg.style.display = "block";
    setTimeout(() => {
        box.classList.add("show-sys");
    }, 10);
}
function closeSystemStatus() {
    let bg = document.getElementById("sysBg");
    let box = document.getElementById("sysBox");
    box.classList.remove("show-sys");
    setTimeout(() => {
        bg.style.display = "none";
    }, 300);
}