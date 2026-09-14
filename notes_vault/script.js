import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged, signOut, updateProfile, updatePassword, deleteUser } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, updateDoc, addDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZ27AaZyGanqRhV_RLRkEwltZhqXTLFM8",
  authDomain: "rajibul-h.firebaseapp.com",
  projectId: "rajibul-h",
  storageBucket: "rajibul-h.firebasestorage.app",
  messagingSenderId: "886611080566",
  appId: "1:886611080566:web:84e55cc28fb317cc68b657",
  measurementId: "G-58SN2WFPRP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let currentUserData = null;

// --- 🟩 CREEPER 3D TRACKING 🟩 ---
const creeper = document.getElementById('creeper');
if (creeper) {
    document.addEventListener('mousemove', (e) => {
        const rect = creeper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const rotY = Math.max(-50, Math.min(50, (deltaX / window.innerWidth) * 120));
        const rotX = Math.max(-30, Math.min(30, -(deltaY / window.innerHeight) * 120));
        
        creeper.style.setProperty('--rot-x', (rotX - 10) + 'deg'); 
        creeper.style.setProperty('--rot-y', rotY + 'deg');
    });

    creeper.addEventListener('click', () => {
        if(creeper.classList.contains('fuse')) return;
        creeper.classList.add('fuse');
        window.toast("Ssssssssss...");
        setTimeout(() => creeper.classList.remove('fuse'), 1500);
    });
}

// --- 🟩 MINECRAFT PARTICLE PHYSICS 🟩 ---
document.body.addEventListener('mousedown', function(e) {
    const target = e.target.closest('.mc-panel, .mc-btn, .nav-item');
    if (!target || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    
    const colors = ['#55FFFF', '#55FF55', '#AAAAAA', '#555555', '#3b3b3b'];
    const count = Math.floor(Math.random() * 4) + 5;
    for(let i=0; i<count; i++) {
        const p = document.createElement('div');
        p.className = 'mc-particle';
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = e.clientX + 'px';
        p.style.top = e.clientY + 'px';
        document.body.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 60 + 30;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity + 20; 

        p.style.setProperty('--tx', tx + 'px');
        p.style.setProperty('--ty', ty + 'px');
        setTimeout(() => p.remove(), 600);
    }
});

// --- 🧨 HUD HOTBAR PHYSICS & KEYBINDS 🧨 ---
window.selectHotbar = (slot) => {
    document.querySelectorAll('.hotbar-slot').forEach(el => el.classList.remove('active'));
    const target = document.querySelector(`.hotbar-slot[data-slot="${slot}"]`);
    if(target) target.classList.add('active');
    
    if(slot === 1) window.switchTab('tab-home', document.querySelectorAll('.nav-item')[0]);
    if(slot === 2) window.switchTab('tab-subjects', document.querySelectorAll('.nav-item')[1]);
    if(slot === 3) window.switchTab('tab-bookmarks', document.querySelectorAll('.nav-item')[2]);
    if(slot === 4) window.switchTab('tab-crafting', document.querySelectorAll('.nav-item')[3]);
    if(slot === 5) window.switchTab('tab-arena', document.querySelectorAll('.nav-item')[4]);
    if(slot === 8) {
        window.toast("Golden Apple Eaten! Regeneration III Applied.");
        document.body.style.transition = "filter 0.5s";
        document.body.style.filter = 'contrast(1.3) saturate(1.5) brightness(1.2)';
        setTimeout(() => document.body.style.filter = 'none', 5000);
    }
    
    if(slot === 9) {
        window.toast("TNT IGNITED...");
        let flashCount = 0;
        let ignite = setInterval(() => { 
            document.body.style.backgroundColor = flashCount % 2 === 0 ? '#ff0000' : 'var(--mc-bg)'; 
            flashCount++;
        }, 150);
        
        setTimeout(() => {
            clearInterval(ignite);
            document.getElementById('explosion-overlay').classList.add('explode-anim');
            setTimeout(() => {
                window.authLogout();
                document.body.style.backgroundColor = 'var(--mc-bg)';
                document.getElementById('explosion-overlay').classList.remove('explode-anim');
                window.selectHotbar(1); 
            }, 1000);
        }, 1500);
    }
};

document.addEventListener('keydown', (e) => {
    if(e.key >= '1' && e.key <= '9') {
        if(e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            window.selectHotbar(parseInt(e.key));
        }
    }
});

// --- 🟩 THE 5 NEW MINECRAFT ENGINES 🟩 ---
window.openChest = () => {
    const text = document.getElementById('chest-text');
    if(text.innerText.includes('Claimed')) return window.toast('Chest is empty. Come back tomorrow!');
    text.innerText = 'Claimed! +50 XP';
    text.style.color = '#55FF55';
    document.getElementById('chest-icon').innerText = '💎';
    document.getElementById('chest-icon').style.transform = 'scale(1.2)';
    const xpBar = document.querySelector('.xp-fill');
    if(xpBar) xpBar.style.width = '100%';
    window.toast('Loot found: Examiner Tip unlocked!');
};

window.toggleBrewing = () => {
    const panel = document.getElementById('brewing-stand');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
};

window.applyAnvil = () => {
    const textarea = document.getElementById('brew-notes');
    if(textarea.value.includes('**')) {
        window.toast('Anvil Applied: Keywords blocked by Bedrock.');
        textarea.value = textarea.value.replace(/\*\*(.*?)\*\*/g, '🪨🪨🪨');
    } else {
        window.toast('Error: Wrap text in **asterisks** to hide it!');
    }
};

// --- 🟩 DYNAMIC CRAFTING TABLE ENGINE 🟩 ---


let currentCraft = [];

window.loadCraftingInventory = () => {
    const lvl = document.getElementById('craft-level').value;
    const sub = document.getElementById('craft-subject').value;
    const inv = document.getElementById('crafting-inventory');
    inv.innerHTML = '';
    window.clearCraft();
    
    // Check if data exists for selected combo
    if(!craftingDatabase[lvl] || !craftingDatabase[lvl][sub]) {
        inv.innerHTML = '<p style="color:var(--mc-text-muted);">No materials for this tier yet.</p>';
        return;
    }

    // Extract all unique parts for the inventory buttons
    let allParts = new Set();
    craftingDatabase[lvl][sub].forEach(recipe => recipe.parts.forEach(p => allParts.add(p)));
    
    // Shuffle the inventory so it's a puzzle
    let shuffled = Array.from(allParts).sort(() => Math.random() - 0.5);
    
    shuffled.forEach(part => {
        const btn = document.createElement('button');
        btn.className = 'mc-btn';
        btn.style.padding = '8px 16px';
        btn.innerText = part;
        btn.onclick = () => window.craftSelect(part);
        inv.appendChild(btn);
    });
};

window.craftSelect = (item) => {
    currentCraft.push(item);
    document.getElementById('craft-grid').innerText = currentCraft.join(' + ');
};

window.clearCraft = () => {
    currentCraft = [];
    document.getElementById('craft-grid').innerText = '';
};

window.checkCraft = () => {
    const lvl = document.getElementById('craft-level').value;
    const sub = document.getElementById('craft-subject').value;
    const gridEl = document.getElementById('craft-grid');
    
    if(!craftingDatabase[lvl] || !craftingDatabase[lvl][sub] || currentCraft.length === 0) return;

    // Check if currentCraft array matches any recipe parts array exactly (ignoring order)
    const sortedCraft = [...currentCraft].sort().join(',');
    const foundRecipe = craftingDatabase[lvl][sub].find(r => [...r.parts].sort().join(',') === sortedCraft);

    if(foundRecipe) {
        window.toast(`Synthesized: ${foundRecipe.name}!`);
        gridEl.innerHTML = `<span style="color:#55FF55;">⭐ ${foundRecipe.result} ⭐</span>`;
        // Spawn XP particles
        const rect = gridEl.getBoundingClientRect();
        for(let i=0; i<10; i++) spawnParticle(rect.left + rect.width/2, rect.top + rect.height/2);
    } else {
        window.toast('Invalid recipe. Materials lost.');
        gridEl.innerHTML = '<span style="color:var(--mc-redstone);">💥 FAILED 💥</span>';
        setTimeout(() => { gridEl.style.color = 'var(--mc-diamond)'; window.clearCraft(); }, 1500);
    }
};

// Initialize crafting inventory on load
setTimeout(window.loadCraftingInventory, 500);


// --- 🟩 DYNAMIC MOB ARENA ENGINE (BOSS RUSH) 🟩 ---
// --- 🟩 MASSIVE DYNAMIC CRAFTING TABLE ENGINE 🟩 ---

const craftingDatabase = {
    class_1_to_8: {
        math: [
            { id: "area_rect", parts: ["l", "w"], result: "A = l × w", name: "Area of Rectangle" },
            { id: "area_circle", parts: ["π", "r²"], result: "A = πr²", name: "Area of Circle" },
            { id: "pythagoras", parts: ["a²", "b²"], result: "c² = a² + b²", name: "Pythagorean Theorem" },
            { id: "speed", parts: ["Distance", "Time"], result: "Speed = d/t", name: "Speed Formula" }
        ],
        science: [
            { id: "density", parts: ["Mass", "Volume"], result: "Density = m/v", name: "Density" },
            { id: "water", parts: ["2H", "O"], result: "H₂O", name: "Water Molecule" }
        ]
    },
    class9: {
        physics: [
            { id: "v_kinematic", parts: ["u", "at"], result: "v = u + at", name: "1st Equation of Motion" },
            { id: "s_kinematic", parts: ["ut", "½at²"], result: "s = ut + ½at²", name: "2nd Equation of Motion" },
            { id: "momentum", parts: ["m", "v"], result: "p = m × v", name: "Momentum" },
            { id: "work", parts: ["F", "s"], result: "W = F × s", name: "Work Done" },
            { id: "gravity_force", parts: ["G", "Mm", "/d²"], result: "F = GMm/d²", name: "Universal Gravitation" }
        ],
        chemistry: [
            { id: "mole", parts: ["Given Mass", "Molar Mass"], result: "n = m/M", name: "Number of Moles" }
        ]
    },
    class10: {
        physics: [
            { id: "ohm", parts: ["I", "R"], result: "V = I × R", name: "Ohm's Law" },
            { id: "power_vi", parts: ["V", "I"], result: "P = V × I", name: "Electric Power" },
            { id: "power_ir", parts: ["I²", "R"], result: "P = I²R", name: "Joule's Law of Heating" },
            { id: "mirror", parts: ["1/v", "1/u"], result: "1/f = 1/v + 1/u", name: "Mirror Formula" },
            { id: "lens", parts: ["1/v", "-1/u"], result: "1/f = 1/v - 1/u", name: "Lens Formula" },
            { id: "refractive", parts: ["sin(i)", "sin(r)"], result: "n = sin(i)/sin(r)", name: "Snell's Law" }
        ],
        chemistry: [
            { id: "rusting", parts: ["4Fe", "3O₂", "xH₂O"], result: "2Fe₂O₃·xH₂O", name: "Rusting of Iron" },
            { id: "photosynthesis", parts: ["6CO₂", "6H₂O", "Light"], result: "C₆H₁₂O₆ + 6O₂", name: "Photosynthesis" },
            { id: "respiration", parts: ["C₆H₁₂O₆", "6O₂"], result: "6CO₂ + 6H₂O + Energy", name: "Cellular Respiration" },
            { id: "slaked_lime", parts: ["CaO", "H₂O"], result: "Ca(OH)₂ + Heat", name: "Slaked Lime Formation" },
            { id: "baking_soda", parts: ["NaCl", "H₂O", "CO₂", "NH₃"], result: "NH₄Cl + NaHCO₃", name: "Baking Soda Prep" },
            { id: "plaster", parts: ["CaSO₄·2H₂O", "Heat (373K)"], result: "CaSO₄·½H₂O + 1½H₂O", name: "Plaster of Paris" }
        ],
        math: [
            { id: "quad_formula", parts: ["-b ± √D", "2a"], result: "x = (-b ± √D) / 2a", name: "Quadratic Formula" },
            { id: "nth_term", parts: ["a", "(n-1)d"], result: "a_n = a + (n-1)d", name: "Arithmetic Progression (n-th)" },
            { id: "sum_ap", parts: ["n/2", "2a + (n-1)d"], result: "S_n = n/2 [2a + (n-1)d]", name: "Sum of AP" },
            { id: "distance_formula", parts: ["√(x₂-x₁)²", "(y₂-y₁)²"], result: "d = √[(x₂-x₁)² + (y₂-y₁)²]", name: "Distance Formula" },
            { id: "section_formula", parts: ["m₁x₂ + m₂x₁", "m₁ + m₂"], result: "x = (m₁x₂ + m₂x₁) / (m₁ + m₂)", name: "Section Formula (x)" }
        ]
    },
    class11: {
        physics: [
            { id: "shm_omega", parts: ["√k", "/m"], result: "ω = √(k/m)", name: "Angular Frequency (SHM)" },
            { id: "bernoulli", parts: ["P", "½ρv²", "ρgh"], result: "P + ½ρv² + ρgh = Constant", name: "Bernoulli's Equation" },
            { id: "stokes", parts: ["6π", "η", "r", "v"], result: "F = 6πηrv", name: "Stokes' Law" }
        ],
        chemistry: [
            { id: "ideal_gas", parts: ["P", "V"], result: "PV = nRT", name: "Ideal Gas Law" },
            { id: "gibbs", parts: ["ΔH", "-TΔS"], result: "ΔG = ΔH - TΔS", name: "Gibbs Free Energy" }
        ]
    },
    class12_and_jee: {
        physics: [
            { id: "lorentz", parts: ["qE", "q(v × B)"], result: "F = qE + q(v × B)", name: "Lorentz Force" },
            { id: "biot_savart", parts: ["μ₀/4π", "Idl×r/r³"], result: "dB = (μ₀/4π) * (Idl×r/r³)", name: "Biot-Savart Law" },
            { id: "capacitance", parts: ["ε₀", "A", "/d"], result: "C = ε₀A/d", name: "Parallel Plate Capacitor" },
            { id: "debroglie", parts: ["h", "/p"], result: "λ = h/p", name: "de Broglie Wavelength" },
            { id: "radioactive", parts: ["N₀", "e^(-λt)"], result: "N = N₀e^(-λt)", name: "Radioactive Decay Law" },
            { id: "maxwell_ampere", parts: ["μ₀I", "μ₀ε₀(dΦE/dt)"], result: "∮B·dl = μ₀I + μ₀ε₀(dΦE/dt)", name: "Ampere-Maxwell Law" }
        ],
        chemistry: [
            { id: "arrhenius", parts: ["A", "e^(-Ea/RT)"], result: "k = Ae^(-Ea/RT)", name: "Arrhenius Equation" },
            { id: "nernst", parts: ["E°", "-(RT/nF)lnQ"], result: "E = E° - (RT/nF)lnQ", name: "Nernst Equation" },
            { id: "raoult", parts: ["P°", "x"], result: "P = P°x", name: "Raoult's Law" },
            { id: "first_order_kinetics", parts: ["(2.303/t)", "log(a/a-x)"], result: "k = (2.303/t)log(a/a-x)", name: "1st Order Rate Constant" }
        ],
        math: [
            { id: "integration_uv", parts: ["u∫v dx", "- ∫(u'∫v dx)dx"], result: "∫uv dx = u∫v dx - ∫(u'∫v dx)dx", name: "Integration by Parts" },
            { id: "euler", parts: ["e^(ix)"], result: "cos(x) + i sin(x)", name: "Euler's Formula" },
            { id: "lhopital", parts: ["lim f'(x)", "/g'(x)"], result: "lim f(x)/g(x) = lim f'(x)/g'(x)", name: "L'Hopital's Rule" },
            { id: "vector_cross", parts: ["|a|", "|b|", "sin(θ)", "n̂"], result: "a × b = |a||b|sin(θ)n̂", name: "Cross Product" }
        ]
    },
    neet: {
        biology: [
            { id: "hardy_weinberg", parts: ["p²", "2pq", "q²"], result: "p² + 2pq + q² = 1", name: "Hardy-Weinberg Equilibrium" },
            { id: "cardiac_output", parts: ["Heart Rate", "Stroke Volume"], result: "CO = HR × SV", name: "Cardiac Output" },
            { id: "vital_capacity", parts: ["ERV", "TV", "IRV"], result: "VC = ERV + TV + IRV", name: "Vital Capacity" }
        ],
        chemistry: [
            { id: "bohr_radius", parts: ["0.529", "n²", "/Z"], result: "r = 0.529(n²/Z) Å", name: "Bohr Orbit Radius" }
        ]
    }
};

// --- 🟩 MASSIVE DYNAMIC MOB ARENA ENGINE (BOSS RUSH PYQs) 🟩 ---

const arenaDatabase = {
    class_1_to_8: [
        { q: "What is the largest organ in the human body?", options: ["Heart", "Liver", "Skin", "Brain"], ans: 2 },
        { q: "What is the value of pi to two decimal places?", options: ["3.12", "3.14", "3.16", "3.18"], ans: 1 },
        { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], ans: 1 },
        { q: "What is the chemical symbol for Gold?", options: ["Ag", "Au", "Pb", "Fe"], ans: 1 }
    ],
    class9: [
        { q: "The rate of change of velocity is called:", options: ["Speed", "Displacement", "Acceleration", "Momentum"], ans: 2 },
        { q: "Which cell organelle is the 'suicide bag'?", options: ["Mitochondria", "Lysosome", "Ribosome", "Plastid"], ans: 1 },
        { q: "What is the valency of Carbon?", options: ["2", "3", "4", "5"], ans: 2 },
        { q: "The SI unit of force is:", options: ["Joule", "Watt", "Newton", "Pascal"], ans: 2 },
        { q: "Who discovered the nucleus of the cell?", options: ["Robert Hooke", "Robert Brown", "Leeuwenhoek", "Schwann"], ans: 1 }
    ],
    class10: [
        { q: "Assertion: Silver chloride turns grey in sunlight. Reason: Silver chloride decomposes into silver and chlorine.", options: ["Both A & R true, R is correct explanation", "Both A & R true, R is NOT correct explanation", "A is true, R is false", "A is false, R is true"], ans: 0 },
        { q: "What happens when dilute HCl is added to iron filings?", options: ["Hydrogen gas & Iron chloride produced", "Chlorine gas & Iron hydroxide produced", "No reaction", "Iron salt & water produced"], ans: 0 },
        { q: "In a convex mirror, the image formed is always:", options: ["Real & Inverted", "Virtual & Erect", "Real & Erect", "Virtual & Inverted"], ans: 1 },
        { q: "Which plant hormone promotes cell division?", options: ["Auxin", "Gibberellin", "Cytokinin", "Abscisic Acid"], ans: 2 },
        { q: "If the discriminant of a quadratic equation is zero, the roots are:", options: ["Real and distinct", "Real and equal", "Not real", "Imaginary"], ans: 1 },
        { q: "The magnetic field inside a long straight solenoid-carrying current is:", options: ["Zero", "Decreases towards ends", "Increases towards ends", "Same at all points"], ans: 3 },
        { q: "Which blood vessel carries oxygenated blood from lungs to heart?", options: ["Pulmonary Artery", "Pulmonary Vein", "Aorta", "Vena Cava"], ans: 1 }
    ],
    jee: [
        { q: "In Young's double slit experiment, if the slit width ratio is 1:9, the ratio of maximum to minimum intensity is:", options: ["4:1", "9:1", "16:1", "25:1"], ans: 0 },
        { q: "The internal energy of an ideal gas depends on:", options: ["Volume only", "Pressure only", "Temperature only", "Pressure and Volume"], ans: 2 },
        { q: "Which of the following is a diamagnetic molecule?", options: ["O2", "B2", "N2", "NO"], ans: 2 },
        { q: "If A is a skew-symmetric matrix of odd order, then |A| is:", options: ["1", "-1", "0", "Depends on elements"], ans: 2 },
        { q: "The SN2 mechanism proceeds with:", options: ["Retention of configuration", "Inversion of configuration", "Racemization", "Carbocation formation"], ans: 1 },
        { q: "Integral of ln(x) dx is:", options: ["x ln(x) - x + C", "1/x + C", "x ln(x) + x + C", "x/ln(x) + C"], ans: 0 },
        { q: "Work done by a conservative force around a closed path is:", options: ["Positive", "Negative", "Zero", "Infinite"], ans: 2 },
        { q: "The geometry of XeF4 is:", options: ["Tetrahedral", "Square Planar", "See-saw", "Octahedral"], ans: 1 }
    ],
    neet: [
        { q: "Which of the following is an initiation codon?", options: ["UAA", "UAG", "AUG", "UGA"], ans: 2 },
        { q: "The primary acceptor of CO2 in C4 plants is:", options: ["RuBP", "PEP", "PGA", "OAA"], ans: 1 },
        { q: "Which antibody is most abundant in human colostrum?", options: ["IgA", "IgG", "IgM", "IgE"], ans: 0 },
        { q: "The first stable product of Calvin cycle is:", options: ["OAA", "3-PGA", "RuBP", "PEP"], ans: 1 },
        { q: "Identify the correct order of bond angle:", options: ["NH3 > H2O > CH4", "CH4 > NH3 > H2O", "H2O > NH3 > CH4", "NH3 > CH4 > H2O"], ans: 1 },
        { q: "Corpus luteum secretes primarily:", options: ["Estrogen", "Progesterone", "LH", "FSH"], ans: 1 },
        { q: "A pure inductor in an AC circuit causes current to:", options: ["Lead voltage by π/2", "Lag voltage by π/2", "Be in phase with voltage", "Lag voltage by π/4"], ans: 1 }
    ]
};

const bosses = [
    { name: "Zombie", hp: 100, color: "#55FF55", dmg: 34 },
    { name: "Skeleton", hp: 150, color: "#AAAAAA", dmg: 25 },
    { name: "Wither", hp: 300, color: "#111111", dmg: 15 },
    { name: "Ender Dragon", hp: 500, color: "#AA00AA", dmg: 10 }
];

let activeArena = null;

window.startArena = () => {
    const lvl = document.getElementById('arena-level').value;
    if(!arenaDatabase[lvl] || arenaDatabase[lvl].length === 0) return window.toast("No data for this level yet!");

    // Pick random boss
    const boss = bosses[Math.floor(Math.random() * bosses.length)];
    
    activeArena = {
        level: lvl,
        questions: [...arenaDatabase[lvl]].sort(() => Math.random() - 0.5), // Shuffle questions
        bossMaxHp: boss.hp,
        bossHp: boss.hp,
        bossDmg: boss.dmg,
        score: 0,
        qIndex: 0
    };

    document.getElementById('arena-setup').style.display = 'none';
    document.getElementById('arena-battleground').style.display = 'block';
    
    const bName = document.getElementById('boss-name');
    bName.innerText = boss.name;
    bName.style.color = boss.color;
    document.getElementById('boss-hp').style.width = '100%';
    document.getElementById('arena-score').innerText = '0';
    
    loadNextArenaQuestion();
};

function loadNextArenaQuestion() {
    if(activeArena.qIndex >= activeArena.questions.length) {
        // Loop questions if boss isn't dead
        activeArena.questions = activeArena.questions.sort(() => Math.random() - 0.5);
        activeArena.qIndex = 0;
    }

    const qData = activeArena.questions[activeArena.qIndex];
    document.getElementById('arena-q').innerText = qData.q;
    
    const optContainer = document.getElementById('arena-options');
    optContainer.innerHTML = '';
    
    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'mc-btn';
        btn.innerText = opt;
        btn.onclick = () => window.attackArenaBoss(index === qData.ans);
        optContainer.appendChild(btn);
    });
}

window.attackArenaBoss = (correct) => {
    if(correct) {
        activeArena.bossHp -= activeArena.bossDmg;
        activeArena.score += 50;
        document.getElementById('arena-score').innerText = activeArena.score;
        window.toast('CRITICAL HIT! +50 Points');
        
        // Visual Hit
        document.getElementById('boss-name').style.transform = 'scale(1.2) rotate(2deg)';
        setTimeout(() => document.getElementById('boss-name').style.transform = 'none', 100);

        if(activeArena.bossHp <= 0) {
            document.getElementById('boss-hp').style.width = '0%';
            window.toast('BOSS DEFEATED! MASSIVE XP GAIN!');
            document.getElementById('arena-options').innerHTML = `<button class="mc-btn mc-btn-primary" style="grid-column: span 2;" onclick="resetArena()">Claim Loot & Exit</button>`;
            document.getElementById('arena-q').innerText = "Victory Achieved.";
            return;
        }
        
        document.getElementById('boss-hp').style.width = (activeArena.bossHp / activeArena.bossMaxHp * 100) + '%';
        activeArena.qIndex++;
        loadNextArenaQuestion();

    } else {
        window.toast('Incorrect! The Boss struck you.');
        document.body.style.backgroundColor = '#550000';
        setTimeout(() => document.body.style.backgroundColor = 'var(--mc-bg)', 150);
    }
};

window.resetArena = () => {
    document.getElementById('arena-battleground').style.display = 'none';
    document.getElementById('arena-setup').style.display = 'flex';
    activeArena = null;
};

// Extracted particle function so the Synthesizer can use it too
function spawnParticle(x, y) {
    const colors = ['#55FFFF', '#55FF55', '#FFFF55'];
    const p = document.createElement('div');
    p.className = 'mc-particle';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 80 + 40;
    p.style.setProperty('--tx', (Math.cos(angle) * velocity) + 'px');
    p.style.setProperty('--ty', (Math.sin(angle) * velocity + 40) + 'px');
    setTimeout(() => p.remove(), 600);
}

// --- UTILS & UI ---
window.toast = (msg) => {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div'); t.className = 'mc-toast'; 
    t.innerHTML = `<span style="color:#ffff55;">[System]</span> ${msg}`;
    container.appendChild(t);
    setTimeout(() => { t.style.display = 'none'; t.remove(); }, 3000);
};

window.navigate = (id) => { document.querySelectorAll('.view').forEach(e => e.classList.remove('active')); document.getElementById(id).classList.add('active'); };
window.switchTab = (id, navEl) => { 
    document.querySelectorAll('.tab-content').forEach(e => e.style.display='none'); 
    const target = document.getElementById(id); target.style.display='block';
    if(navEl) { document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active')); navEl.classList.add('active'); }
};
window.showAdminSection = (id) => { document.querySelectorAll('.admin-section').forEach(e => e.style.display='none'); document.getElementById(id).style.display='block'; };

// --- AUTH LOGIC ---
document.getElementById('form-login').onsubmit = async (e) => {
    e.preventDefault(); const btn = e.target.querySelector('button'); btn.innerText = "Connecting...";
    try { await signInWithEmailAndPassword(auth, document.getElementById('login-email').value, document.getElementById('login-password').value); } 
    catch (err) { window.toast(err.message); btn.innerText = "Log In"; }
};
// --- AUTH LOGIC ---
document.getElementById('form-register').onsubmit = async (e) => {
    e.preventDefault(); const btn = e.target.querySelector('button'); btn.innerText = "Creating...";
    
    // 1. Lock the auth listener so it doesn't kick us out prematurely
    window.isRegistering = true; 

    try {
        const cred = await createUserWithEmailAndPassword(auth, document.getElementById('reg-email').value, document.getElementById('reg-password').value);
        
        // 2. Write the database document FIRST while the auth token is fully active
        await setDoc(doc(db, "users", cred.user.uid), { 
            uid: cred.user.uid, 
            name: document.getElementById('reg-name').value, 
            email: cred.user.email, 
            role: 'user', 
            accessStatus: 'approved', 
            createdAt: new Date().toISOString() 
        });
        
        // 3. Send email and logout safely
        await sendEmailVerification(cred.user);
        window.toast("Account created! Check your email to verify."); 
        window.authLogout();
    } catch (err) { 
        window.toast(err.message); 
    } finally {
        btn.innerText = "Sign Up"; 
        window.isRegistering = false; // Unlock
    }
};

window.authLogout = () => signOut(auth).then(() => window.navigate('view-register'));

onAuthStateChanged(auth, async (user) => {
    const loader = document.getElementById('global-loader');
    
    if (!user) { 
        window.navigate('view-register'); 
        document.getElementById('hud-hotbar').classList.remove('active');
        loader.style.opacity='0'; setTimeout(()=>loader.style.display='none',300); return; 
    }
    
    // Ignore the unverified email check if the user is in the middle of the signup process
    if (window.isRegistering) return; 

    if (!user.emailVerified) { window.toast("Please verify your email to enter."); window.authLogout(); return; }

    try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
            currentUserData = userDoc.data();
            
            document.getElementById('user-display-name').innerText = currentUserData.name;
            const hr = new Date().getHours(); document.getElementById('greeting').innerText = `Good ${(hr<12)?"morning":(hr<18)?"afternoon":"evening"}, ${currentUserData.name.split(' ')[0]}.`;
            
            if(currentUserData.role === 'admin' || currentUserData.role === 'superadmin') {
                document.getElementById('nav-admin').style.display = 'flex'; 
            }
            window.navigate('view-app');
            document.getElementById('hud-hotbar').classList.add('active');
            await initializeDashboard();
            startPlaytimeTracker(currentUserData.playtime); // <--- Add this line
            
            // Also set initial avatar if it exists
            const avatarUrl = user.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${currentUserData.name}`;
            document.getElementById('sidebar-avatar').src = avatarUrl;
        }
    } catch (err) { console.error(err); window.toast("Connection error."); }
    loader.style.opacity='0'; setTimeout(()=>loader.style.display='none',300);
});
// --- DASHBOARD DATA ---
async function initializeDashboard() { await loadSubjects(); await window.loadUserStats(); }

async function loadSubjects() {
    try {
        const snap = await getDocs(collection(db, "subjects"));
        const container = document.getElementById('subjects-container');
        const adminSelect = document.getElementById('add-chap-subject');
        if (snap.empty) { container.innerHTML = `<p>No subjects published yet.</p>`; return; }
        
        let html = '', selectHtml = '<option value="">Select a Subject...</option>';
        snap.forEach(doc => {
            const data = doc.data(); data.id = doc.id;
            html += `
                <div class="mc-panel bento-wide interactive" onclick="loadChapters('${data.id}', '${data.name}')">
                    <h3 style="color:var(--mc-diamond);">${data.name}</h3>
                    <p style="margin-top:12px;">${data.description}</p>
                </div>`;
            selectHtml += `<option value="${data.id}">${data.name}</option>`;
        });
        container.innerHTML = html; adminSelect.innerHTML = selectHtml;
    } catch(e) { console.error(e); window.toast("Failed to load subjects."); }
}

window.loadChapters = async (subjectId, subjectName) => {
    document.getElementById('chapter-list-title').innerText = subjectName;
    window.switchTab('tab-chapters');
    const container = document.getElementById('chapters-list-container'); container.innerHTML = `<p>Decrypting chapters...</p>`;
    
    try {
        const snap = await getDocs(query(collection(db, "chapters"), where("subjectId", "==", subjectId), where("published", "==", true)));
        if(snap.empty) { container.innerHTML = `<p>No chapters uploaded yet.</p>`; return; }
        
        let chapters = []; snap.forEach(d => chapters.push({id: d.id, ...d.data()}));
        chapters.sort((a,b) => a.order - b.order);
        
        let html = '';
        chapters.forEach(c => {
            html += `
            <div class="mc-panel bento-wide interactive" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <div class="status-pill" style="margin-bottom:16px;">Level ${c.order}</div>
                    <h2>${c.title}</h2><p style="margin-top:12px;">${c.description}</p>
                </div>
                <button class="mc-btn mc-btn-primary" style="margin-top:32px; align-self:flex-start;" onclick="openReader('${c.id}', '${c.title}', '${c.fileURL}', '${subjectName}')">Read Note</button>
            </div>`;
        });
        container.innerHTML = html;
    } catch(e) { console.error(e); window.toast("Failed to load chapters."); }
};

window.openReader = async (chapterId, title, fileURL, subjectName) => {
    const currentReadingChapter = { id: chapterId, title, subjectName };
    document.getElementById('reader-title').innerText = title;
    await updateDoc(doc(db, "users", currentUserData.uid), { lastRead: currentReadingChapter });
    
    const bSnap = await getDoc(doc(db, "bookmarks", `${currentUserData.uid}_${chapterId}`));
    const bBtn = document.getElementById('btn-toggle-bookmark');
    if(bSnap.exists()) { bBtn.innerText = "Remove"; bBtn.onclick = () => window.toggleBookmark(chapterId, title, subjectName, true); }
    else { bBtn.innerText = "Save"; bBtn.onclick = () => window.toggleBookmark(chapterId, title, subjectName, false); }
    
    const pSnap = await getDoc(doc(db, "userProgress", `${currentUserData.uid}_${chapterId}`));
    const pBtn = document.getElementById('btn-mark-complete');
    if(pSnap.exists()) { pBtn.innerText = "Cleared ✓"; pBtn.disabled = true; pBtn.style.backgroundColor = '#2b2b2b'; }
    else { pBtn.innerText = "Mark Cleared"; pBtn.disabled = false; pBtn.style.backgroundColor = ''; pBtn.onclick = () => window.markComplete(chapterId); }

    document.getElementById('reader-frame-container').innerHTML = `<iframe src="${fileURL}#toolbar=0" title="${title}" oncontextmenu="return false;"></iframe>`;
    window.switchTab('tab-reader'); window.loadUserStats();
};

window.markComplete = async (chapterId) => {
    try {
        await setDoc(doc(db, "userProgress", `${currentUserData.uid}_${chapterId}`), { uid: currentUserData.uid, chapterId, completedAt: new Date().toISOString() });
        window.toast("Chapter Cleared!");
        const pBtn = document.getElementById('btn-mark-complete'); pBtn.innerText = "Cleared ✓"; pBtn.disabled = true; pBtn.style.backgroundColor = '#2b2b2b';
        window.loadUserStats();
    } catch(e) { console.error(e); window.toast("Error updating stats."); }
}

window.toggleBookmark = async (chapterId, title, subjectName, isBookmarked) => {
    try {
        const docRef = doc(db, "bookmarks", `${currentUserData.uid}_${chapterId}`);
        if(isBookmarked) { await deleteDoc(docRef); window.toast("Item removed."); }
        else { await setDoc(docRef, { uid: currentUserData.uid, chapterId, title, subjectName, createdAt: new Date().toISOString() }); window.toast("Item Saved!"); }
        window.openReader(chapterId, title, document.querySelector('iframe').src, subjectName); 
        window.loadBookmarks(); window.loadUserStats();
    } catch(e) { console.error(e); window.toast("Error toggling bookmark."); }
}

window.loadBookmarks = async () => {
    try {
        const snap = await getDocs(query(collection(db, "bookmarks"), where("uid", "==", currentUserData.uid)));
        const container = document.getElementById('bookmarks-container');
        if(snap.empty) { container.innerHTML = `<div class="mc-panel bento-wide"><p>No saved items.</p></div>`; return; }
        let html = '';
        snap.forEach(d => {
            const data = d.data();
            html += `<div class="mc-panel bento-wide interactive">
                <div class="status-pill" style="margin-bottom:12px;">${data.subjectName}</div>
                <h3 style="color:var(--mc-diamond);">${data.title}</h3>
                <button class="mc-btn" style="margin-top:24px;" onclick="window.toast('Navigate via Library to read')">Go to Area</button>
            </div>`;
        });
        container.innerHTML = html;
    } catch(e) { console.error(e); }
};
window.loadUserStats = async () => {
    try {
        const pSnap = await getDocs(query(collection(db, "userProgress"), where("uid", "==", currentUserData.uid)));
        if(document.getElementById('stat-completed')) document.getElementById('stat-completed').innerText = pSnap.size;
        
        const bSnap = await getDocs(query(collection(db, "bookmarks"), where("uid", "==", currentUserData.uid)));
        if(document.getElementById('stat-bookmarks')) document.getElementById('stat-bookmarks').innerText = bSnap.size;

        const uDoc = await getDoc(doc(db, "users", currentUserData.uid));
        
        // Target the new Quest & Furnace UI elements
        const qMain = document.getElementById('quest-main');
        const crWidget = document.getElementById('continue-reading-widget'); // Fallback for old UI
        
        if (uDoc.exists() && uDoc.data().lastRead) {
            const lr = uDoc.data().lastRead;
            
            // If using the Furnace/Quest Log UI
            if (qMain) {
                const qSide = document.getElementById('quest-side');
                const fInput = document.getElementById('furnace-input');
                const fFire = document.getElementById('furnace-fire');
                const fProg = document.getElementById('furnace-progress');
                const fStatus = document.getElementById('furnace-status');
                
                qMain.innerText = `Defeat: ${lr.title}`;
                qMain.style.color = '#55FF55';
                if(qSide) qSide.innerText = `Review ${bSnap.size} items in your inventory.`;
                
                if(fInput) {
                    fInput.innerText = '📖'; 
                    fFire.classList.add('active'); 
                    fStatus.innerText = `Smelting: ${lr.subjectName}`;
                    fStatus.style.color = '#55FFFF';
                    fProg.style.width = '0%';
                    setTimeout(() => { fProg.style.width = '75%'; }, 500);
                }
            } 
            // Fallback if you are still using the older layout
            else if (crWidget) {
                crWidget.innerHTML = `
                    <div><div class="status-pill" style="margin-bottom: 24px;">Current Quest</div>
                    <h2>${lr.title}</h2><p style="margin-top: 12px;">Zone: ${lr.subjectName}</p></div>
                    <button class="mc-btn mc-btn-accent" style="align-self:flex-start; margin-top:32px;" onclick="window.toast('Find this in the Library tab.')">Resume</button>
                `;
            }
        } else {
            // Idle State (User has not opened a chapter yet)
            if (qMain) {
                qMain.innerText = 'Find a zone in the Library.';
                qMain.style.color = '#fff';
                const qSide = document.getElementById('quest-side');
                if(qSide) qSide.innerText = 'No side quests available.';
                
                const fInput = document.getElementById('furnace-input');
                if(fInput) {
                    fInput.innerText = '❓';
                    document.getElementById('furnace-fire').classList.remove('active');
                    document.getElementById('furnace-progress').style.width = '0%';
                    document.getElementById('furnace-status').innerText = 'Furnace is idle.';
                    document.getElementById('furnace-status').style.color = '#aaa';
                }
            } else if (crWidget) {
                crWidget.innerHTML = `<div><h2>Welcome to the Vault.</h2><p style="margin-top: 12px;">Open the Library to start your first session.</p></div>`;
            }
        }
    } catch(e) { 
        console.error("Stats Error:", e); 
    }
};

// --- ADMIN ---
window.loadAdminData = async () => {
    try {
        const snap = await getDocs(query(collection(db, "accessRequests"), where("status", "==", "pending")));
        const container = document.getElementById('admin-requests-container');
        if(snap.empty) { container.innerHTML = `<p>No pending requests.</p>`; return; }
        let html = '';
        snap.forEach(d => {
            const data = d.data();
            html += `<div class="mc-slot" style="display:flex; justify-content:space-between; align-items:center; padding:20px;">
                <div><p style="font-weight:600; font-family:var(--font-pixel); font-size: 1.5rem; margin-bottom: 4px; color:#fff;">${data.name}</p><p>${data.email}</p></div>
                <button class="mc-btn mc-btn-primary" onclick="approveUser('${data.uid}')">OP Player</button>
            </div>`;
        });
        container.innerHTML = html;
    } catch(e) { console.error(e); }
}

window.approveUser = async (uid) => {
    try {
        await updateDoc(doc(db, "users", uid), { accessStatus: 'approved' });
        await updateDoc(doc(db, "accessRequests", uid), { status: 'approved' });
        window.toast("Player Whitelisted."); window.loadAdminData();
    } catch(e) { console.error(e); window.toast("Command failed."); }
};

document.getElementById('form-add-subject').onsubmit = async (e) => {
    e.preventDefault(); const btn = e.target.querySelector('button'); btn.innerText = "Crafting...";
    try {
        await addDoc(collection(db, "subjects"), {
            name: document.getElementById('add-sub-name').value,
            description: document.getElementById('add-sub-desc').value,
            createdAt: new Date().toISOString()
        });
        window.toast("Subject crafted!"); document.getElementById('form-add-subject').reset(); loadSubjects();
    } catch(err) { window.toast(err.message); }
    btn.innerText = "Craft Subject";
};

document.getElementById('form-add-chapter').onsubmit = async (e) => {
    e.preventDefault(); 
    const btn = document.getElementById('btn-upload-chap'); btn.innerText = "Uploading..."; btn.disabled = true;
    try {
        const file = document.getElementById('add-chap-file').files[0];
        const subjectId = document.getElementById('add-chap-subject').value;
        if(!file || !subjectId) throw new Error("Missing item or slot");

        const storageRef = ref(storage, `notes/${subjectId}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(storageRef);

        await addDoc(collection(db, "chapters"), {
            subjectId,
            title: document.getElementById('add-chap-title').value,
            description: document.getElementById('add-chap-desc').value,
            order: Number(document.getElementById('add-chap-order').value),
            fileURL,
            published: true,
            createdAt: new Date().toISOString()
        });
        
        window.toast("Item published!"); document.getElementById('form-add-chapter').reset();
    } catch(err) { console.error(err); window.toast(err.message); }
    btn.innerText = "Upload & Publish"; btn.disabled = false;
};
// --- 🟩 COMMAND BLOCK POMODORO ENGINE 🟩 ---
let pomodoroInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds

window.startTimer = (minutes) => {
    clearInterval(pomodoroInterval);
    timeLeft = minutes * 60;
    updateTimerDisplay();
    
    const cmdBlock = document.getElementById('command-block');
    const status = document.getElementById('timer-status');
    const timeDisplay = document.getElementById('pomodoro-time');
    
    cmdBlock.classList.add('cmd-active');
    
    // UI Updates based on Focus vs Break
    if (minutes === 25) {
        status.innerText = 'FOCUSING';
        status.style.color = '#ff5555';
        status.style.borderColor = '#ff5555';
        timeDisplay.style.color = '#ff5555';
        timeDisplay.style.textShadow = '4px 4px 0px #550000';
    } else {
        status.innerText = 'RESTING';
        status.style.color = '#55ff55';
        status.style.borderColor = '#55ff55';
        timeDisplay.style.color = '#55ff55';
        timeDisplay.style.textShadow = '4px 4px 0px #003300';
    }
    
    window.toast(`Command executed: /timer set ${minutes}m`);

    pomodoroInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        // Spawn occasional redstone particles if focusing
        if(minutes === 25 && timeLeft % 5 === 0) {
            const rect = cmdBlock.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            spawnRedstoneParticle(x, y);
        }

        if(timeLeft <= 0) {
            clearInterval(pomodoroInterval);
            window.resetTimer();
            window.toast(minutes === 25 ? 'Focus Session Complete! +100 XP' : 'Break Over! Back to the grind.');
        }
    }, 1000);
};

window.resetTimer = () => {
    clearInterval(pomodoroInterval);
    timeLeft = 25 * 60;
    updateTimerDisplay();
    
    const cmdBlock = document.getElementById('command-block');
    const status = document.getElementById('timer-status');
    const timeDisplay = document.getElementById('pomodoro-time');
    
    cmdBlock.classList.remove('cmd-active');
    status.innerText = 'IDLE';
    status.style.color = '#ff5555';
    status.style.borderColor = '#ff5555';
    timeDisplay.style.color = '#ff5555';
    timeDisplay.style.textShadow = '4px 4px 0px #550000';
};

function updateTimerDisplay() {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById('pomodoro-time').innerText = `${m}:${s}`;
}

function spawnRedstoneParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'mc-particle';
    p.style.backgroundColor = '#ff5555'; // Redstone dust color
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    document.body.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 20 + 10;
    p.style.setProperty('--tx', (Math.cos(angle) * velocity) + 'px');
    p.style.setProperty('--ty', (Math.sin(angle) * velocity - 20) + 'px'); // Float up slightly
    
    setTimeout(() => p.remove(), 600);
}
// --- ⚙️ SERVER OPTIONS & ACCOUNT ENGINE ⚙️ ---
let sessionStartTime = 0;
let totalHistoricalPlaytime = 0; // Stored in minutes in Firestore


window.openSettings = () => {
    const overlay = document.getElementById('settings-modal');
    const panel = document.getElementById('settings-panel');
    const btn = document.getElementById('btn-settings');

    // 1. Make the container visible but transparent
    overlay.style.display = 'flex';
    overlay.style.background = 'rgba(0,0,0,0)';

    // 2. Calculate the exact pixel distance between the button and the panel
    const btnRect = btn.getBoundingClientRect();
    const panelRect = panel.getBoundingClientRect();
    const originX = btnRect.left + (btnRect.width / 2) - panelRect.left;
    const originY = btnRect.top + (btnRect.height / 2) - panelRect.top;

    // 3. Anchor the animation to the button's exact coordinates
    panel.style.transformOrigin = `${originX}px ${originY}px`;

    // 4. Force browser reflow so the origin registers before expanding
    void panel.offsetWidth;

    // 5. Trigger the liquid expansion and fade the background
    panel.classList.remove('genie-closed');
    panel.classList.add('genie-open');
    overlay.style.background = 'rgba(0,0,0,0.85)';

    // Load User Data
    document.getElementById('settings-name').innerText = currentUserData.name;
    document.getElementById('settings-email').innerText = currentUserData.email;
    
    const userAuth = auth.currentUser;
    const avatarUrl = userAuth.photoURL || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${currentUserData.name}`;
    document.getElementById('sidebar-avatar').src = avatarUrl;
    document.getElementById('settings-avatar').src = avatarUrl;

    const sessionMinutes = Math.floor((Date.now() - sessionStartTime) / 60000);
    const totalMinutes = totalHistoricalPlaytime + sessionMinutes;
    document.getElementById('settings-uptime').innerText = `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
};

window.closeSettings = () => {
    const overlay = document.getElementById('settings-modal');
    const panel = document.getElementById('settings-panel');

    // Trigger the reversal animation
    panel.classList.remove('genie-open');
    panel.classList.add('genie-closed');
    overlay.style.background = 'rgba(0,0,0,0)';

    // Wait exactly 0.5s for the CSS physics curve to complete before hiding the DOM element
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 500); 
};

window.uploadAvatar = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    
    window.toast("Uploading skin...");
    try {
        // Upload to Firebase Storage
        const storageRef = ref(storage, `avatars/${currentUserData.uid}_${Date.now()}`);
        await uploadBytes(storageRef, file);
        const photoURL = await getDownloadURL(storageRef);
        
        // Update Firebase Auth Profile
        await updateProfile(auth.currentUser, { photoURL });
        
        // Update DOM
        document.getElementById('sidebar-avatar').src = photoURL;
        document.getElementById('settings-avatar').src = photoURL;
        window.toast("Skin applied successfully!");
    } catch(err) {
        console.error(err);
        window.toast("Failed to update skin.");
    }
};

window.promptChangePassword = async () => {
    const newPass = prompt("Enter new password (minimum 6 characters):");
    if(!newPass) return;
    if(newPass.length < 6) return window.toast("Password too short.");
    
    try {
        await updatePassword(auth.currentUser, newPass);
        window.toast("Password updated! Please log in again.");
        window.authLogout();
    } catch(err) {
        // Usually requires recent sign-in to change password
        window.toast(err.message.includes('requires-recent-login') ? "For security, please log out, log back in, and try again." : err.message);
    }
};

window.promptDeleteAccount = async () => {
    const confirmDelete = confirm("WARNING: This will permanently delete your account, stats, and saved items. Type 'CONFIRM' to proceed.");
    if(confirmDelete !== 'CONFIRM') return window.toast("Account deletion cancelled.");
    
    try {
        const uid = currentUserData.uid;
        await deleteUser(auth.currentUser);
        // Wipe from Firestore
        await deleteDoc(doc(db, "users", uid));
        window.toast("Account wiped from server.");
        window.authLogout();
    } catch(err) {
        window.toast(err.message.includes('requires-recent-login') ? "Security verification needed: Log out, log back in, and try again." : err.message);
    }
};

// Start playtime tracking when user logs in successfully
function startPlaytimeTracker(dbPlaytime) {
    sessionStartTime = Date.now();
    totalHistoricalPlaytime = dbPlaytime || 0;
    
    // Save playtime to DB every 5 minutes automatically
    setInterval(async () => {
        if(auth.currentUser) {
            const sessionMins = Math.floor((Date.now() - sessionStartTime) / 60000);
            await updateDoc(doc(db, "users", auth.currentUser.uid), {
                playtime: totalHistoricalPlaytime + sessionMins
            });
        }
    }, 300000); // 5 mins
}