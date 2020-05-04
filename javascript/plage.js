let BID = window.location.search.split("=")[1];

if (typeof BID === "undefined") {
    document.location.href = "./";
}
getInfoBeach(BID);

let tabImg = [];
let tabBeach = [];

function displayInfo(tab) {
    tabBeach = tab[0];
    console.log("Beach : ", tabBeach);
    document.getElementById("name").innerHTML = tabBeach['NAME'];
    document.getElementById("adresse-beach").innerHTML = tabBeach['ADRESS'] + " - " + tabBeach['ZIPCODE'] + " " + tabBeach['CITY'];
    document.getElementById("call-beach").href = "tel:" + tabBeach['PHONE']
    document.getElementById("warning").innerHTML = "<span class='lk' id='link-depa'>" + tabBeach['COUNTY'] + "</span> > <span class='lk' id='link-city'>" + tabBeach['CITY'] + "</span> > " + tabBeach['NAME'];
    document.getElementById("link-depa").addEventListener("click", function () {
        document.location.href = "./?search=" + tabBeach['COUNTY'].deleteAccent();
    });
    document.getElementById("link-city").addEventListener("click", function () {
        document.location.href = "./?search=" + tabBeach['CITY'].deleteAccent();
    });
    if (tabBeach['FLEACHID'] !== "0") {
        getTransat(tabBeach['FLEACHID'], displayTransat);
    }
}

function displayImg(tab) {
    tabImg = tab;
    console.log("IMG : ", tabImg);
    if (tabImg.length > 0) {
        for (let i = 0; i < tabImg.length; i++) {
            let div = document.createElement("div");
            div.className = "img-beach";
            div.style.backgroundImage = "url('img/plage/" + tabImg[i].src + "')"
            document.getElementById("wrapper-img").appendChild(div);
        }


        $('#wrapper-img').slick({
            arrows: false,
            fade: true,
            infinite: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 6000,
        })
    } else {
        let div = document.createElement("div");
        div.style.backgroundImage = "url('img/plage/plage0.jpg')";
        div.className = "img-beach";
        document.getElementById("wrapper-img").appendChild(div);
    }
}

function displayTransat(tab) {
    console.log("API : ", tab);
    let element = document.getElementById("count-place");
    element.innerHTML = tab['nbr'] + " places disponnibles";
    element.style.color = tab['color'];
}


