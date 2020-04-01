

function selectPlage(val) {
    let url = "./php/controller/router.php?search=" + val;
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
        displayFilter(JSON.parse(request.responseText));
    });
    request.send(null);
}