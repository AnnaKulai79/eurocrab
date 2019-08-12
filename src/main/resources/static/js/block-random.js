$(document).ready(function () {
    var count_reviews=0;
    $.ajax({
        url: "/products/random",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $.ajax({
                    url: "/reviews/" + data[i].id,
                    type: "GET",
                    contentType: "application/json",
                    success: function (allReviews) {
                        count_reviews = allReviews.length;
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert(err.message);
                    }
                });
                $("#random-tovar").append("<li><img src='/uploads_images/" +
                    data[i].image + "' width=90px height=auto />" +
                    "<a class='random-title' tid=" + data[i].id + ">" + data[i].title + "</a>" +
                    "<p class='random-reviews'>Відгуки " + count_reviews + "</p>" +
                    "<p class='random-price'>" + data[i].price +"</p>" +
                    "<a class='random-add-cart' tid=" + data[i].id + "></a></li>" +
                    "" +
                    "");
            }
            //  href='view_content.php?id='.$res_query["products_id"].'
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");

        }
    });
});

