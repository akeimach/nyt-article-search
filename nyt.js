


$(document).ready(function(){

    // var queryURL;
    var query = "obama";
    var beginDate = "";
    var endDate = "";
    var numResults = "1";

    
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    

    if (beginDate !== "") {
        queryURL += '?' + $.param({
          'api-key': "d9ad9f278672440d852d686e5705cd2a",
          'q': query,
          'sort': "newest",
          'page': numResults,
          'begin_date': beginDate + "0101",
          'end_date': endDate + "1231"
        });
    } else {
        queryURL += '?' + $.param({
          'api-key': "d9ad9f278672440d852d686e5705cd2a",
          'q': query,
          'sort': "newest",
          'page': numResults
        });
    }


    $.ajax({
        url: queryURL,
        method: "GET",
    }).done(function(result) {
        console.log(result);

        var resultArray = result.response.docs;

        for (var i = 0; i < resultArray.length; i++) {
            console.log(resultArray[i]);

            var title = resultArray[i].headline.main;
            var author = resultArray[i].byline.original;
            var link = resultArray[i].web_url;
            var date = resultArray[i].pub_date;
            var titleDiv = $("<a>");
            var authorDiv = $("<div>");
            var resultContainer = $("<div>");
            var dateDiv = $("<div>");
            dateDiv.html(date);
            titleDiv.addClass("titles");
            titleDiv.attr("href", link);
            titleDiv.html(title);
            authorDiv.addClass("authors");
            resultContainer.addClass("result");
            titleDiv.append(title);
            authorDiv.append(author);
            resultContainer.append(titleDiv);
            resultContainer.append(authorDiv);
            resultContainer.append(dateDiv);
            $("#articles").append(resultContainer);

        }

    }).fail(function(err) {
        throw err;
    });





});