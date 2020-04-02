

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

