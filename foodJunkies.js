/**
 * pulls information from the form and build the query URL
 * @returns {string} URL for NYT API based on form inputs
 */
function buildQueryURL() {
    // queryURL is the url we'll use to query the API
    var queryURL = "https://developers.zomato.com/api/v2.1/search?entity_id=94741&entity_type=zone&cuisines=55";
    // Begin building an object to contain our API call's query parameters
    // Set the API key
    return queryURL;
}
/**
 * takes API data (JSON/object) and turns it into elements on the page
 * @param {object} zomatoData - object containing zomato API data
 */
function updatePage(zomatoData) {
    // Get from the form the number of results to display
    // API doesn't have a "limit" parameter, so we have to do this ourselves
    var numArticles = $("#article-count").val();
    // Log the NYTData to console, where it will show up as an object
    console.log(zomatoData);
    console.log("------------------------------------");
    var restaurantList = new restaurantList(zomatoData);
    return restaurantList;
    // Loop through and build elements for the defined number of articles
    /*
    for (var i = 0; i < numArticles; i++) {
        // Get specific article info for current index
        var article = zomatoData.response.docs[i];
        // Increase the articleCount (track article # - starting at 1)
        var articleCount = i + 1;
        // Create the  list group to contain the articles and add the article content for each
        var $articleList = $("<ul>");
        $articleList.addClass("list-group");
        // Add the newly created element to the DOM
        $("#article-section").append($articleList);
        // If the article has a headline, log and append to $articleList
        var headline = article.headline;
        var $articleListItem = $("<li class='list-group-item articleHeadline'>");
        if (headline && headline.main) {
            console.log(headline.main);
            $articleListItem.append(
                "<span class='label label-primary'>" +
                articleCount +
                "</span>" +
                "<strong> " +
                headline.main +
                "</strong>"
            );
        }
        // If the article has a byline, log and append to $articleList
        var byline = article.byline;
        if (byline && byline.original) {
            console.log(byline.original);
            $articleListItem.append("<h5>" + byline.original + "</h5>");
        }
        // Log section, and append to document if exists
        var section = article.section_name;
        console.log(article.section_name);
        if (section) {
            $articleListItem.append("<h5>Section: " + section + "</h5>");
        }
        // Log published date, and append to document if exists
        var pubDate = article.pub_date;
        console.log(article.pub_date);
        if (pubDate) {
            $articleListItem.append("<h5>" + article.pub_date + "</h5>");
        }
        // Append and log url
        $articleListItem.append("<a href='" + article.web_url + "'>" + article.web_url + "</a>");
        console.log(article.web_url);
        // Append the article
        $articleList.append($articleListItem);
    }  END OF THE FORLOOP*/ 
}
// Function to empty out the articles
function clear() {
    $("#article-section").empty();
}
// CLICK HANDLERS
// ==========================================================
// .on("click") function associated with the Search Button
$("#run-search").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
    // Empty the region associated with the articles
    clear();
    // Build the query URL for the ajax request to the NYT API
    var queryURL = buildQueryURL();
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
        url: queryURL,
        method: "GET", 
        headers: {
            Accept: "application/json",
            "user-key": "c6a0b0d5eee196a3d4c3ecebfde6ffcd"
            
        }
    }).then(updatePage);
});
//  .on("click") function associated with the clear button
$("#clear-all").on("click", clear);