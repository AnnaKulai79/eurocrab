function loadingPage() {
    $("#link-nav").html("<a href='/admin/index' >Головна</a> \\ <a href='/admin/orders' >Замовлення</a>");
    $("#welcomeField").html("Ви - <h6 >" + localStorage.getItem('currentUser') + "</h6>");

}

$(document).ready(function () {
    $("#link-nav").html("<a href='/admin/index' >Головна</a> \\ <a href='/admin/orders' >Замовлення</a>");

    $.ajax({
        url: "/orders",
        type: "GET",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (data) {
            console.log(data[0].confirmed);
            var finished = 0;
            var noFinished = 0;
            for (var i = 0; i < data.length; i++) {
                var status = '<span class="red">Не оброблене</span>';
                if(data[i].confirmed) {
                    finished++;
                    status = '<span class="green">Оброблене</span>';
                }else {noFinished++;}
                var d = new Date(data[i].datetime);
            $("#block-content").append("<div class='block-order'>" +
                "<p class='order-datetime' >" + d.toLocaleDateString() + "  " + d.toLocaleTimeString() + "</p>" +
                "<p class='order-number' >Замовлення № " + data[i].id + " - " + status + "</p>" +
                "<p class='order-link'><a style='cursor: pointer' class='green' onclick='viewOrder(" + data[i].id +
                ")'>Детальніше</a></p></div>");
            }
            $("#allOrdersCount").html(data.length);
            $("#acceptedOrders").html(finished);
            $("#noAcceptedOrders").html(noFinished);
        },
    });


});

function viewOrder(idOrder) {
    localStorage.setItem('id-current-order', idOrder);
    window.open('/admin/view_order', "_self");
}

function sortOrders(statusSort) {
    $(".block-order").remove();

    $.ajax({
        url: "/orders/sort/" + statusSort,
        type: "GET",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var status = '<span class="red">Не оброблене</span>';
                if(data[i].confirmed) {
                    status = '<span class="green">Оброблене</span>';
                }
                var d = new Date(data[i].datetime);
                $("#block-content").append("<div class='block-order'>" +
                    "<p class='order-datetime' >" + d.toLocaleDateString() + "</p>" +
                    "<p class='order-number' >Замовлення № " + data[i].id + " - " + status + "</p>" +
                    "<p class='order-link'><a style='cursor: pointer' class='green' onclick='viewOrder(" + data[i].id + ")'>Детальніше</a></p></div>");
            }
        },
    });

 $("#list-links-sort").hide();

    switch (statusSort) {
        case "allOrders": $("#select-links").html('Усі замовлення');
            break;
        case "confirmed": $("#select-links").html('Оброблені');
            break;
        case "noConfirmed": $("#select-links").html('Не оброблені');
            break;
    }

}