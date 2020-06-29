function buildQueryURL() {
    var searchCity = $("#search-term").val();
    console.log(searchCity);
    var queryURL = "https://developers.zomato.com/api/v2.1/cuisines?city_id=302";
    return queryURL;
}
function updatePage(zomatoData) {
    // Loop through and build elements for the defined number of articles

    for (var i = 0; i < zomatoData.cuisines.length; i++) {

        console.log(zomatoData.cuisines[i]);
        document.getElementById("article-section").innerHTML = JSON.stringify(zomatoData);

    }
}
// Function to empty out the articles
function clear() {
    $("#article-section").empty();
}

$("#run-search").on("click", function (event) {
    event.preventDefault();
    // Empty the region associated with the articles
    clear();
    var queryURL = buildQueryURL();
    $.ajax({
        url: queryURL,
        method: "GET",
        headers: {
            Accept: "application/json",
            "user-key": "c6a0b0d5eee196a3d4c3ecebfde6ffcd"

        }
    }).then(updatePage);
});
$("#clear-all").on("click", clear);
