"use strict";

document.getElementById("verzenden").onclick = function () {
    const inputNaam = document.getElementById("naam");
    const inputEmail = document.getElementById("email");
    const inputOnderwerp = document.getElementById("onderwerp");
    const inputBericht = document.getElementById("bericht");
    const fout = document.getElementById("fout");
    if (inputNaam.checkValidity() && inputEmail.checkValidity() && inputOnderwerp.checkValidity() && inputBericht.checkValidity()) {
        fout.hidden = true;
    } else {
        fout.hidden = false;
    }
}

document.getElementById("leegmaken").onclick = function () {
    const inputNaam = document.getElementById("naam");
    const inputAdres = document.getElementById("adres");
    const inputEmail = document.getElementById("email");
    const inputGsm = document.getElementById("gsm");
    const inputOnderwerp = document.getElementById("onderwerp");
    const inputBericht = document.getElementById("bericht");
    inputNaam.value = "";
    inputAdres.value = "";
    inputEmail.value = "";
    inputGsm.value = "";
    inputOnderwerp.value = "";
    inputBericht.value = "";
}