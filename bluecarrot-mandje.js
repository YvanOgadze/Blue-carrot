"use strict"; 

toonAlles();
document.getElementById("toevoegen").onclick = function () {
    const keuzeInput = document.getElementById("keuze");
    const keuzeAantal = document.getElementById("aantalKeuze");
    const leeg = document.getElementById("leeg");
    const tabelBestelling = document.getElementById("bestelling");
    if (keuzeInput.checkValidity() && keuzeAantal.checkValidity()) {
        leeg.hidden = true;
        tabelBestelling.hidden = false;
        const aantal = Number(keuzeAantal.value);
        const keuze = keuzeInput.options[keuzeInput.selectedIndex];
        const naam = keuze.dataset.naam;
        vulTabelAan(naam, aantal);
    }
}

// VUL TABEL AAN WANNEER JE OP KNOP TOEVOEGEN KLIKT
function vulTabelAan(naam, aantal) {
    for (const tr of document.getElementsByTagName("tr")) {
        if (naam === tr.dataset.naam) {
            const oudeAantal = Number(tr.cells[4].innerText);
            const eenheidPrijs = Number(tr.cells[2].innerText);
            tr.cells[4].innerText = (oudeAantal + aantal);
            const nieuweAantal = (tr.cells[4].innerText);
            const nieuwePrijs = (nieuweAantal * eenheidPrijs);
            tr.cells[6].innerText = Math.round(nieuwePrijs * 100) / 100;
            tr.hidden = false;
        }
    }
}

// ADD FRUIT AND GROENTEN TO SELECT OPTION
function voegToe(soorten) {
    for (const soort of soorten) {
        const select = document.querySelector("select");
        const option = document.createElement("option");
        option.dataset.naam = soort.naam;
        select.appendChild(option);
        option.innerText = `${soort.naam} (${soort.prijs}/${soort.eenheid})`
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
        maakTabel(groenten);
        maakTabel(fruit);
    }
}

function maakTabel(soorten) {
    for (const soort of soorten) {
        const tbody = document.querySelector("tbody");
        const tr = tbody.insertRow();
        tr.dataset.naam = soort.naam;
        tr.dataset.prijs
        const tdFoto = tr.insertCell();
        const imgFoto = document.createElement("img");
        tdFoto.appendChild(imgFoto);
        imgFoto.src = soort.image;
        imgFoto.classList.add("fotos");
        const tdNaam = tr.insertCell();
        tdNaam.innerText = soort.naam;
        const tdPrijs = tr.insertCell();
        tdPrijs.innerText = soort.prijs;
        const tdMin = tr.insertCell();
        const imgMin = document.createElement("img");
        tdMin.appendChild(imgMin);
        imgMin.src = "minteken.png";
        imgMin.classList.add("fotos");
        const tdAantal = tr.insertCell();
        tdAantal.innerText = 0;
        const tdPlus = tr.insertCell();
        const imgPlus = document.createElement("img");
        tdPlus.appendChild(imgPlus);
        imgPlus.src = "plusteken.png";
        imgPlus.classList.add("fotos");
        const tdSaldo = tr.insertCell();
        tdSaldo.innerText = 0;
        const tdDelete = tr.insertCell();
        const imgDelete = document.createElement("img");
        tdDelete.appendChild(imgDelete);
        imgDelete.src = "kruisje.png";
        imgDelete.classList.add("fotos");
        tr.hidden = true;
        tdDelete.onclick = function () {
            tr.remove();
        }
        tdMin.onclick = function () {
            const oudeAantal = Number(tdAantal.innerText);
            const eenheidPrijs = Number(tdPrijs.innerText);
            tdAantal.innerText = (oudeAantal - 1);
            const nieuweAantal = (tdAantal.innerText);
            const nieuwePrijs = (nieuweAantal * eenheidPrijs);
            tdSaldo.innerText = Math.round(nieuwePrijs * 100) / 100;
        }
        tdPlus.onclick = function () {
            const oudeAantalPlus = Number(tdAantal.innerText);
            const eenheidPrijsPlus = Number(tdPrijs.innerText);
            tdAantal.innerText = (oudeAantalPlus + 1);
            const nieuweAantalPlus = (tdAantal.innerText);
            const nieuwePrijsPlus = (nieuweAantalPlus * eenheidPrijsPlus);
            tdSaldo.innerText = Math.round(nieuwePrijsPlus * 100) / 100;
        }
    }
}

/* 
function zoekMetNaam(naam) {
    let gevonden = false;
    for (const tr of document.getElementsByTagName("tr")) {
        if (naam === tr.dataset.naam) {
            gevonden = true
        }
    }
    return gevonden;
}
*/