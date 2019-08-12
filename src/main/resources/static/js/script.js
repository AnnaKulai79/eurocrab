$(document).ready(function () {
    $.ajax({
        url: "/products",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            localStorage.setItem('currentPageCount', ((data.length/10)+1));
            console.log("storinok - " + (+localStorage.getItem('currentPageCount')));
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
});
