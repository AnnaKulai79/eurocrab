$(document).ready(function () {
    $.ajax({
        url: "/news",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#newsticker ul li").remove();
            var dateToString;
            for (var i = 0; i < data.length; i++) {
                dateToString = (new Date(data[i].date)).toLocaleDateString();
                $("#newsticker ul").append("<li><span>" + dateToString + "</span>" +
                    "<a>" + data[i].title + "</a>" +
                    "<p>" + data[i].text + "</p></li>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
        }
    });
});

