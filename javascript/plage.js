let BID = window.location.search.split("=")[1];

if (typeof BID === "undefined"){
    document.location.href = "./";
}

console.log("BID : " + BID);
getInfoBeach(BID);
let tabImg = [];
let tabBeach = [];
let img = 0;


function displayInfo(tab) {
    tabBeach = tab[0];
    console.log("Beach : ", tabBeach);
    document.getElementById("name").innerHTML = tabBeach['NAME'];
    document.getElementById("adresse-beach").innerHTML = tabBeach['ADRESS'] + " - "  + tabBeach['ZIPCODE'] + " " + tabBeach['CITY'];
    document.getElementById("warning").innerHTML = "<span id='link-depa'>" + tabBeach['COUNTY'] + "</span> > <span id='link-city'>" + tabBeach['CITY'] + "</span> >" + tabBeach['NAME'];
    document.getElementById("link-depa").addEventListener("click", function () {
        console.log(tabBeach['id_departement']);
    });
    document.getElementById("link-city").addEventListener("click", function () {
        document.location.href = "./?search=" + tabBeach['ZIPCODE'];
    });
    if (tabBeach['FLEACHID'] !== "0"){
        getTransat(tabBeach['FLEACHID'], displayTransat);
    }
}

function displayImg(tab) {
    console.log("IMG : ", tab);
    tabImg = tab;
    let div = document.getElementById("img-beach");
    if (tab.length === 0){
        let img = document.createElement("img");
        img.className = "img-beach"
        img.src = "./img/plage/plage0.jpg";
        div.appendChild(img);
    } else {
        for (let i = 0; i < tab.length; i++){
            let img = document.createElement("img");
            if (i === 0) img.style.opacity = "1";
            else img.style.opacity = "0";
            img.src = "./img/plage/" + tab[i].src;
            img.alt = "image de la plage " + i;
            img.id = 'img-' + i;
            img.className = "img-beach";
            div.appendChild(img);
        }
        window.setInterval(changeImg, 8000)
    }
}
function displayRoad(tab) {
    console.log("road", tab);
}


function changeImg() {
    let img1 = document.getElementById("img-" + img);
    img1.style.transition = "opacity 1s";
    img1.style.opacity = "0";
    window.setTimeout(function () {
        img1.style.display = "none";
    }, 1000);
    if (img === (tabImg.length) - 1) img = 0;
    else img++;
    let img2 = document.getElementById("img-" + img)
    img2.style.display = "block";
    img2.style.transition = "opacity 1s";
    img2.style.opacity = "1";
}

function displayTransat(tab) {
    console.log("API : ", tab);
    let element = document.getElementById("count-place");
    element.innerHTML = tab['nbr'] + " places disponnibles";
    element.style.color = tab['color'];
}


