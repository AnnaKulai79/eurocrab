function loadingPage() {
    $("#link-nav").html("<a href='/admin/index' >Головна</a> \\ <a href='/admin/view_order' >Перегляд замовлень</a>");
    $("#welcomeField").html("Ви - <h6 >" + localStorage.getItem('currentUser') + "</h6>");

}

var totalPrice = 0;


$(document).ready(function () {
    $("#link-nav").html("<a href='/admin/index' >Головна</a> \\ <a href='/admin/orders' >Перегляд замовлень</a>");
    $.ajax({
        url: "/buy_products/order/" + localStorage.getItem('id-current-order'),
        type: "GET",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (allBuyProducts) {
            var currentDate = new Date();
            var dataDate = new Date(allBuyProducts[0].orders.datetime);
            currentDate.setMonth(currentDate.getMonth()-1);
            var status = '<span class="red">Не оброблене</span>';
            if(allBuyProducts[0].orders.confirmed) {
                status = '<span class="green">Оброблене</span>';
            }else {
                $(".view-order-link").append("<a class='green' style='cursor: pointer' onclick='acceptOrder()' " +
                    ">Подтвердити замовлення</a>");
            }
            if(currentDate>=dataDate) {
                $(".view-order-link").append(" | <a class='delete' style='cursor: pointer' onclick='deleteOrder()' >Видалити замовлення</a>");
            }
            $(".order-datetime").html(dataDate.toLocaleString());
            $(".order-number").html("Замовлення № " + allBuyProducts[0].orders.id + " - " + status);
            for (var i = 0; i < allBuyProducts.length; i++) {
                $("#tableProduct").append("<TR><TD  align='CENTER' >" + (i + 1) + "</TD><TD  align='CENTER' >" +
                    allBuyProducts[i].products.title + "</TD><TD  align='CENTER' >" + allBuyProducts[i].products.price +
                    " грн</TD><TD  align='CENTER' >" + allBuyProducts[i].countProduct + "</TD></TR>");
                totalPrice += allBuyProducts[i].products.price*allBuyProducts[i].countProduct;
            }
            var statPay = statPay = '<span class="red">Не оплачено</span>';
            if (allBuyProducts[0].orders.pay === "accepted") {
                statPay = '<span class="green">Оплачено</span>';
            }
            $("#info-order").html("<li>Загальна ціна - <span>" + totalPrice + "</span> грн</li>" +
                "<li>Спосіб доставки - <span>" + allBuyProducts[0].orders.dostavka + "</span></li>" +
                "<li>Статус оплати - " + statPay + "</li><li>Тип оплати - <span>" + allBuyProducts[0].orders.typePay +
                "</span></li><li>Дата оплати - <span>" + dataDate.toLocaleString() + "</span></li>");
            $("#tableDostavka").append("<TR><TD  align='CENTER' >" + allBuyProducts[0].orders.fio +
                "</TD><TD  align='CENTER' >" + allBuyProducts[0].orders.address + "</TD><TD  align='CENTER' >" +
                allBuyProducts[0].orders.phone + "</br>" + allBuyProducts[0].orders.email + "</TD>" +
                "<TD  align='CENTER' >" + allBuyProducts[0].orders.note + "</TD></TR></TABLE>");
        }
    });

});

function deleteOrder() {
    $.ajax({
        url: "/orders/" + localStorage.getItem('id-current-order'),
        type: "DELETE",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (data) {
            localStorage.setItem('id-current-order', '');
            $("#block-content").empty();
            $("#block-content").append("<h3>Замовлення було успішно видалено</h3>");
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
}

function acceptOrder() {
    $.ajax({
        url: "/orders/confirmed/" + localStorage.getItem('id-current-order'),
        type: "PUT",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (data) {
            $(".view-order-link").empty();
            $(".order-number").html("Замовлення № " + localStorage.getItem('id-current-order') + " - " +
                "<span class='green'>Оброблене</span>");
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
}