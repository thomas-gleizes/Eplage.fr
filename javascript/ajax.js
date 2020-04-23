

function selectPlage(val) {
    let url = "./php/controller/router.php?search=" + val + "&index=0";
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
         createCard(JSON.parse(request.responseText));
    });
    request.send(null);

    url = "./php/controller/router.php?searchCount=" + val;
    let requestCount = new XMLHttpRequest();
    requestCount.open("GET", url, true);
    requestCount.addEventListener("load", function () {
        displayCount(JSON.parse(requestCount.responseText));
    });
    requestCount.send(null);
}

function selectMorePlage(val, index) {
    let url = "./php/controller/router.php?search=" + val + "&index=" + index;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        createCard(JSON.parse(request.responseText));
    });
    request.send(null);
}


function selectWithFilter(val, filter) {
    let url = "./php/controller/router.php?search=" + val + "&filter=" + filter + "&index=0";
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        createCard(JSON.parse(request.responseText));
    });
    request.send(null);

    //TODO
}

function selectMoreWithFilter(val, filter, index) {
    let url = "./php/controller/router.php?search=" + val + "&filter=" + filter + "&index=" + index;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        createCard(JSON.parse(request.responseText));
    });
    request.send(null);
}


function getFilter() {
    let url = "./php/controller/router.php?filter=true";
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        generatefilter(JSON.parse(request.responseText));
    });
    request.send(null);
}

function getTransat(fleachID, callback) {
    let url = "https://www.fleach.com/api/eplage.php?id=" + fleachID;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        callback(JSON.parse(request.responseText));
    });
    request.send(null);
}

function getGeo(val) {
    let url = "./php/controller/router.php?searchGeo=" + val;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        displayGeoAutocopleted(JSON.parse(request.responseText));
    });
    request.send(null);
}

function getLocal(val) {
    let url = "./php/controller/router.php?searchLocal=" + val;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        displayLocalAutocopleted(JSON.parse(request.responseText));
    });
    request.send(null);
}

function getEtabli(val) {
    let url = "./php/controller/router.php?searchEtabli=" + val;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        displayEtabliAutocopleted(JSON.parse(request.responseText));
    });
    request.send(null);
}

function getPlageProxi (val, longitude, latitude, filter){
    let url = "./php/controller/router.php?searchProxi=" + val + "&long=" + longitude + "&lat=" + latitude + "&filter=" + filter;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        createCard(JSON.parse(request.responseText));
    });
    request.send(null);
}

function getInfoBeach(BID) {
    let url = "./php/controller/router.php?displayBeach=" + BID;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        displayInfo(JSON.parse(request.responseText));
    });
    request.send(null);

    url = "./php/controller/router.php?displayImg=" + BID;
    let requestImg = new XMLHttpRequest();
    requestImg.open("GET", url, true);
    requestImg.addEventListener("load", function () {
        displayImg(JSON.parse(requestImg.responseText));
    });
    requestImg.send(null);
}

function selectRandBeach() {
    let url = "./php/controller/router.php?getRand=true"
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        createCard(JSON.parse(request.responseText));
    });
    request.send(null);
}


