let BID = window.location.search.split("=")[1];

if (typeof BID === "undefined"){
    document.location.href = "./";
}
getInfoBeach(BID);

let tabImg = [];
let tabBeach = [];
let img = 0;

function displayInfo(tab) {
    tabBeach = tab[0];
    console.log("Beach : ", tabBeach);
    document.getElementById("name").innerHTML = tabBeach['NAME'];
    document.getElementById("adresse-beach").innerHTML = tabBeach['ADRESS'] + " - "  + tabBeach['ZIPCODE'] + " " + tabBeach['CITY'];
    document.getElementById("warning").innerHTML = "<span class='lk' id='link-depa'>" + tabBeach['COUNTY'] + "</span> > <span class='lk' id='link-city'>" + tabBeach['CITY'] + "</span> > " + tabBeach['NAME'];
    document.getElementById("link-depa").addEventListener("click", function () {
        document.location.href = "./" + tabBeach['COUNTY'];
    });
    document.getElementById("link-city").addEventListener("click", function () {
        document.location.href = "./?search=" + tabBeach['CITY'];
    });
    if (tabBeach['FLEACHID'] !== "0"){
        getTransat(tabBeach['FLEACHID'], displayTransat);
    }
}

function displayImg(tab) {
    tabImg = tab;
    console.log("IMG : ", tabImg);
    if (tabImg.length > 0){
        let imag = document.getElementById("img-beach");
        imag.src = "./img/plage/" + tabImg[img].src;
    }
}

function displayTransat(tab) {
    console.log("API : ", tab);
    let element = document.getElementById("count-place");
    element.innerHTML = tab['nbr'] + " places disponnibles";
    element.style.color = tab['color'];
}


