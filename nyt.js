
$(document).ready(function(){


    $("#clear").on("click", function(event) {

        event.preventDefault();
        $("#articles").empty();

    });

    $("#search").on("click", function(event) {

        event.preventDefault();

        var apiKey = "d9ad9f278672440d852d686e5705cd2a";
        var query = $("#search-query").val();
        var numResults = $("#num-results").val();
        var beginDate = $("#begin-date").val();
        var endDate = $("#end-date").val();

        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        

        if (beginDate !== "") {
            queryURL += '?' + $.param({
              'api-key': apiKey,
              'q': query,
              'sort': "newest",
              'begin_date': beginDate + "0101",
              'end_date': endDate + "1231"
            });
        } else {
            queryURL += '?' + $.param({
              'api-key': apiKey,
              'q': query,
              'sort': "newest"
            });
        }


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(result) {

            var resultArray = result.response.docs;

            for (var i = 0; i < numResults; i++) {

                var title = resultArray[i].headline.main;
                var author = resultArray[i].byline.original;
                var link = resultArray[i].web_url;
                var date = resultArray[i].pub_date;

                var titleDiv = $("<a>");
                titleDiv.addClass("titles");
                titleDiv.attr("href", link);
                titleDiv.append(title);

                var authorDiv = $("<div>");
                authorDiv.addClass("authors");
                authorDiv.append(author);

                var dateDiv = $("<div>");
                dateDiv.append(date);

                var resultContainer = $("<div>");
                resultContainer.addClass("result");
                resultContainer.append(titleDiv);
                resultContainer.append(authorDiv);
                resultContainer.append(dateDiv);

                console.log(resultContainer);

                $("#articles").append(resultContainer);

            }

        }).fail(function(err) {
            throw err;
        });

    });
});

