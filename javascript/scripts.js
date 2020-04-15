
let sea = "#3ccebf";
let sand = "#ffd59b";
let geo = false;
let charge = true;
let filter = false;
let listFilter = [];

document.getElementById("search-input").addEventListener('keyup', function () {
    if (this.value.length > 0 && charge) {
        if (event.keyCode === 13) {
            document.getElementById("autocomplet-div").style.display = "none";
            startSearch()
        } else {
            getGeo(this.value);
            getLocal(this.value);
            getEtabli(this.value);
        }
    }
});

document.getElementById("search-input").addEventListener('click', function () {
    document.getElementById("autocomplet-div").style.display = "inline";
});

function startSearch () {
    document.getElementById("autocomplet-div").style.display = "none";
    let val = document.getElementById("search-input").value;
    if (charge) {
        charge = false;
        if (listFilter.length > 0) {
            selectWithFilter(val, listFilter);
        } else {
            selectPlage(val);
        }
    }
}

document.getElementById("search-btn").addEventListener("click", startSearch);

function createCard(tab) {
    console.log(tab);
    document.getElementById("list").innerHTML = "";
    let list = document.getElementById("list");
    if (tab.length === 0) {
        document.getElementById("warning").innerHTML = "Aucun résultat - <span id='nb-filter'>" + listFilter.length + " fitre utilisée(s) </span>";
    } else {
        document.getElementById("warning").innerHTML = tab.length + " résultat(s) trouvées - <span id='nb-filter'>" + listFilter.length + " filtre utilisée(s) </span>";
        for (let i = 0; i < tab.length; i++) {
            let card = document.createElement("div");
            let HTML = "<div class='card'>\n" +
                "                <div class='card-image'>\n" +
                "                    <img src='./img/plage/" + tab[i].src + "' alt='" + tab[i].NAME + "'/>\n" +
                "                    <a class='btn-floating halfway-fab waves-effect waves-light sea'><i class='material-icons'>chevron_right</i></a>\n" +
                "                </div>\n" +
                "                <div class='card-content'>\n" +
                "                    <span class='card-title'> " + tab[i].NAME + "</span>\n" +
                "                    <p>La plage 1 est ouvert de 9h à 18h</p>\n" +
                "                </div>\n" +
                "                <div class='card-action'>\n" +
                "                    <i class='material-icons small'>map</i> <div>" + tab[i].CITY + " (" + tab[i].ZIPCODE.substring(0, 2) + ") </div>\n";
            if (tab[i].FLEACHID !== '0') {
                HTML += "<div id='TranDispo-" + tab[i].FLEACHID + "' class='count'><i class='count-icons material-icons small left'>beach_access</i><span></span></div>\n ";
                getTransat(tab[i].FLEACHID)
            } else {
                //TODO afficher message
            }
            HTML += "            </div>\n" +
                "            </div>";
            card.innerHTML = HTML;
            card.id = "Plage-" + tab[i].ID;
            card.className = "col S12 m6 l3";
            list.appendChild(card);
        }
    }
    charge = true;
}

document.getElementById("filter-btn").addEventListener("click", function () {
    if (filter) {
        document.getElementById("list-filter").className = "row hidden";
        document.body.style.paddingTop = "150px";
        filter = false;
    } else {
        document.getElementById("list-filter").className = "row filter";
        if (window.innerWidth > 890) document.body.style.paddingTop = "320px";
        else if (window.innerWidth > 540) document.body.style.paddingTop = "350px";
        else document.body.style.paddingTop = "370px";
        filter = true;
    }
});


document.getElementById("geo-btn").addEventListener("click", function () {
    if (!geo) {
        geo = true;
        this.style.backgroundColor = "#FF5F6D"
    } else {
        geo = false;
        this.style.backgroundColor = sand;
    }
});

function generatefilter(tab) {
    let div = document.getElementById("list-filter");
    for (let i = 0; i < tab.length; i++) {
        let input = document.createElement("div");
        input.innerHTML = "<label>\n" +
            "                    <input id='check-" + tab[i].ID + "' type='checkbox' class='filled-in'/>\n" +
            "                    <span>" + tab[i].name + "</span>\n" +
            "                </label>";
        input.className = "check col l2 m3 s4";
        div.appendChild(input);
        document.getElementById("check-" + tab[i].ID).addEventListener('click', function () {
            let index = listFilter.indexOf(tab[i].ID);
            if (index === -1) {
                listFilter.push(tab[i].ID);
            } else {
                listFilter.splice(index, 1)
            }
        });
    }
}


function displayTransatDispo(tab) {
    console.log(tab);
    let div = document.getElementById("TranDispo-" + tab['id']);
    div.style.color = tab['color'];
    div.lastChild.innerHTML = tab['nbr'];
}
getFilter();


function displayGeoAutocopleted(tab) {
    let list = document.getElementById("liste-zone-geo");
    list.innerHTML = "";
    if (tab.length > 0) {
        console.log("GEO", tab);
        document.getElementById("res-geo").innerHTML = tab.length + " resultat(s)";
        document.getElementById("autocomplet-div").style.display = "inline";
        document.getElementById("zone-geo").style.display = "block";
        for (let i = 0; i < tab.length; i++) {
            let p = document.createElement('p');
            p.className = "li-auto";
            p.id = "zone-geo-" + tab[i][0].IDdepa;
            p.innerHTML = "Plages privée, " + tab[i][0].depa + " <span class='count-eta'>" + tab[i][0].NBID + " etablisemment(s)</span>";
            p.addEventListener("click", function () {
                if (charge) {
                    charge = false;
                    if (listFilter.length > 0) {
                        selectWithFilter(tab[i][0].depa.split('-')[1].substring(1), listFilter);
                    } else {
                        selectPlage(tab[i][0].depa.split('-')[1].substring(1));
                    }
                }
            });
            list.appendChild(p);
        }
    } else {
        document.getElementById("zone-geo").style.display = "none";
    }
}

function displayLocalAutocopleted(tab) {
    if (tab.length > 0) {
        console.log("Local", tab);
        document.getElementById("res-local").innerHTML = tab.length + " resultat(s)";
        document.getElementById("autocomplet-div").style.display = "inline";
        document.getElementById("local").style.display = "block";
        let list = document.getElementById("liste-zone-local");
        list.innerHTML = "";
        for (let i = 0; i < tab.length; i++) {
            let p = document.createElement('p');
            p.className = "li-auto";
            p.id = "zone-local-" + tab[i][0].ZIPCODE;
            p.innerHTML = "Plages privée, " + tab[i][0].ZIPCODE.substring(0, 2) + " - " + tab[i][0].CITY + " <span class='count-eta'>" + tab[i][0].NBID + " etablisemment(s)</span>";
            p.addEventListener("click", function () {
                if (charge) {
                    charge = false;
                    if (listFilter.length > 0) {
                        selectWithFilter(tab[i][0].CITY, listFilter)
                    } else {
                        selectPlage(tab[i][0].CITY)
                    }
                    document.getElementById("autocomplet-div").style.display = "none";
                }
            });
            list.appendChild(p);
        }
    } else {
        document.getElementById("local").style.display = "none";
    }
}


function displayEtabliAutocopleted(tab) {
    if (tab.length > 0) {
        console.log("Etabli", tab);
        document.getElementById("res-etabli").innerHTML = tab.length + " resultat(s)";
        document.getElementById("autocomplet-div").style.display = "inline";
        document.getElementById("etabli").style.display = "block";
        let list = document.getElementById("liste-zone-etabli");
        list.innerHTML = "";
        for (let i = 0; i < tab.length; i++) {
            let p = document.createElement('p');
            p.className = "li-auto";
            p.id = "etabli-" + tab[i].ID;
            p.innerHTML = tab[i].NAME + "<span class='count-eta'> " + tab[i].CITY + "</span>";
            p.addEventListener("click", function () {
                console.log(this);
            });
            list.appendChild(p);
        }
    } else {
        document.getElementById("etabli").style.display = "none";
    }
}


function setCharge() {
    charge = true;
}

document.body.addEventListener("click", function () {
    document.getElementById("autocomplet-div").style.display = "none";
});


document.getElementById('geo-btn').addEventListener("click", function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
        });
    } else {
        console.log("Pas de GEO");
    }
});

/*
function deg2rad(x){
    return Math.PI*x/180;
}

function get_distance_m($lat1, $lng1, $lat2, $lng2) {
    $earth_radius = 6378137;   // Terre = sphère de 6378km de rayon
    $rlo1 = deg2rad($lng1);    // CONVERSION
    $rla1 = deg2rad($lat1);
    $rlo2 = deg2rad($lng2);
    $rla2 = deg2rad($lat2);
    $dlo = ($rlo2 - $rlo1) / 2;
    $dla = ($rla2 - $rla1) / 2;
    $a = (Math.sin($dla) * Math.sin($dla)) + Math.cos($rla1) * Math.cos($rla2) * (Math.sin($dlo) * Math.sin($dlo
    ));
    $d = 2 * Math.atan2(Math.sqrt($a), Math.sqrt(1 - $a));
    return ($earth_radius * $d);
}
*/




