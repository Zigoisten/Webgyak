function Sumofarr(repeats) {
    db = 0;
    var szam = repeats.filter(function(v) {
        return repeats.filter(function(v1) {
            return v1 == v;
        }).length == 1;
    });
    db += szam;
    return db;
};

function Sortedarr(arr) {
    let sortarr = arr.sort();
    return sortarr;
};

function Insdash(arr) {
    var szamjegy = arr.toString();
    var eredmeny = '';
    for (var i = 0; i < szamjegy.length - 1; i++) {
        eredmeny += szamjegy[i];
        if (parseInt(szamjegy[i]) % 2 !== 0 && parseInt(szamjegy[i+1]) % 2 !== 0) {
            eredmeny += '-';
        }
    }
    eredmeny += szamjegy[szamjegy.length -1];
    return eredmeny;
}