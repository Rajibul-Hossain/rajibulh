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