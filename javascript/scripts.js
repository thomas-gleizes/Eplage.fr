let sea = "#3ccebf";
let sand = "#ffd59b";
let geo = false;
let filter = false;
let listFilter = [];

let latitude = 0;
let longitude = 0;

let index = 0;

let oldfilter = [];
let oldSearch = "";
let oldGeo = geo;


if (window.location.search !== "") {
    if (window.location.search.split('?')[1].split("=")[0] === "search") {
        let url = window.location.search.split('?')[1].split("&");
        console.log(url);
        for (let i = 0; i < url.length; i++) {
            let get = url[i].split("=");
            if (get[0] === "search") {
                let str = get[1];
                while (str.indexOf('%20') !== -1) {
                    str = str.replace('%20', ' ')
                }
                document.getElementById("search-input").value = str;
            } else if (get[0] === "geo") {
                getCord();
            } else if (get[0] === "filter") {
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

function buildUrl(search) {
    let url = "./?search=" + search.deleteAccent();
    if (listFilter.length > 0) url += "&filter=" + listFilter;
    if (geo) url += "&geo=true";
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
            getAutoDepa(this.value);
            getAutoCity(this.value);
            getAutoBeach(this.value);
        }
    }
});


document.getElementById("more-btn").addEventListener("click", function () {
    if (oldfilter.length > 0) {
        if (oldGeo) searchAdvance(oldSearch, longitude, latitude, oldfilter, index);
        else searchAdvance(oldSearch, '', '', oldfilter, index);
    } else {
        if (oldGeo) searchAdvance(oldSearch, longitude, latitude, '', index);
        else searchAdvance(oldSearch, '', '', '', index);
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

function startSearch() {
    console.log(index);
    let val = document.getElementById("search-input").value;
    oldfilter = listFilter;
    oldSearch = val;
    oldGeo = geo;
    document.getElementById("nb-filter").innerHTML = " - " + listFilter.length + " filtre(s) utilisé(s)";
    index = 0;
    console.log(index)
    document.getElementById("autocomplet-div").style.display = "none";
    if (listFilter.length > 0) {
        if (geo) searchAdvance(val, longitude, latitude, listFilter);
        else searchAdvance(val, '', '', listFilter);
    } else {
        if (geo) searchAdvance(val, longitude, latitude,);
        else searchAdvance(val);
    }
}

function createCard(tab) {
    console.log("TAB : ", tab);
    let list = document.getElementById("list");
    if (index === 0) list.innerHTML = "";

    if (typeof tab['count'] !== "undefined") {
        document.getElementById("count-res").innerHTML = `${tab['count']} Résultat(s)`;
        for (let i = 0; i < tab['card'].length; i++) {
            let card = document.createElement("div");
            let HTML = `<div class='card'>
                        <div class='card-image'>
                            <img src='./img/plage/${tab['card'][i]['src']}' alt='${tab['card'][i]['NAME']}'/>
                            <a id='btn-id-${tab['card'][i]['ID']}' class='btn-floating halfway-fab waves-effect waves-light sea'><i class='material-icons'>chevron_right</i></a>
                        </div>
                        <div class='card-content'>
                            <span class='card-title'> ${tab['card'][i]['NAME']}</span>
                            <p>La plage 1 est ouvert de 9h à 18h</p>
                        </div>
                        <div class='card-action'>
                            <i class='material-icons small'>map</i><div>${tab['card'][i]['CITY']} (${tab['card'][i]['ZIPCODE'].substring(0, 2)}) </div>`;
            if (tab['card'][i]['FLEACHID'] !== '0') {
                HTML += `<div id='TranDispo-${tab['card'][i]['FLEACHID']}' class='count'><img class='load-gif' src='./img/logo/loading.gif'></div>`;
                getTransat(tab['card'][i]['FLEACHID'], displayTransatDispo)
            } else {
                HTML += "<div class='count'><i class='count-icons material-icons small left'>error_outline</i></div>\n ";
            }
            HTML += `</div></div>`;
            card.innerHTML = HTML;
            card.id = `Plage-${tab['card'][i]['ID']}`;
            card.className = "col S12 m6 l3";
            list.appendChild(card);
            document.getElementById(`btn-id-${tab['card'][i]['ID']}`).addEventListener("click", function () {
                displayBeach(tab['card'][i]['ID']);
            });
            index = tab['card'][i]['ID'];
        }
        if (tab['card'].length === 8) document.getElementById("more-btn").style.display = "inline-block";
        else document.getElementById("more-btn").style.display = "none";
    } else {
        document.querySelector("span#count-res").innerText = "0 Résultat";
        document.querySelector("a#more-btn").style.display = "none";
    }

}

function displayTransatDispo(tab) {
    console.log(tab);
    let div = document.getElementById(`TranDispo-${tab['id']}`);
    div.style.color = tab['color'];
    div.innerHTML = `<i class='count-icons material-icons small left'>beach_access</i><span> ${tab['nbr']}</span>`;
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
        input.innerHTML = `<label>
                    <input id='check-${tab[i].ID}' type='checkbox' class='filled-in'/>
                    <span>${tab[i].name}</span>
                </label>`;
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

function displayDepaAutocopleted(tab) {
    let list = document.getElementById("liste-zone-geo");
    list.innerHTML = "";
    if (tab.length > 0) {
        console.log("DEPA", tab);
        document.getElementById("res-geo").innerHTML = tab.length + " resultat(s)";
        document.getElementById("autocomplet-div").style.display = "inline";
        document.getElementById("zone-geo").style.display = "block";
        for (let i = 0; i < tab.length; i++) {
            let p = document.createElement('p');
            p.className = "li-auto";
            p.id = `zone-geo-${tab[i].IDdepa}`;
            p.innerHTML = `Plages privée, ${tab[i].depa} <span class='count-eta'>${tab[i].NBID} etablisemment(s)</span>`;
            p.addEventListener("click", function () {
                if (testUrl()) {
                    console.log(this);
                    window.location.href = (buildUrl(tab[i].depa.split('-')[1].substring((1))));
                } else {
                    document.getElementById("search-input").value = tab[i].depa.split('-')[1].substring(1)
                    startSearch();
                    document.getElementById("autocomplet-div").style.display = "none";
                }
            });
            list.appendChild(p);
        }
    } else {
        document.getElementById("zone-geo").style.display = "none";
    }
}

function displayCityAutocopleted(tab) {
    if (tab.length > 0) {
        console.log("CITY", tab);
        document.getElementById("res-local").innerHTML = tab.length + " resultat(s)";
        document.getElementById("autocomplet-div").style.display = "inline";
        document.getElementById("local").style.display = "block";
        let list = document.getElementById("liste-zone-local");
        list.innerHTML = "";
        for (let i = 0; i < tab.length; i++) {
            let p = document.createElement('p');
            p.className = "li-auto";
            p.id = `zone-local-${tab[i].ZIPCODE}`;
            p.innerHTML = `Plages privée, ${tab[i].ZIPCODE.substring(0, 2)} - ${tab[i].CITY} <span class='count-eta'>${tab[i].NBID} etablisemment(s)</span>`;
            p.addEventListener("click", function () {
                if (testUrl()) {
                    window.location.href = buildUrl(tab[i].CITY);
                } else {
                    document.getElementById("search-input").value = tab[i].CITY;
                    startSearch();
                    document.getElementById("autocomplet-div").style.display = "none";
                }
            });
            list.appendChild(p);
        }
    } else {
        document.getElementById("local").style.display = "none";
    }
}

function displayBeachAutocopleted(tab) {
    if (tab.length > 0) {
        console.log("BEACH", tab);
        document.getElementById("res-etabli").innerHTML = tab.length + " resultat(s)";
        document.getElementById("autocomplet-div").style.display = "inline";
        document.getElementById("etabli").style.display = "block";
        let list = document.getElementById("liste-zone-etabli");
        list.innerHTML = "";
        for (let i = 0; i < tab.length; i++) {
            let p = document.createElement('p');
            p.className = "li-auto";
            p.id = "etabli-" + tab[i].ID;
            p.innerHTML = `${tab[i].NAME}<span class='count-eta'> ${tab[i].CITY}</span>`;
            p.addEventListener("click", function () {
                displayBeach(tab[i].ID)
            });
            list.appendChild(p);
        }
    } else {
        document.getElementById("etabli").style.display = "none";
    }
}


document.body.addEventListener("click", function (event) {
    console.log(event.target.className)
    if (typeof event.target.id !== "undefined") {
        if (event.target.id == "search-input") {
            document.querySelector("div#autocomplet-div").style.display = "block";
            return null;
        }
    } else if(typeof event.target.className !== "undefined"){
        if (event.target.className == "li-auto"){
            document.querySelector("div#autocomplet-div").style.display = "none";
            return null
        }
    }
    console.log("zeezzezeze")
    let val = "none";
    event.path.forEach((element) => {
        if (typeof element.id !== "undefined") {
            if (element.id === "autocomplet-div") val = "block";
        }
    });
    document.querySelector("div#autocomplet-div").style.display = val;
    return null
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

function displayCount(nb) {
    console.log("type of nb : ", typeof nb);
    if (typeof nb == "object") nb = "0";
    document.getElementById("count-res").innerHTML = `${nb} résultat(s) trouvé(s)`;
}

function displayBeach(BID) {
    document.location.href = `./plage.html?BID=${BID}`;
}


if (window.location.search === "") {
    selectRandBeach();
}


String.prototype.deleteAccent = function () {
    let accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    let noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

    let str = this;
    for (var i = 0; i < accent.length; i++) {
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
};
