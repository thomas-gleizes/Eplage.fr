

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
    let url = "http://www.fleach.com/api/json.php?id=" + fleachID;
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.addEventListener("load", function () {
        displayTransatDispo(JSON.parse(request.responseText));
    });
    request.send(null);
}



