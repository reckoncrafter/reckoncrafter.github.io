function darkMode(){
    var button = document.getElementById("dm-toggle");
    let root = document.documentElement;

    root.style.setProperty("--fg-color", "var(--dm-fg-color)");
    root.style.setProperty("--bg-color", "var(--dm-bg-color)");
    
    button.innerHTML = "<h1>&#x1F319;</h1>";

    sessionStorage.setItem("theme", "dark");
}
function lightMode(){
    let root = document.documentElement;
    var button = document.getElementById("dm-toggle");

    root.style.setProperty("--fg-color", "var(--lm-fg-color)");
    root.style.setProperty("--bg-color", "var(--lm-bg-color)");

    button.innerHTML = "<h1>&#x2600;&#xFE0F;</h1>";
    sessionStorage.setItem("theme", "light");
}
function toggleMode(){ 
    if(sessionStorage.getItem("theme") == "light"){
        darkMode();
    }
    else{
        lightMode();
    }
}

// Set theme
if(sessionStorage.getItem("theme") == "light"){
    lightMode();
}
else{
    darkMode();
}