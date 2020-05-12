
/** search */
function searchAdvance(val, long, lat, filter, index) {
    let url = "./php/controller/router.php?searchAdvance=";
    if (typeof  val !== "undefined") url += val;
    if (typeof long !== "undefined") url += `&long=${long}`;
    if (typeof lat !== "undefined") url += `&lat=${lat}`;
    if (typeof filter !== "undefined") url += `&filter=${filter}`;
    if (typeof index !== "undefined") url += `&index=${index}`;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        createCard(JSON.parse(request.responseText));
    });
    request.send(null);
}

function selectRandBeach() {
    let url = "./php/controller/router.php?getRand=true";
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        createCard(JSON.parse(request.responseText));
    });
    request.send(null);
}

/** filter */
function getFilter() {
    let url = "./php/controller/router.php?getfilter=true";
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        generatefilter(JSON.parse(request.responseText));
    });
    request.send(null);
}


/** auto-complete */
function getAutoDepa(val) {
    let url = "./php/controller/router.php?searchAutoDepa=" + val;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        displayGeoAutocopleted(JSON.parse(request.responseText));
    });
    request.send(null);
}

function getAutoCity(val) {
    let url = "./php/controller/router.php?searchAutoCity=" + val;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        displayLocalAutocopleted(JSON.parse(request.responseText));
    });
    request.send(null);
}

function getAutoBeach(val) {
    let url = "./php/controller/router.php?searchAutoBeach=" + val;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        displayEtabliAutocopleted(JSON.parse(request.responseText));
    });
    request.send(null);
}


/** info Beach */
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


/** API */
function getTransat(fleachID, callback) {
    let url = "https://www.fleach.com/api/eplage.php?id=" + fleachID;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        callback(JSON.parse(request.responseText));
    });
    request.send(null);
}