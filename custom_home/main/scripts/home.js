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