function loadingPage() {
    $("#link-nav").html("<a href='/admin/index' >Головна</a> \\ <a href='/admin/clients' >Клієнти</a>");
    $("#welcomeField").html("Ви - <h6 >" + localStorage.getItem('currentUser') + "</h6>");

}


$(document).ready(function () {
    $("#link-nav").append("<a href='/admin/index' >Головна</a>");

    // $.ajax({
    //     url: "/products",
    //     type: "GET",
    //     contentType: "application/json",
    //     success: function (data) {
    //         localStorage.setItem('currentPageCount', ((data.length/6)+1));
    //         console.log("storinok - " + localStorage.getItem('currentPageCount'));
    //     },
    //     error: function (xhr, status, error) {
    //         var err = eval("(" + xhr.responseText + ")");
    //         alert(err.message);
    //     }
    // });
    $.ajax({
        url: "/orders",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#countOrders").html(data.length);
        },
    });

    $.ajax({
        url: "/products",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#countProducts").html(data.length);
        },
    });

    $.ajax({
        url: "/reviews",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#countReviews").html(data.length);
        },
    });

    $.ajax({
        url: "/user",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#countClients").html(data.length);
        },
    });

    $.ajax({
        url: "/buy_products",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            var productId = data[0].products.id;
            var countProduct = data[0].countProduct;
            for (var i = 1; i < data.length; i++) {
                if(data[i].products.id === productId) {
                    countProduct+=data[i].countProduct;
                }else {
                    $("#listOrders").append("<TR><TD  align='CENTER' >" + data[i-1].products.title + "</TD>" +
                        "<TD  align='CENTER' >" + data[i-1].products.price + "</TD>" +
                        "<TD  align='CENTER' >" + countProduct + "</TD></TR>");
                    productId = data[i].products.id;
                    countProduct = data[i].countProduct;

                }
            }

        },
    });
});
