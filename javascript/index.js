let charge = true;
let filter = [];
let filterActive = false;


for (let i = 1; i < 21; i++) {
    let li = document.getElementById("filter-" + i);
    li.addEventListener("mouseover", function () {
        this.style.border = "solid 2px #ffd774";
    });
    li.addEventListener("mouseout", function () {
        if (filter.indexOf(this.id.split('-')[1]) === -1) this.style.border = "solid 1px silver";
        else this.style.border = "solid 1.5px #ffd59b";
    });
    li.addEventListener("click", function () {
        let id = this.id.split('-')[1];
        if (filter.indexOf(id) === -1) {
            filter.push(id);
            this.style.border = "solid 1.5px #ffd59b";
        } else {
            filter.splice(filter.indexOf(id), 1);
            this.style.border = "solid 1px silver";
        }

    });
}


document.getElementById("search-input").addEventListener('keyup', function () {
    if (this.value.length > 1 && charge) {
        charge = false;
        if (filterActive) {
            selectWithFilter(this.value, filter);
        } else {
            selectPlage(this.value);
        }
    }
});

document.getElementById("search-btn").addEventListener("click", function () {
    let val = document.getElementById("search-input").value;
    if (charge && filter.length !== 0) {
        charge = false;
        if (filterActive) {
            selectWithFilter(val, filter);
        } else {
            selectPlage(val);
        }
    }
});


function createCard(tab) {
    document.getElementById("list").innerHTML = "";
    let list = document.getElementById("list");
    if (tab.length === 0) {
        document.getElementById("warning").innerHTML = "Aucun résultat";
    } else {
        document.getElementById("warning").innerHTML = tab.length + " résultat(s) trouvée...";
        for (let i = 0; i < tab.length; i++) {
            let card = document.createElement("div");
            let src = tab[i].src.split('¤')[0];
            card.innerHTML = "<div class='card'>\n" +
                "                <div class='card-image'>\n" +
                "                    <img src= \"" + src + "\"  />\n" +
                "                    <a class='btn-floating halfway-fab waves-effect waves-light bluet'><i class='material-icons'>chevron_right</i></a>\n" +
                "                </div>\n" +
                "                <div class='card-content'>\n" +
                "                    <span class='card-title'> " + tab[i].NAME + "</span>\n" +
                "                    <p>La plage 1 est ouvert de 9h à 18h</p>\n" +
                "                </div>\n" +
                "                <div class='card-action'>\n" +
                "                    <i class='material-icons small'>map</i> <div>" + tab[i].CITY + " (" + tab[i].ZIPCODE.substring(0, 2) + ") </div>\n" +
                "                </div>\n" +
                "            </div>";
            card.id = "Plage-" + tab[i].ID;
            card.className = "col S12 m6 l3";
            list.appendChild(card);
        }
    }
    charge = true;
}


document.getElementById("add-filter").addEventListener('click', function () {
    if (!filterActive) {
        filterActive = true;
        this.innerHTML = "<i class=\"material-icons left\">list</i>Enlever filtre";
        document.getElementById("filter").style.display = "inline";
    } else {
        filterActive = false;
        this.innerHTML = "<i class=\"material-icons left\">list</i>Ajouter filtre";
        document.getElementById("filter").style.display = "none";
    }
});

document.getElementById("filter").addEventListener("mouseover", function () {
    document.getElementById("list-filter").style.display = "block"
});

document.getElementById("filter").addEventListener("mouseout", function () {
    document.getElementById("list-filter").style.display = "none"
});


document.getElementById('btn-proxi').addEventListener("click", function () {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let lattitude =  (position.coords.latitude).toString().substring(0,7);
            let longitude =  (position.coords.longitude).toString().substring(0,7);
            selectProximity(longitude, lattitude);
        });
    }
});


                                                        





