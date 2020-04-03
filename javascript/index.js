

let sea = "#2ecbfe";
let sand = "#ffd59b";
let geo = false;
let charge = true;
let filter = false;
let listFilter = [];
let pair = 0;


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

document.getElementById("filter-btn").addEventListener("click", function () {
    if (filter){
        document.getElementById("list-filter").className = "row hidden";
        document.body.style.paddingTop = "150px";
        filter = false;
    } else {
        document.getElementById("list-filter").className = "row filter";
        document.body.style.paddingTop = "300px";
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


function generatefilter() {
    let div = document.getElementById("list-filter");
    for (let i = 1; i < 21; i++){
        let input = document.createElement("p");
        input.innerHTML = "<label>\n" +
            "                    <input type='checkbox' class='filled-in'/>\n" +
            "                    <span> Service " + i + " </span>\n" +
            "                </label>"
        input.className = "check col l2 m2 s4";
        input.onclick = function(){
           if (pair === 0){
               pair++;
               let index = listFilter.indexOf(i);
               if (index === -1){
                   listFilter.push(i);
               } else {
                   listFilter.splice(index, 1)
               }
           } else {
               pair = 0;
           }
           console.log(listFilter);
        };
        div.appendChild(input);
    }
}

generatefilter();










                                                        





