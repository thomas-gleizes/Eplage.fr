let BID = window.location.search.split("=")[1];

console.log("BID : " + BID);
getInfoBeach(BID);


function displayInfo(tab) {
    tab = tab[0];
    document.getElementById("name").innerHTML = tab['NAME']

}

function displayImg(tab) {
    console.log(tab);
}



