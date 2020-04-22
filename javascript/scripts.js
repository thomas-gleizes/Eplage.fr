let sea = "#3ccebf";
let sand = "#ffd59b";
let geo = false;
let filter = false;
let listFilter = [];

let latitude = 0;
let longitude = 0;


if (window.location.search !== "") {
    if (window.location.search.split('?')[1].split("=")[0] === "search"){
        let url = window.location.search.split('?')[1].split("&");
        console.log(url);
        for (let i = 0; i < url.length; i++){
            let get = url[i].split("=")
            if (get[0] === "search"){
                document.getElementById("search-input").value = get[1];
            } else if (get[0] === "geo"){
                getCord();
            } else if (get[0] === "filter"){
                listFilter = get[1].split(',');
            }
        }
        startSearch();
    }
}

function testUrl() {
    if (window.location.search !== "") return window.location.search.split("?")[1].split('=')[0] === "BID";
    else return false;
}

function buildUrl (search){
    let url = "./?search=" + search.deleteAccent();
    if (listFilter.length > 0) url += "&filter=" + listFilter;
    if (geo) url += "&geo=true"
    return url;
}

document.getElementById("search-input").addEventListener('keyup', function () {
    if (this.value.length > 2) {
        if (event.keyCode === 13) {
            if (testUrl()) {
                window.location.href = buildUrl(this.value);
            } else {
                document.getElementById("autocomplet-div").style.display = "none";
                startSearch()
            }
        } else {
            getGeo(this.value);
            getLocal(this.value);
            getEtabli(this.value);
        }
    }
});

document.getElementById("search-btn").addEventListener("click", function () {
    if (testUrl()) {
        let input = document.getElementById("search-input");
        if (input.value.length > 0) window.location.href = buildUrl(input.value);
    } else {
        startSearch();
    }
});


document.getElementById("search-input").addEventListener('click', function () {
    document.getElementById("autocomplet-div").style.display = "inline";
});

function startSearch() {
    document.getElementById("autocomplet-div").style.display = "none";
    let val = document.getElementById("search-input").value;
    if (listFilter.length > 0) {
        if (geo) getPlageProxi(val, longitude, latitude, listFilter);
        else selectWithFilter(val, listFilter);
    } else {
        if (geo) getPlageProxi(val, longitude, latitude, '');
        else selectPlage(val);
    }
}


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
                "                    <a id='btn-id-" + tab[i].ID + "' class='btn-floating halfway-fab waves-effect waves-light sea'><i class='material-icons'>chevron_right</i></a>\n" +
                "                </div>\n" +
                "                <div class='card-content'>\n" +
                "                    <span class='card-title'> " + tab[i].NAME + "</span>\n" +
                "                    <p>La plage 1 est ouvert de 9h à 18h</p>\n" +
                "                </div>\n" +
                "                <div class='card-action'>\n" +
                "                    <i class='material-icons small'>map</i> <div>" + tab[i].CITY + " (" + tab[i].ZIPCODE.substring(0, 2) + ") </div>\n";
            if (tab[i].FLEACHID !== '0') {
                HTML += "<div id='TranDispo-" + tab[i].FLEACHID + "' class='count'><img class='load-gif' src='./img/logo/loading.gif'></div>\n ";
                getTransat(tab[i].FLEACHID, displayTransatDispo)
            } else {
                HTML += "<div class='count'><i class='count-icons material-icons small left'>error_outline</i></div>\n ";
            }
            HTML += "            </div>\n" +
                "            </div>";
            card.innerHTML = HTML;
            card.id = "Plage-" + tab[i].ID;
            card.className = "col S12 m6 l3";
            list.appendChild(card);
            document.getElementById("btn-id-" + tab[i].ID).addEventListener("click", function () {
                displayBeach(tab[i].ID);
            });
        }
    }
}

function displayTransatDispo(tab) {
    console.log(tab);
    let div = document.getElementById("TranDispo-" + tab['id']);
    div.style.color = tab['color'];
    div.innerHTML = "<i class='count-icons material-icons small left'>beach_access</i><span> " + tab['nbr'] + "</span>";
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
                if (testUrl()){
                    window.location.href = (buildUrl(tab[i][0].depa.split('-')[1].substring((1))));
                } else {
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
                if (testUrl()) {
                    window.location.href = buildUrl(tab[i][0].CITY);
                } else {
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
                displayBeach(tab[i].ID)
            });
            list.appendChild(p);
        }
    } else {
        document.getElementById("etabli").style.display = "none";
    }
}


document.body.addEventListener("click", function () {
    document.getElementById("autocomplet-div").style.display = "none";
});



document.getElementById("geo-btn").addEventListener("click", getCord);

function getCord() {
    if (!geo) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log(position.coords.latitude, position.coords.longitude);
                longitude = position.coords.longitude;
                latitude = position.coords.latitude;
                geo = true;
                document.getElementById('geo-btn').style.backgroundColor = "#FF5F6D"
            });
        }
    } else {
        geo = false;
        document.getElementById("geo-btn").style.backgroundColor = sand;
    }
}



function displayBeach(BID) {
    document.location.href = "./plage.html?BID=" + BID;
}


if (window.location.search === ""){
    selectRandBeach();
}




String.prototype.deleteAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
};
