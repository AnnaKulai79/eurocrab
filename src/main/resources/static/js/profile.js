function loadingP() {
    $('body,html').animate({scrollTop:0},800);
    $('#blocktrackbar').trackbar({
        onMove: function () {
            document.getElementById("start-price").value = this.leftValue;
            document.getElementById("end-price").value = this.rightValue;
        },
        width: 160,
        leftLimit: 10,
        leftValue: localStorage.getItem('currentStartPrice'),
        rightLimit: 1000,
        rightValue: localStorage.getItem('currentEndPrice'),
        roundUp: 10
    });

    if (localStorage.getItem('auth') == "yes_auth" && localStorage.getItem('count-of-cart') > 0) {
        $.ajax({
            url: "/cart/allproduct/" + localStorage.getItem('auth_user_id'),
            type: "GET",
            contentType: "application/json",
            success: function (carts) {
                var itogSumm = 0;
                var itogCount = 0;
                for (var i = 0; i < carts.length; i++) {
                    var summ = (carts[i].count * carts[i].price);
                    itogCount = (itogCount + carts[i].count);
                    itogSumm = itogSumm + summ;
                }
                localStorage.setItem('price-of-cart', itogSumm);
                localStorage.setItem('count-of-cart', itogCount);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });

        var $count = +localStorage.getItem('count-of-cart');
        if ($count > 0) {
            loadingcart();
        };
    }
    if(localStorage.getItem('auth') == "yes_auth") {
        $("#reg-auth-title-div > p").html("");
        $("#auth-user-info-div > p").html("<img src='/images/user.png' />Вітаємо Вас, " + localStorage.getItem('auth_name') + "!");
        console.log("yes");
    }else{
        $("#auth-user-info-div > p").html("");
        $("#reg-auth-title-div > p").html("<a onclick='authentication()' class='top-auth' id=''>Увійти</a><a href='/registration'>Реєстрація</a>");
        console.log("no");
    }
    if(localStorage.getItem('current-sorting') == '') {
        $.ajax({
            url: "/products/byBrands/" + localStorage.getItem('currentStartPrice') + '/' + localStorage.getItem('currentEndPrice'),
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(localStorage.getItem('stringBrand')),
            success: function (products) {
                pageCount = Math.ceil(products.length/10);
                localStorage.setItem('currentPageCount', pageCount);
                console.log('working');
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });
    }

    $.ajax({
        url: "/user/" + localStorage.getItem('auth_user_id'),
        type: "GET",
        contentType: "application/json",
        success: function (user) {
            dateUser = user.datetime;
            $("#info_pass").attr("value", "");
            $("#info_surname").attr("value", user.surname);
            $("#info_name").attr("value",user.name);
            $("#info_patronymic").attr("value",user.patronymic);
            $("#info_email").attr("value",user.email);
            $("#info_phone").attr("value",user.phone);
            $("#info_address").attr("value",user.address);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });



    $.ajax({
        url: "/category",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            $("#ul-category").empty();
            for (var i = 0; i < data.length; i++) {
                $("#ul-category").append("<li><a onclick='showBrandByCategory(" + data[i].id + ")' id='index" +
                    data[i].id +"' class='active'><img src='/images/" + data[i].icon + "' class='category-images' " +
                    "id='" + data[i].type + "-images'/>" + data[i].name + "</a>" +
                    "<ul class='category-section' id='li-brand" + data[i].id + "'>" +
                    "</ul></li>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
}

var dateUser;

$(document).ready(function () {
    $('body,html').animate({scrollTop:0},800);
    $.ajax({
        url: "/user/" + localStorage.getItem('auth_user_id'),
        type: "GET",
        contentType: "application/json",
        success: function (user) {
            dateUser = user.datetime;
            $("#info_pass").attr("value", "");
            $("#info_surname").attr("value", user.surname);
            $("#info_name").attr("value",user.name);
            $("#info_patronymic").attr("value",user.patronymic);
            $("#info_email").attr("value",user.email);
            $("#info_phone").attr("value",user.phone);
            $("#info_address").attr("value",user.address);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });


});

var chekingCount=0;

function checkPass() {
    var userToCheck = {
        login: localStorage.getItem('auth_login'),
        pass: $("#info_pass").val()
    }
    $.ajax({
        url: "/user/check",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(userToCheck),
        success: function (user) {
            if (user == null) {
                $("#message-error").html('Невірний поточний пароль!');
            }else {
                $("#message-error").empty();
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            redirectOnError(xhr);
        }
    });
}

function checkInput(valueInput) {
    chekingCount++;
    switch (valueInput) {
        case 'info_new_pass':
            if(($("#info_new_pass").val().length <=7) || ($("#info_new_pass").val().length > 15)) {
                $("#message-error").html('Вкажіть новий пароль від 7 до 15 символів!');
            }else {$("#message-error").empty();}
             break;
        case 'info_surname':
            if(($("#info_surname").val().length <=2) || ($("#info_surname").val().length > 50)) {
                $("#message-error").html('Вкажіть прізвище від 3 до 50 символів!');
            }else {$("#message-error").empty();}
            break;
        case 'info_name':
            if(($("#info_name").val().length <=2) || ($("#info_name").val().length > 50)) {
                $("#message-error").html("Вкажіть ім'я від 3 до 15 символів!");
            }else {$("#message-error").empty();}
            break;
        case 'info_patronymic':
            if(($("#info_patronymic").val().length <=3) || ($("#info_patronymic").val().length > 50)) {
                $("#message-error").html('Вкажіть по-батькові від 3 до 50 символів!');
            }else {$("#message-error").empty();}
            break;
        case 'info_email':
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var address = $("#info_email").val();
            if(reg.test(address) == false) {
                $("#message-error").html("Вкажіть коректний email!");
            }else {$("#message-error").empty();}
            break;
        case 'info_phone':
            if(($("#info_phone").val().length <=10) || ($("#info_phone").val().length > 14)) {
                $("#message-error").html('Вкажіть телефон від 10 до 13 символів!');
            }else {$("#message-error").empty();}
            break;
        case 'info_address':
            if(($("#info_address").val().length <= 0)) {
                $("#message-error").html('Вкажіть адресу доставки!');
            }else {$("#message-error").empty();}
            break;

    }
}

function saveUpdates() {
    if((chekingCount === 0)) {
        //     $("#message-error").html('Невірний поточний пароль!');
        // }else if(($("#info_new_pass").val() === "")){
        //     $("#info_new_pass").val($("#info_pass").val());
        // }else if(($("#info_new_pass").val().length <7) || ($("#info_new_pass").val().length >50)) {
        //     $("#message-error").html('Вкажіть новий пароль от 7 до 15 символів!');
        // }else if(($("#info_pass").val() !== $("#info_new_pass").val()) ||
        // (localStorage.getItem('auth_surname') !== $("#info_surname").val()) ||
        // (localStorage.getItem('auth_name') !== $("#info_name").val()) ||
        // (localStorage.getItem('auth_patronymic') !== $("#info_patronymic").val()) ||
        // (localStorage.getItem('auth_email') !== $("#info_email").val()) ||
        // (localStorage.getItem('auth_phone') !== $("#info_phone").val()) ||
        // (localStorage.getItem('auth_address') !== $("#info_address").val())) {
        $("#block-content").empty();
        $("#block-content").append('<h4>Дані не було змінено!</h4>');
    }else if(($("#info_pass").val() === "")) {
        $("#message-error").html('Невірний поточний пароль!');
    }else {
        var passN = $("#info_new_pass").val();
        if(passN === "") {
            passN = $("#info_pass").val();
        }
    var userToSave = {
        id : localStorage.getItem('auth_user_id'),
        login : localStorage.getItem('auth_login'),
        pass : passN,
        surname : $("#info_surname").val(),
        name : $("#info_name").val(),
        patronymic : $("#info_patronymic").val(),
        email : $("#info_email").val(),
        phone : $("#info_phone").val(),
        address : $("#info_address").val(),
        ip : 777,
        datetime : dateUser
    };

    $.ajax({
        url: "/user",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(userToSave),
        success: function (data) {
            $("#block-content").empty();
            $("#block-content").append('<h4>Дані успішно збережені!</h4>');
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
}
};
