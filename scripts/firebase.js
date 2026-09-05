import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, get, child, push, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
const cfg = {
    apiKey: "AIzaSyDZ27AaZyGanqRhV_RLRkEwltZhqXTLFM8",
    authDomain: "rajibul-h.firebaseapp.com",
    projectId: "rajibul-h",
    storageBucket: "rajibul-h.firebasestorage.app",
    messagingSenderId: "886611080566",
    appId: "1:886611080566:web:84e55cc28fb317cc68b657",
    measurementId: "G-58SN2WFPRP"
};

const app = initializeApp(cfg);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let currentUser = null;
// Add your specific Google UID here once you know it
const ADMIN_UID = "Gb1759ghM1MCoFtpNkzIYzO0vrd2"; 

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("Logged in as:", user.displayName);
        
        // Admin-Specific UI Reveal
        if (user.uid === ADMIN_UID) {
            document.getElementById("activeStudentId").style.display = "block";
            // Optional: Unhide admin-only approval buttons here
            showToast("System", "Admin privileges granted.");
        } else {
            document.getElementById("activeStudentId").style.display = "none";
            showToast("System", "Student access granted.");
        }

        // Initialize user's chat
        loadUserChat(user.uid);
        
        // Change Nav Button Text
        document.getElementById("loginNavBtn").innerText = "Portal (Logged In)";
    } else {
        currentUser = null;
        document.getElementById("loginNavBtn").innerText = "Login / Portal";
    }
});

// Portal Toggle Functions
window.openPortal = () => {
    // If not logged in, trigger Google Login first
    if (!currentUser) {
        loginUser(); 
    } else {
        document.getElementById("auth-dashboard").style.display = "flex";
        setTimeout(() => {
            document.getElementById("auth-dashboard").style.opacity = "1";
        }, 10);
    }
};

window.closePortal = () => {
    document.getElementById("auth-dashboard").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("auth-dashboard").style.display = "none";
    }, 400); // Matches the CSS transition time
}; // Replace after you log in and get your UID

// --- Existing System Logic ---
async function hit() {
    let r = ref(db);
    let s = await get(child(r, 'ghost/views'));
    let v = s.exists() ? s.val() : 0;
    set(ref(db, "ghost/views"), v + 1);
}
hit();

window.ping = (t) => {
    if(!t) return;
    set(ref(db, 'ghost/msg'), t).catch(e => console.error('db ded haha', e));
}

window.runCmd = function(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        let inputBox = document.getElementById("termInput");
        let log = document.getElementById("termLog");
        let rawCmd = inputBox.value.trim();
        let cmd = rawCmd.toLowerCase();
        
        log.innerHTML += `<p class="term-txt"><span class="term-prompt">C:\\Rajibul></span> ${rawCmd}</p>`;

        if(cmd.startsWith('/msg')) { // Corrected from startWith
            let m = rawCmd.substring(5);
            if(window.ping) window.ping(m);
            log.innerHTML += `<p class="term-txt" style="color:#55ff55;">> [OK] msg sent to physical desk.</p>`;
        }
        inputBox.value = "";
    }
}

// --- Authentication Logic ---
window.loginUser = () => {
    // This will redirect the current tab to Google, then redirect back to your site when done
    signInWithRedirect(auth, provider).catch(err => console.error(err));
};
window.logoutUser = () => {
    signOut(auth);
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        console.log("Logged in as:", user.displayName);
        // Toggle UI: Hide public terminal, reveal dashboard
        document.getElementById("auth-dashboard").classList.add("active");
        loadUserChat(user.uid);
    } else {
        currentUser = null;
        document.getElementById("auth-dashboard").classList.remove("active");
    }
});

// --- Helpdesk (1-to-1 Chat) ---
window.sendHelpMessage = (text) => {
    if (!currentUser) return alert("Login required");
    const threadId = currentUser.uid === ADMIN_UID ? document.getElementById("activeStudentId").value : currentUser.uid;
    const chatRef = ref(db, `help_requests/${threadId}/messages`);
    
    push(chatRef, {
        sender: currentUser.displayName,
        text: text,
        timestamp: Date.now()
    });
};

function loadUserChat(uid) {
    const threadId = currentUser.uid === ADMIN_UID ? "admin_view" : uid;
    if (threadId === "admin_view") return; // Admin needs a separate view to see all users

    const chatRef = ref(db, `help_requests/${uid}/messages`);
    onValue(chatRef, (snapshot) => {
        const chatBox = document.getElementById("chat-output");
        chatBox.innerHTML = ""; 
        snapshot.forEach(child => {
            const msg = child.val();
            chatBox.innerHTML += `<div class="msg"><b>${msg.sender}:</b> ${msg.text}</div>`;
        });
    });
}

// --- Study Section (Gated Notes) ---
window.requestNoteAccess = (chapterId) => {
    if (!currentUser) return;
    set(ref(db, `study_notes/${chapterId}/requests/${currentUser.uid}`), {
        name: currentUser.displayName,
        status: "pending"
    }).then(() => alert("Request sent to Rajibul."));
};

window.fetchNote = async (chapterId) => {
    if (!currentUser) return;
    const accessRef = await get(ref(db, `study_notes/${chapterId}/approved_users/${currentUser.uid}`));
    
    if (accessRef.exists() && accessRef.val() === true || currentUser.uid === ADMIN_UID) {
        const noteData = await get(ref(db, `study_notes/${chapterId}/content`));
        document.getElementById("note-viewer").innerHTML = noteData.val();
    } else {
        alert("Access denied or pending approval.");
    }
};