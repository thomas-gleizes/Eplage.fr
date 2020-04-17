let BID = window.location.search.split("=")[1];

console.log("BID : " + BID);
getInfoBeach(BID);



function displayInfo(tab) {
    tab = tab[0];
    console.log("Beach : ", tab)
    document.getElementById("name").innerHTML = tab['NAME']
    if (tab['FLEACHID'] !== 0){
        getTransat(tab['FLEACHID'], displayTransat);
    } else {
        document.getElementById("count-place").innerHTML = "Aucun info disponnible"
    }

}

function displayImg(tab) {
    console.log("IMG : ", tab);
}

function displayTransat(tab) {
    console.log("API : ", tab);
}


