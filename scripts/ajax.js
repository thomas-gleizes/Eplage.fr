

async function getBuisness(value) {
    let out;
    await $.ajax({
        url : "./php/controller/router.php?search",
        type : 'GET',
        data : 'search=' + value,
        datatype : 'text',
        success : function (result, statut) {
            out = result;
            console.log(out)
        },
    });
    return out;
}