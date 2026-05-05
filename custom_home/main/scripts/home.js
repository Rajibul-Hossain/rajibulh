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
