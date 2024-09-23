"use strict";

let winkelmandje;
if(!localStorage.getItem("winkelmandje")){
    winkelmandje=[];
} else{
    winkelmandje=JSON.parse(localStorage.getItem("winkelmandje"));
}
toonAlles();
document.getElementById("groenten").onclick = function () {
    hideItem("groenten");
}
document.getElementById("fruit").onclick = function () {
    hideItem("fruit");
}
document.getElementById("alles").onclick = function () {
    for (const item of document.querySelectorAll("item")) {
        item.hidden = false;
    }
}

document.getElementById("indexLink").onclick = function () {
    localStorage.setItem("winkelmandje", JSON.stringify(winkelmandje));
}
document.getElementById("assortimentLink").onclick = function () {
    localStorage.setItem("winkelmandje", JSON.stringify(winkelmandje));
}
document.getElementById("mandjeLink").onclick = function () {
    localStorage.setItem("winkelmandje", JSON.stringify(winkelmandje));
}
document.getElementById("contactLink").onclick = function () {
    localStorage.setItem("winkelmandje", JSON.stringify(winkelmandje));
}



// HIDE ITEMS
function hideItem(soort) {
    for (const item of document.querySelectorAll("item")) {
        if (item.dataset.soort !== soort) {
            item.hidden = true;
        } else {
            item.hidden = false;
        }
    }
}

// FETCH FRUIT AND GROENTEN 
async function toonAlles() {
    const responseGroenten = await fetch("groenten.json");
    const responseFruit = await fetch("fruit.json")
    if (responseGroenten.ok && responseFruit.ok) {
        const groenten = await responseGroenten.json();
        groenten.value = "groenten";
        const fruit = await responseFruit.json();
        fruit.value = "fruit";
        voegToe(groenten);
        voegToe(fruit);
    }
}

// ADD FRUIT AND GROENTEN TO GRID
function voegToe(soorten) {
    for (const soort of soorten) {
        const grid = document.getElementById("grid-container");
        const item = document.createElement("item");
        const img = document.createElement("img");
        const text = document.createElement("div");
        const mandje = document.createElement("img");
        
        grid.appendChild(item);
        item.appendChild(img);
        item.appendChild(text);
        item.appendChild(mandje);

        item.dataset.soort = soorten.value;
        
        img.src = soort.image;
        mandje.src = "mandjetoevoegen.jpg";
        text.innerText = `${soort.naam} (${soort.prijs} /${soort.eenheid})`;
        mandje.className = "mandje";
        item.onclick = function () {
            winkelmandje.push(soort.naam);
            updateWinkelmandje();
        }
    }
}

// UPDATE WINKELMANDJE
function updateWinkelmandje(){
    let aantal = document.getElementById("aantal");
    aantal.hidden = false;
    aantal.innerText = Number(winkelmandje.length);
    localStorage.setItem("winkelmandje", winkelmandje);
}