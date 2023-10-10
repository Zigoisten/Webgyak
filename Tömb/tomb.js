let nyelvek = ["HTML", "CSS", "JS"];

function ElsoGomb() {
    let list = nyelvek.slice(0,1);
    console.log(list);
    document.getElementById("elso").innerHTML = list;
}

function MasodikGomb() {
    let list = nyelvek.slice(1,2);
    console.log(list);
    document.getElementById("masodik").innerHTML = list;
}

function HarmadikGomb() {
    let list = nyelvek.slice(2);
    console.log(list);
    document.getElementById("harmadik").innerHTML = list;
}

function OsszegGomb() {
    let list= nyelvek.slice(0,3);
    console.log(list);
    document.getElementById("osszeg").innerHTML = list;
}