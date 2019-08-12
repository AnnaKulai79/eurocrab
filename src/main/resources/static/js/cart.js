$(document).ready(function () {
    if(localStorage.getItem('count-of-cart') === "0") {
        $("#block-content").empty();
        $("#block-content").append("<br><br><br><h3 id='clear-cart' align='center'>Кошик пустий</h3>");
    }else {
console.log("good news");
        $.ajax({
            url: "/cart/allproduct/" + localStorage.getItem('ipadd'),
            type: "GET",
            contentType: "application/json",
            headers: {
                'Authorize': "Bearer " + localStorage.getItem('token')
            },
            success: function (carts) {
                console.log("good news2");

                var itogSumm = 0;
                var itogCount = 0;
                for (var i = 0; i < carts.length; i++) {
                    // console.log(carts[i]);
                    var summ = (carts[i].count * carts[i].price);
                    itogCount = (itogCount + carts[i].count);
                    itogSumm = itogSumm + summ;
                    $(".block-list-cart").append("<div class='img-cart'><p align='center'>" +
                        "<img style='cursor: pointer' src='/uploads_images/" + carts[i].products.image +
                        "' width=auto height=105px onclick='viewContent(" + carts[i].id + ")' /></p></div>" +
                        "<div class='title-cart'><p><a >" + carts[i].products.title + "</a></p>" +
                        "<p class='cart-mini-features'>" + carts[i].products.minifeatures + "</p></div>" +
                        "<div class='count-cart'><ul class='input-count-style'>" +
                        "<li><p onclick='countMinus(" + carts[i].id + ")' align='center' iid='" + carts[i].id + "' class='count-minus'>-</p></li>" +
                        "<li><p onchange='countInput(" + carts[i].id + ")' align='center'><input id='input-id" + carts[i].id +
                        "' iid='" + carts[i].id + "' oldCount='" + carts[i].count + "' oldPrice='" + carts[i].price + "'" +
                        " class='count-input' maxlength='3' type='text' value='" + carts[i].count + "' /></p></li>" +
                        "<li><p onclick='countPlus(" + carts[i].id + ")' align='center' iid='" + carts[i].id + "' class='count-plus'>+</p></li></ul></div>" +
                        "<div id='tovar" + carts[i].id + "' class='price-product'><h5><span class='span-count' >" +
                        carts[i].count + "</span> x <span>" + carts[i].price + "</span></h5><p price='" + carts[i].price + "'>" +
                        summ + " грн</p></div>" +
                        "<div class='delete-cart'><a style='cursor: pointer' onclick='deleteCartProduct(" + carts[i].id + ")'><img src='/images/bsk_item_del.png' /></a></div>" +
                        "<div id='bottom-cart-line'></div>");
                }
                $(".block-itog-summ").append("<h2 class='itog-price' align='right'>Разом: <strong>" + itogSumm + "</strong> грн</h2>" +
                    "<br><p align='right' class='button-next' ><a onclick='confirmOneStep()' >Далі</a></p>");
                localStorage.setItem('price-of-cart', itogSumm);
                localStorage.setItem('count-of-cart', itogCount);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });
    }
});

function confirmOneStep() {
    var $chck1 = "";
    var $chck2 = "";
    var $chck3 = "";
    var authNote;
    if (localStorage.getItem('auth_note') == null) {
        authNote = "";
    } else {
        authNote = localStorage.getItem('auth_note');
    }
    if (localStorage.getItem('order_delivery') == "Поштою") {
        $chck1 = "checked";
    } else if (localStorage.getItem('order_delivery') == "Курьєром") {
        $chck2 = "checked";
    } else {
        localStorage.setItem('order_delivery', "Самовивіз");
        $chck3 = "checked";
    }
    $("#block-content").empty();
 if(localStorage.getItem('auth') == "yes_auth") {
    $("#block-content").append("<div id='block-step'><div id='name-step'><ul>" +
        "<li><a href='/cart' >1. Кошик замовлень</a></li><li><span>&rarr;</span></li>" +
        "<li><a class='active' >2. Контактна інформація</a></li><li><span>&rarr;</span></li>" +
        "<li><a>3. Завершення</a></li></ul></div><p>крок 2 з 3</p></div>" +
        "<h3 class='title-h3' >Способи доставки:</h3><form ><ul id='info-radio'><li>" +
        "<input type='radio' name='order_delivery' class='order_delivery' id='order_delivery1' value='Поштою' " + $chck1 + "/>" +
        "<label class='label_delivery' for='order_delivery1'>Поштою</label></li><li>" +
        "<input type='radio' name='order_delivery' class='order_delivery' id='order_delivery2' value='Курьєром' " + $chck2 + "/>" +
        "<label class='label_delivery' for='order_delivery2'>Курьєром</label></li><li>" +
        "<input type='radio' name='order_delivery' class='order_delivery' id='order_delivery3' value='Самовивіз' " + $chck3 + "/>" +
        "<label class='label_delivery' for='order_delivery3'>Самовивіз</label></li><li>" +
        "<h3 class='title-h3' >Інформація для доставки:</h3><ul id='info-order'>" +
        "<li><label for='order_fio'><span>*</span>ПІБ</label><input type='text' name='order_fio' id='order_fio'" +
        " value='" + localStorage.getItem('auth_surname') + " " + localStorage.getItem('auth_name') +
        " " + localStorage.getItem('auth_patronymic') + "' readonly /></li>" +
        "<li><label for='order_email'><span>*</span>E-mail</label><input type='text' name='order_email'" +
        " id='order_email' value='" + localStorage.getItem('auth_email') + "' readonly /></li>" +
        "<li><label for='order_phone'><span>*</span>Телефон</label><input type='text' name='order_phone' " +
        "id='order_phone' value='" + localStorage.getItem('auth_phone') + "' readonly/></li>" +
        "<li><label class='order_label_style' for='order_address'><span>*</span>Адреса<br /> доставки</label>" +
        "<input type='text' name='order_address' id='order_address' value='" + localStorage.getItem('auth_address') +
        "' readonly /></li>" +
        "<li><label class='order_label_style' for='order_note'>Примітка</label><textarea id='order_note' name='order_note'>" +
        authNote + "</textarea><span>Уточніть інформацію про замовлення.<br />  " +
        "Наприклад, зручний час для дзвінка<br />  нашого менеджера</span></li></ul>" +
        "<br><p align='right' class='button-next' ><a onclick='confirmTwoStep()' >Далі</a></p></form>");
}else{
     $("#block-content").append("<div id='block-step'><div id='name-step'><ul>" +
         "<li><a href='/cart' >1. Кошик замовлень</a></li><li><span>&rarr;</span></li>" +
         "<li><a class='active' >2. Контактна інформація</a></li><li><span>&rarr;</span></li>" +
         "<li><a>3. Завершення</a></li></ul></div><p>крок 2 з 3</p></div>" +
         "<h3 class='title-h3' >Способи доставки:</h3><form ><ul id='info-radio'><li>" +
         "<input type='radio' name='order_delivery' class='order_delivery' id='order_delivery1' value='Поштою' " + $chck1 + "/>" +
         "<label class='label_delivery' for='order_delivery1'>Поштою</label></li><li>" +
         "<input type='radio' name='order_delivery' class='order_delivery' id='order_delivery2' value='Курьєром' " + $chck2 + "/>" +
         "<label class='label_delivery' for='order_delivery2'>Курьєром</label></li><li>" +
         "<input type='radio' name='order_delivery' class='order_delivery' id='order_delivery3' value='Самовивіз' " + $chck3 + "/>" +
         "<label class='label_delivery' for='order_delivery3'>Самовивіз</label></li><li>" +
         "<h3 class='title-h3' >Інформація для доставки:</h3><ul id='info-order'>" +
         "<li><label for='order_fio'><span>*</span>ПІБ</label><input type='text' name='order_fio' id='order_fio'" +
         " value='" + fio + "'  /></li>" +
         "<li><label for='order_email'><span>*</span>E-mail</label><input type='text' name='order_email'" +
         " id='order_email' value='" + email + "'  /></li>" +
         "<li><label for='order_phone'><span>*</span>Телефон</label><input type='text' name='order_phone' " +
         "id='order_phone' value='" + phone + "' /></li>" +
         "<li><label class='order_label_style' for='order_address'><span>*</span>Адреса<br /> доставки</label>" +
         "<input type='text' name='order_address' id='order_address' value='" + address + "'  /></li>" +
         "<li><label class='order_label_style' for='order_note'>Примітка</label><textarea id='order_note' name='order_note'>" +
         authNote + "</textarea><span>Уточніть інформацію про замовлення.<br />  " +
         "Наприклад, зручний час для дзвінка<br />  нашого менеджера</span></li></ul>" +
         "<br><p align='right' class='button-next' ><a onclick='confirmTwoStep()' >Далі</a></p></form>");

 }
}

var order;
var fio="",address="",phone="",email="";
function confirmTwoStep() {
    var rb_order_delivery = 'Самовивіз';
    if ($('#order_delivery1').is(":checked")) {
        rb_order_delivery = 'Поштою';
    }else if ($('#order_delivery2').is(":checked")) {
        rb_order_delivery = 'Курьєром';
    }
    localStorage.setItem('order_delivery', rb_order_delivery);
    localStorage.setItem('auth_note', $("#order_note").val());
    fio = $("#order_fio").val();
    address = $("#order_address").val();
    phone = $("#order_phone").val();
    var note = $("#order_note").val();
    email = $("#order_email").val();
    order = {
        datetime: new Date(),
        dostavka: localStorage.getItem('order_delivery'),
        fio: $("#order_fio").val(),
        pay: 'no_accepted',
        typePay: 'готівка',
        address: $("#order_address").val(),
        phone: $("#order_phone").val(),
        note: $("#order_note").val(),
        email: $("#order_email").val()
    }

    $("#block-content").empty();
    $("#block-content").append("<div id='block-step'><div id='name-step'><ul>" +
        "<li><a href='/cart' >1. Кошик замовлень</a></li><li><span>&rarr;</span></li>" +
        "<li><a style='cursor: pointer' onclick='confirmOneStep()' >2. Контактна інформація</a>" +
        "</li><li><span>&rarr;</span></li><li><a class='active' >3. Завершення</a></li>" +
        "</ul></div><p>крок 3 из 3</p></div>" +
        "<h3>Інформація по Вашому замовленню:</h3><ul id='list-info' >" +
        "<li><strong>Спосіб доставки:</strong>" + localStorage.getItem('order_delivery') + "</li>" +
        "<li><strong>Email:</strong>" + email + "</li>" +
        "<li><strong>ПІБ:</strong>" + fio +
        "</li><li><strong>Адреса доставки:</strong>" + address +
        "</li><li><strong>Телефон:</strong>" + phone + "</li>" +
        "<li><strong>Примітка: </strong>" + note + "</li></ul>" +
        "<h2 class='itog-price' align='right'>Разом: <strong>" + localStorage.getItem('price-of-cart') +
        "</strong> грн</h2>" +
        "<p align='right' class='button-next' ><a onclick='confirmLastStep()' >" +
        "Підтвердити замовлення</a></p>");
}

function confirmLastStep() {
    $.ajax({
        url: "/orders",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(order),
        success: function (dataOrder) {
            $.ajax({
                url: "/cart/allproduct/" + localStorage.getItem('auth_user_id'),
                type: "GET",
                contentType: "application/json",
                success: function (carts) {
                    for (var i = 0; i < carts.length; i++) {
                        var buy_product = {
                            orders: dataOrder,
                            products: carts[i].products,
                            countProduct: carts[i].count
                            }
                    $.ajax({
                        url: "/buy_products",
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(buy_product),
                        success: function (dataBuyProduct) {
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.message);
                        }
                    });
                    }
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.message);
                }
            });

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
    $("#block-content").empty();
    $("#block-content").append("<br><br><br><h3 id='clear-cart' align='center'>Покупка здійснена успішно. Вам зателефонують.</h3>");
    clearBasket();
}

function clearBasket() {
    $.ajax({
        url: "/cart/clear/" + localStorage.getItem('auth_user_id'),
        type: "DELETE",
        contentType: "application/json",
        success: function (cart) {
            localStorage.setItem('status-order', 'new');
            localStorage.setItem('count-of-cart', '0');
            localStorage.setItem('price-of-cart', '0');
            $("#block-basket > a").html('Кошик пустий');
            $("#header-list-cart").remove();
            $(".block-list-cart").remove();
            $(".block-itog-summ").remove();
            $("#block-content").append("<br><br><br><h3 id='clear-cart' align='center'>Кошик пустий</h3>");
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            redirectOnError(xhr);
        }
    });
}