let charge = true;
let filter = [];
let filterActive = false;

document.onload = getFilter();

document.getElementById("search-input").addEventListener('keyup', function () {
    if (this.value.length > 1 && charge) {
        charge = false;
        selectPlage(this.value);
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
                "                    <a class='btn-floating halfway-fab waves-effect waves-light blue darken-3'><i class='material-icons'>chevron_right</i></a>\n" +
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

function displayFilter(tab){
    console.log(tab);
    let list = document.getElementById("list-filter");
    for (let i = 0; i < tab.length; i++){
        let li = document.createElement("li");
        li.id = "filter-" + tab[i].ID;
        li.className = "filt";
        li.innerHTML = tab[i].name;
        li.addEventListener("mouseover", function () {
            this.style.border = "solid 1.5px #1565c0";
        });
        li.addEventListener("mouseout", function () {
            this.style.border = "solid 1px silver";
        });
        list.appendChild(li);
    }
}

document.getElementById("add-filter").addEventListener('click', function () {
    if (!filterActive){
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

function mouseOnFilter() {

}

                                                        





