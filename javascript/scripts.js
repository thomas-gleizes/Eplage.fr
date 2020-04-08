let sea = "#2ecbfe";
let sand = "#ffd59b";
let geo = false;
let charge = true;
let filter = false;
let listFilter = [];


document.getElementById("search-input").addEventListener('keyup', function () {
    if (this.value.length > 2){
        // TODO autocomplete bar
    }
});

document.getElementById("search-btn").addEventListener("click", function () {
    let val = document.getElementById("search-input").value;
    if (charge) {
        charge = false;
        if (listFilter.length > 0) {
            selectWithFilter(val, listFilter);
        } else {
            selectPlage(val);
        }
    }
});


function createCard(tab) {
    console.log(tab);
    document.getElementById("list").innerHTML = "";
    let list = document.getElementById("list");
    if (tab.length === 0) {
        document.getElementById("warning").innerHTML = "Aucun résultat";
    } else {
        document.getElementById("warning").innerHTML = tab.length + " résultat(s) trouvées - 0 filtre utilisée";
        for (let i = 0; i < tab.length; i++) {
            let card = document.createElement("div");
            let HTML = "<div class='card'>\n" +
                "                <div class='card-image'>\n" +
                "                    <img src='./img/plage/" + tab[i].src + "'/>\n" +
                "                    <a class='btn-floating halfway-fab waves-effect waves-light sea'><i class='material-icons'>chevron_right</i></a>\n" +
                "                </div>\n" +
                "                <div class='card-content'>\n" +
                "                    <span class='card-title'> " + tab[i].NAME + "</span>\n" +
                "                    <p>La plage 1 est ouvert de 9h à 18h</p>\n" +
                "                </div>\n" +
                "                <div class='card-action'>\n" +
                "                    <i class='material-icons small'>map</i> <div>" + tab[i].CITY + " (" + tab[i].ZIPCODE.substring(0, 2) + ") </div>\n";
            if (tab[i].FLEACHID !== '0') {
                //TODO nombre de transate disponnible
                HTML += "<div class='count'><i class='count-icons material-icons small left'>beach_access</i> <div id='TranDispo'>ID</div></div>\n ";
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
        if (window.innerWidth <= 700) {
            document.body.style.paddingTop = "370px";
        } else document.body.style.paddingTop = "300px";

        filter = true;
    }
});

document.getElementById("search-btn").addEventListener("mouseover", function () {
    this.style.backgroundColor = sea
});

document.getElementById("search-btn").addEventListener("mouseout", function () {
    this.style.backgroundColor = sand
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
            console.log(listFilter);
        });
    }
}


function displayTransatDispo(tab){

}

getFilter();










                                                        




