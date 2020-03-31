

document.getElementById("search-logo").addEventListener('click', function(){
    let value = document.getElementById("search-input").value;
    console.log(value);
});

document.getElementById("search-input").addEventListener('keyup', function(){
    if (this.value.length > 1) getBuisness(this.value);
});

