$(document).ready(function () {
    $("#welcomeField").text(localStorage.getItem('currentUser'));
    console.log(localStorage.getItem('currentUser'));
    $.ajax({
        url: "/",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            //     for (var i = 0; i < data.length; i++) {
            //         $("#").append("<tr><td>" + data[i].id +
            //             "</td><td>" + data[i].name + "</td><td>"
            //             + data[i].lengthInSeconds + "</td></tr>");
            //     }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
});
