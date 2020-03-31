document.getElementById("search-input").addEventListener('keyup', function () {
    let key = event.keyCode;
    console.log("key  : " + key);
    if (key !== 8 && key !== 46) {
        document.getElementById("list").innerHTML = "";
    }

    if (this.value.length > 1) {
        selectPlage(this.value);
    }
});

function createCard(tab) {

    let list = document.getElementById("list");
    if (tab.length === 0) {
        document.getElementById("warning").style.visibility = "visible";
    } else {
        document.getElementById("warning").style.visibility = "hidden";
        for (let i = 0; i < tab.length; i++) {
            let card = document.createElement("div");
            let src = tab[i].src.split('¤')[0];
            card.innerHTML = "<div class='card'>\n" +
                "                <div class='card-image'>\n" +
                "                    <img src= \"" + src + "\"  />\n" +
                "                    <a class='btn-floating halfway-fab waves-effect waves-light red'><i class='material-icons'>chevron_right</i></a>\n" +
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
}

