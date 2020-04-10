

function selectPlage(val) {
    let url = "./php/controller/router.php?search=" + val;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
         createCard(JSON.parse(request.responseText));
    });
    request.send(null);
}

function selectWithFilter(val, filter) {
    let url = "./php/controller/router.php?search=" + val + "&filter=" + filter;
    console.log(url)
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        createCard(JSON.parse(request.responseText));
        charge = true;
    });
    request.send(null);
}

function selectProximity(longitude, lattitude) {
    let url = "./php/controller/router.php?loca=true&longitude=" + longitude + "&lattitude=" + lattitude;
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

function getTransat(fleachID) {
    let url = "https://www.fleach.com/api/eplage.php?id=" + fleachID;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        displayTransatDispo(JSON.parse(request.responseText));
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



