if(localStorage.getItem("name")==null){
    localStorage.setItem("name", prompt("Your Name..."));
}
function paste(){
    navigator.clipboard.readText().then(text => {
        text != "" ? q.value += text : alert(":| Your clipboard is empty.");
    }).catch(() => {
        alert(":( Permission denied!");
    });
}
srch.addEventListener("submit", function(){
    const prefixes = {
        "/c": "https://codepen.io/seatch/pens?q=",
        "/y": "https://www.youtube.com/results?search_query=",
        "/m": "https://minecraft.fandom.com/wiki/Special:Search?query=",
        "/s": "https://open.spotify.com/search/",
        "/w": "https://en.wikipedia.org/index.php?search="
    };
    const input = q.value.trim();
    const prefix =  input.slice(0,2);
    const query = input.slice(2);
    let searchURL;
    
    if (prefixes.hasOwnProperty(prefix)) {
        searchURL = prefixes[prefix];
    } else {
        searchURL = " https://www.bing.com/search?q=" + prefix;
    }

    if (query.length > 0) {
        window.open(searchURL + query);
    }
});

function clock(){
    const now = new Date();
    [h, m] = [now.getHours(), now.getMinutes()];
     ['hr', 'min'].forEach((x, i) => document.getElementById(x).style.transform = `rotate(${[h % 12 * 5, m][i] * 6}deg)`);
     digi.innerHTML = h + ":" + m;
     wish.innerHTML = `Good ${h<12? "Morning" : h <18? "AfternooN" : "Evening"}, <br>${localStorage.getItem("name")}`;
     setTimeout(clock, 6e4);
}clock();

function cal(x){
    c.value += x;
}
calc.addEventListener("submit", function(){
    c.value = eval(c.value);
})
function back(){
    const s = c.selectionStart - 1
    c.value = c.value.slice(0,s) + c.value.slice(s+1);
    c.selectionStart = c.selectionEnd = s;
}
chem.addEventListener("submit", function(){
     al.stle.height = '7ch';
     al.style.padding = "2ch";
     chem.stlye.height = "40vh";
     doBalance();
});
function mic(){
    var rec = window.webkitSpeechRecognition ? new window.webkitSpeechRecognition():
    (window.SpeechRecognition ? new window.SpeechRecognition() : null);
    if (rec){
        rec.lang = 'en-IN';
        rec.onstart = () =>{
            q.placeholder = "Listening......";
        }
        rec.onerror = e =>{
            alert("Permissoon" + e.error);
            q.placeholder = "what you wanna surf?";
        }
        rec.onnomatch = () => {
            rec.start();
        }
        rec.onresult = e =>{
            q.value += e.results[0][0].transcript;
            q.placeholder = "Search On R One";
        }
        rec.start();
    }
}
document.addEventListener('contextmenu', e =>{
    e.preventDefault();
});
const u = (/Mobi|Android|iPhone|iPad|Windows Phone/.test(navigator.userAgent));
val vl;
mob.href = u ? "css/mob.css" :  "css/notmob.css";
u ? vl=0 : vl = 69;

const formulaElem = document.getElementById("sce");
function doBalance(){
    const msgElem = document.getElementById("msg");
    const balancedElem = document.getElementById("rslt");
    const codeOutElem = document.getElementById("code");
    msgElem.textContent = "";
    while (balancedElem.firstChild ! == null)
        balancedElem.removeChild(balancedElem.firstChild);
    while (codeOutElem.firstChild !== null)
        codeOutElem.removeChild(codeOutElem.firstChild);
    codeOutElem.textContent = " ";
    const formulaStr = formulaElem.value;
    let eqn;
      try {
        eqn = new Parser(formulaStr).parseEquation();
    }
   catch(e){
    if(e instanceof ParseError){
        msgElem.textContent = "sysntax err:" + e.message;
        const start = e.start;
        let end = e.end !== undefined ? e.end:e.start;
        while (end > start && [" ", "\t"].includes(formulaStr.charAt(end - 1)))
          end--;
        if (start == end)
                end++;
        codeOutElem.textContent = formulaStr.substring(0, start);
        if(end <= formulaStr.length){
             codeOutElem.append(createElem("u", formulaStr.substring(start, end)));
            codeOutElem.append(formulaStr.substring(end, formulaStr.length));

        }
    }
   }
}