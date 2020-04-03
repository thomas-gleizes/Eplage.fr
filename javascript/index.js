let sea = "#2ecbfe";
let sand = "#ffd59b";
let geo = "false";
let charge = true;


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
            let HTML = "<div class='card'>\n" +
                "                <div class='card-image'>\n" +
                "                    <img src= \"" + src + "\"  />\n" +
                "                    <a class='btn-floating halfway-fab waves-effect waves-light sea'><i class='material-icons'>chevron_right</i></a>\n" +
                "                </div>\n" +
                "                <div class='card-content'>\n" +
                "                    <span class='card-title'> " + tab[i].NAME + "</span>\n" +
                "                    <p>La plage 1 est ouvert de 9h à 18h</p>\n" +
                "                </div>\n" +
                "                <div class='card-action'>\n" +
                "                    <i class='material-icons small'>map</i> <div>" + tab[i].CITY + " (" + tab[i].ZIPCODE.substring(0, 2) + ") </div>\n";
            if (tab[i].FLEACHID !== 0) {
                //TODO nombre de transate disponnible
                //HTML += "<div class='count'><i class='count-icons material-icons small left'>beach_access</i> ID </div>\n ";
            } else {
                //TODO afficher message
                //HTML += "";
            }
            HTML += "          <div class='count'><i class='count-icons material-icons small left'>beach_access</i> ID </div>\n " +
                "                </div>\n" +
                "            </div>";
            card.innerHTML = HTML;
            card.id = "Plage-" + tab[i].ID;
            card.className = "col S12 m6 l3";
            list.appendChild(card);
        }
    }
    charge = true;
}


document.getElementById("search-btn").addEventListener("mouseover", function () {
    this.style.backgroundColor = sea
});

document.getElementById("search-btn").addEventListener("mouseout", function () {
    this.style.backgroundColor = sand
});


document.getElementById("get-btn").addEventListener("mouseout", function () {
    if (!geo) {

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















                                                        





