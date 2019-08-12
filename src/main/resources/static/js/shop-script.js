function loading() {
    $('#blocktrackbar').trackbar({
        onMove : function() {
            document.getElementById("start-price").value = this.leftValue;
            document.getElementById("end-price").value = this.rightValue;
        },
        width : 160,
        leftLimit : 10,
        leftValue : localStorage.getItem('currentStartPrice'),
        rightLimit : 1000,
        rightValue : localStorage.getItem('currentEndPrice'),
        roundUp : 10
    });

    localStorage.setItem('current-show-sort', "");
    localStorage.setItem('current-sorting', '');
    localStorage.setItem('current-id-sorting', '');
    localStorage.setItem('id-active-category', '');
    localStorage.setItem('id-active-brand', '');
    localStorage.setItem('name-active-category', '');
    localStorage.setItem('name-active-brand', '');
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
        if (localStorage.getItem('auth') == "yes_auth") {
        $("#reg-auth-title-div > p").html("");
        $("#auth-user-info-div > p").html("<img src='/images/user.png' />Вітаємо Вас, " + localStorage.getItem('auth_name') + "!");
    }else{
        $("#auth-user-info-div > p").html("");
        $("#reg-auth-title-div > p").html("<a onclick='authentication()' class='top-auth' id=''>Увійти</a><a href='/registration'>Реєстрація</a>");
    }
    if(localStorage.getItem('current-sorting') == '') {
        $.ajax({
            url: "/products/pageable?page=0&size=10",
            type: "GET",
            contentType: "application/json",
            success: function (allProducts) {
                pageCount = allProducts.totalPages;
                localStorage.setItem('currentPageCount', pageCount);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });
    }


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

};

function showBrandByCategory(idCategory) {
    localStorage.setItem('name-active-brand', '');
    localStorage.setItem('id-active-brand', '');

    if(localStorage.getItem('id-active-category') != idCategory || localStorage.getItem('id-active-category') == "") {
    $("#li-brand" + localStorage.getItem('id-active-category')).empty();
    $(".checkbox-brand").empty();
    localStorage.setItem('id-active-category', idCategory);
    $.ajax({
        url: "/brands/" + idCategory,
        type: "GET",
        contentType: "application/json",
        success: function (dataBrand) {
            $("#li-brand" + idCategory).append("<li><a style='cursor: pointer' onclick='viewByCategory(" +
                idCategory + ")'>" + "<strong>Всі види</strong></a></li>");
            localStorage.setItem('name-active-category', dataBrand[0].categories.name);
            for (var j = 0; j < dataBrand.length; j++) {
                $("#li-brand" + idCategory).append("<li><a style='cursor: pointer' onclick='viewByBrand(" +
                    dataBrand[j].id + ")'>" + dataBrand[j].brand + "</a></li>");
                $(".checkbox-brand").append("<li><input type='checkbox' name='brand[]' value='" + dataBrand[j].id + "' " +
                    "id='checkbrend" + dataBrand[j].id + "' /><label for='checkbrend" + dataBrand[j].id + "'>" +
                    dataBrand[j].brand + "</label></li>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

}else {
    $(".checkbox-brand").empty();
    $("#li-brand" + localStorage.getItem('id-active-category')).empty();
    localStorage.setItem('id-active-category', "");

}

};

function viewByCategory(id) {
    localStorage.setItem('name-active-brand', '');
    localStorage.setItem('id-active-brand', '');
    localStorage.setItem('id-active-category', id);
    window.open('/view_cat', "_self");

};

function viewByBrand(id) {
    $.ajax({
        url: "/brand/" + id,
        type: "GET",
        contentType: "application/json",
        success: function (brand) {
            localStorage.setItem('name-active-brand', brand.brand);
                    },
        error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
                }
                });
    localStorage.setItem("id-active-brand", id);
    window.open('/view_cat', "_self");
};

$(document).ready(function () {
    $("#newsticker").jCarouselLite({
        vertical: true,
        hoverPause: true,
        btnPrev: "#news-prev-top",
        btnNext: "#news-next-top",
        visible: 4,
        auto: 10000,
        speed: 0
    });

    $("#newsticker").jCarouselLite({
        vertical: true,
        hoverPause: true,
        btnPrev: "#news-prev-bottom",
        btnNext: "#news-next-bottom",
        visible: 4,
        auto: 10000,
        speed: 0
    });

    $.getJSON('https://api.ipify.org?format=json', function(data){
        localStorage.setItem("ipadd", data.ip);
    });

    var count_reviews = 0;
    $.ajax({
        url: "/products/random",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].visible) {
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
                    $("#random-tovar").append("<li><div class='random-image'><img id='card-image" + data[i].id + "' style='cursor: pointer' " +
                        "src='/uploads_images/" +
                        data[i].image + "' width=80px height=auto onclick='viewContent(" + data[i].id + ")' /></div>" +
                        "<a class='random-title' style='cursor: pointer' tid=" + data[i].id + " onclick='viewContent(" + data[i].id + ")'>" + data[i].title + "</a>" +
                        "<p class='random-reviews'>Відгуки " + count_reviews + "</p>" +
                        "<p class='random-price'>" + data[i].price + "</p>" +
                        "<a class='random-add-cart' tid=" + data[i].id + " onclick='addToCart("
                        + data[i].id + ")'></a></li>");
                    var imageH, imageW, ratioH, ratioW, ratio, idImage;
                    var maxW = 80;
                    var maxH = 90;
                    var h,w;
                    idImage = data[i].id;
                    $("#card-image" + idImage).load(function() {
                        h = this.naturalHeight;
                        w = this.naturalWidth;
                        ratioH = maxH/h;
                        ratioW = maxW/w;
                        ratio = ratioH;
                        if(ratioW<ratioH) {ratio = ratioW;}
                        imageH = Math.round(ratio*h);
                        imageW = Math.round(ratio*w);
                        $(this).removeAttr("width")
                            .removeAttr("height")
                            .css({ width: imageW + "px", height: imageH + "px" });
                    });
                }
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");

        }
    });


    $("#style-grid").click(function () {

        $("#block-tovar-grid").show();
        $("#block-tovar-list").hide();

        $("#style-grid").attr("src", "/images/icon-grid-active.png");
        $("#style-list").attr("src", "/images/icon-list.png");

        $.cookie('select_style', 'grid');
         //location.reload();
    });

    $("#style-list").click(function () {

        $("#block-tovar-grid").hide();
        $("#block-tovar-list").show();

        $("#style-list").attr("src", "/images/icon-list-active.png");
        $("#style-grid").attr("src", "/images/icon-grid.png");

        $.cookie('select_style', 'list');
         //location.reload();
    });
    if ($.cookie('select_style') == 'grid') {
        $("#block-tovar-grid").show();
        $("#block-tovar-list").hide();

        $("#style-grid").attr("src", "/images/icon-grid-active.png");
        $("#style-list").attr("src", "/images/icon-list.png");
    }
    else {
        $("#block-tovar-grid").hide();
        $("#block-tovar-list").show();

        $("#style-list").attr("src", "/images/icon-list-active.png");
        $("#style-grid").attr("src", "/images/icon-grid.png");
    }


    $("#select-sort").click(function () {
        $("#sorting-list").slideToggle(200);
        $("#sortList").show();
    });

    $('#block-category > ul > li > a').click(function(){
        if ($(this).attr('class') != 'active'){

            $('#block-category > ul > li > ul').slideUp(400);
            $(this).next().slideToggle(400);

            $('#block-category > ul > li > a').removeClass('active');
            $(this).addClass('active');
            $.cookie('select_cat', $(this).attr('id'));

        }else
        {

            $('#block-category > ul > li > a').removeClass('active');
            $('#block-category > ul > li > ul').slideUp(400);
            $.cookie('select_cat', '');
        }
    });

    if ($.cookie('select_cat') != '') {
        $('#block-category > ul > li > #' + $.cookie('select_cat')).addClass('active').next().show();
    }

    $('#genpass').click(function () {
        var $number = 7; //Довжина пароля
        var $arr = ['a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r',
            's', 't', 'u', 'v', 'w', 'x',
            'y', 'z', '1', '2', '3', '4',
            '5', '6', '7', '8', '9', '0'];
        // Генеруємо пароль
        var $pass = "";
        for (var $i = 0; $i < $number; $i++) {
            // Обчислюємо випадковий індекс масиву
            $index = Math.floor(Math.random() * $arr.length);
            $pass = $pass + $arr[$index];
        }
        $('#reg_pass').val($pass);

    });
    $('#reloadcaptcha').click(function () {
        $('#block-captcha > img').attr("src", "/js/reg_captcha.php?r=" + Math.random());
    });


    //Шаблон перевірки email на правильність
    function isValidEmailAddress(emailAddress) {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(emailAddress);
    }

    // Контактні дані
    $('#confirm-button-next').click(function (e) {

        var order_fio = $("#order_fio").val();
        var order_email = $("#order_email").val();
        var order_phone = $("#order_phone").val();
        var order_address = $("#order_address").val();

        if (!$(".order_delivery").is(":checked")) {
            $(".label_delivery").css("color", "#E07B7B");
            send_order_delivery = '0';

        } else {
            $(".label_delivery").css("color", "black");
            send_order_delivery = '1';


            // Перевірка ПІБ
            if (order_fio == "" || order_fio.length > 50) {
                $("#order_fio").css("borderColor", "#FDB6B6");
                send_order_fio = '0';

            } else {
                $("#order_fio").css("borderColor", "#DBDBDB");
                send_order_fio = '1';
            }

            //перевірка email
            if (isValidEmailAddress(order_email) == false) {
                $("#order_email").css("borderColor", "#FDB6B6");
                send_order_email = '0';
            } else {
                $("#order_email").css("borderColor", "#DBDBDB");
                send_order_email = '1';
            }

            // Перевірка телефону

            if (order_phone == "" || order_phone.length > 50) {
                $("#order_phone").css("borderColor", "#FDB6B6");
                send_order_phone = '0';
            } else {
                $("#order_phone").css("borderColor", "#DBDBDB");
                send_order_phone = '1';
            }

            // Перевірка Адреси

            if (order_address == "" || order_address.length > 150) {
                $("#order_address").css("borderColor", "#FDB6B6");
                send_order_address = '0';
            } else {
                $("#order_address").css("borderColor", "#DBDBDB");
                send_order_address = '1';
            }

        }
        // Глобальна перевірка
        if (send_order_delivery == "1" && send_order_fio == "1" && send_order_email == "1" && send_order_phone == "1" && send_order_address == "1") {
            // Відправляємо форму
            return true;
        }

        e.preventDefault();

    });

});

function authentication() {
    var statusTopAuth = $('.top-auth').attr("id");
    if(localStorage.getItem('rememberme')=='yes') {
        $("#auth_login").attr("value",localStorage.getItem('authLogin'));
        $("#auth_pass").attr("value",localStorage.getItem('authPass'));
    }else {
        $("#auth_login").attr("value","");
        $("#auth_pass").attr("value","");
    }
    if (statusTopAuth == "") {
        $(".top-auth").attr("id", "active-button");
        $("#block-top-auth").fadeIn(200);
    } else {
        $(".top-auth").attr("id", "");
        $("#block-top-auth").fadeOut(200);
    }
};

function blockUserShow() {
    var statusBlockUser = $('.show-block-user').attr("id");
    if (statusBlockUser == "") {
        $(".show-block-user").attr("id", "active-button");
        $("#block-user").fadeIn(200);
    } else {
        $(".show-block-user").attr("id", "");
        $("#block-user").fadeOut(200);
    };
};


function passShowHide() {
    var statuspass = $('#button-pass-show-hide').attr("class");
    if (statuspass == "pass-show") {
        $('#button-pass-show-hide').attr("class", "pass-hide");

        var $input = $("#auth_pass");
        var change = "text";
        var rep = $("<input placeholder='Пароль' type='" + change + "' />")
            .attr("id", $input.attr("id"))
            .attr("name", $input.attr("name"))
            .attr('class', $input.attr('class'))
            .val($input.val())
            .insertBefore($input);
        $input.remove();
        $input = rep;

    } else {
        $('#button-pass-show-hide').attr("class", "pass-show");

        var $input = $("#auth_pass");
        var change = "password";
        var rep = $("<input placeholder='Пароль' type='" + change + "' />")
            .attr("id", $input.attr("id"))
            .attr("name", $input.attr("name"))
            .attr('class', $input.attr('class'))
            .val($input.val())
            .insertBefore($input);
        $input.remove();
        $input = rep;

    }


};

function remindPass() {

    $('#input-email-pass').fadeOut(200, function () {
        $('#block-remind').fadeIn(300);
    });
};

function prevAuth() {

    $('#block-remind').fadeOut(200, function () {
        $('#input-email-pass').fadeIn(300);
    });
};

function buttonRemind() {

    var recall_email = $("#remind-email").val();
    console.log("this service is temporarily unavailable");
    if (recall_email == "" || recall_email.length > 30) {
        $("#remind-email").css("borderColor", "#FDB6B6");

    } else {
        $("#remind-email").css("borderColor", "#DBDBDB");

        $("#button-remind").hide();
        $(".auth-loading").show();

        // $.ajax({
        //     type: "POST",
        //     url: "/include/remind-pass.php",
        //     data: "email=" + recall_email,
        //     dataType: "html",
        //     cache: false,
        //     success: function (data) {
        //
        //         if (data == 'yes') {
        //             $(".auth-loading").hide();
        //             $("#button-remind").show();
        //             $('#message-remind').attr("class", "message-remind-success").html("На Ваш e-mail відправлено пароль.").slideDown(400);
        //
        //             setTimeout("$('#message-remind').html('').hide(),$('#block-remind').hide(),$('#input-email-pass').show()", 3000);
        //
        //         } else {
        //             $(".auth-loading").hide();
        //             $("#button-remind").show();
        //             $('#message-remind').attr("class", "message-remind-error").html(data).slideDown(400);
        //
        //         }
        //     }
        // });
    }
};


function buttonAuth() {
    if ($("#rememberme").prop('checked')) {
        localStorage.setItem('rememberMe', 'yes');
        localStorage.setItem('authLogin', $("#auth_login").val());
        localStorage.setItem('authPass', $("#auth_pass").val());
    } else {
        localStorage.setItem('rememberMe', 'no');
        localStorage.setItem('authLogin', "");
        localStorage.setItem('authPass', "");
    }

    var auth_login = $("#auth_login").val();
    var auth_pass = $("#auth_pass").val();


    if (auth_login == "" || auth_login.length > 30) {
        $("#auth_login").css("borderColor", "#FDB6B6");
        send_login = 'no';
    } else {
        $("#auth_login").css("borderColor", "#DBDBDB");
        send_login = 'yes';
    }

    if (auth_pass == "" || auth_pass.length > 15) {
        $("#auth_pass").css("borderColor", "#FDB6B6");
        send_pass = 'no';
    } else {
        $("#auth_pass").css("borderColor", "#DBDBDB");
        send_pass = 'yes';
    }




    if (send_login == 'yes' && send_pass == 'yes') {
        $("#button-auth").hide();
        $(".auth-loading").show();
        var userToCheck = {
            login: $("#auth_login").val(),
            pass: $("#auth_pass").val()
        }
        $.ajax({
            url: "/user/check",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(userToCheck),
            success: function (user) {
                if(user.login!="" && user.login!=="undefined" && user.login!==undefined) {
                    $("#block-basket > a").html('Кошик пустий');
                    localStorage.setItem('status-order', 'new');
                    localStorage.setItem('auth', 'yes_auth');
                    localStorage.setItem('auth_user_id', user.id);
                    localStorage.setItem('auth_pass', user.pass);
                    localStorage.setItem('auth_login', user.login);
                    localStorage.setItem('auth_surname', user.surname);
                    localStorage.setItem('auth_name', user.name);
                    localStorage.setItem('auth_patronymic', user.patronymic);
                    localStorage.setItem('auth_address', user.address);
                    localStorage.setItem('auth_phone', user.phone);
                    localStorage.setItem('auth_email', user.email);
                    localStorage.setItem('count-of-cart', '0');
                    $("#block-top-auth").hide();
                    $("#reg-auth-title").hide();
                    $("#auth-user-info").html("<img src='/images/user.png' />Вітаємо Вас, " + localStorage.getItem('auth_name') + "!");
                }else {
                    $("#message-auth").slideDown(400);
                    $(".auth-loading").hide();
                    $("#button-auth").show();
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                redirectOnError(xhr);
            }
        });

    }
};

var countOfCart;
var priceOfCart;

function loadingcart() {
    var $count = + localStorage.getItem('count-of-cart');
    var $str;
    if (($count%10) == 1) {
        $str = ' товар';
    }else if (($count%10) == 2 || ($count%10) == 3 || ($count%10) == 4) {
        $str = ' товари';
    }else if ($count > 81) {
        $str=" тов";
    }else {
        $str = ' товарів';
    }
    $("#block-basket > a").html('<span>' + $count + $str + '</span> на суму <span>' +
        localStorage.getItem('price-of-cart') + '</span> грн');

}

function addToCart(object) {
        var tid = $(this).attr("tid");
        var ip;
    console.log(localStorage.getItem("ipadd"));
    $.ajax({
        url: "/cart/" + object,
        type: "POST",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        data: JSON.stringify(localStorage.getItem('ipadd')),
        success: function (data) {
            countOfCart = + localStorage.getItem('count-of-cart') + 1;
            localStorage.setItem('count-of-cart', countOfCart);
            priceOfCart = + localStorage.getItem('price-of-cart') + data.price;
            localStorage.setItem('price-of-cart', priceOfCart);
            loadingcart();
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
};

function logout() {
    $("#block-user").fadeOut(200);
    localStorage.setItem('auth', 'no');
    localStorage.setItem('auth_user_id', '');
    localStorage.setItem('auth_pass', '');
    localStorage.setItem('authPass', '');
    localStorage.setItem('auth_login', '');
    localStorage.setItem('authLogin', '');
    localStorage.setItem('auth_surname', '');
    localStorage.setItem('auth_name', '');
    localStorage.setItem('auth_patronymic', '');
    localStorage.setItem('auth_address', '');
    localStorage.setItem('auth_phone', '');
    localStorage.setItem('auth_email', '');
    localStorage.setItem('count-of-cart', '0');
    localStorage.setItem('price-of-cart', '0');
    $("#auth-user-info-div > p").html("");
    $("#reg-auth-title-div > p").html("<a onclick='authentication()' class='top-auth' id=''>Увійти</a><a href='/registration'>Реєстрація</a>");
    $("#block-basket > a").html('Кошик пустий');
};

function loadCart() {
    var $count = + localStorage.getItem('count-of-cart');
    if($count>0) {
        window.open('/cart', "_self");
    }else {
        alert("У вас порожній кошик. Наповніть його");
    }
};

function countMinus(iid) {
    var incount = + ($("#input-id" + iid).val()) - 1;
    if(incount>0) {
        var $count = + localStorage.getItem('count-of-cart') - 1;
        localStorage.setItem('count-of-cart', $count);
        var oldPrice = + $("#input-id" + iid).attr("oldPrice");
        var $price = + localStorage.getItem('price-of-cart') - oldPrice;
        localStorage.setItem('price-of-cart', $price);
        changeCount(incount,iid);
    }else {
        deleteCartProduct(iid);
    }
};

function countPlus(iid) {
    var incount = + ($("#input-id" + iid).val()) + 1;
    if(incount>0) {
        var $count = + localStorage.getItem('count-of-cart') + 1;
        localStorage.setItem('count-of-cart', $count);
        var oldPrice = + $("#input-id" + iid).attr("oldPrice");
        var $price = + localStorage.getItem('price-of-cart') + oldPrice;
        localStorage.setItem('price-of-cart', $price);
        changeCount(incount,iid);
    }else {
        deleteCartProduct(iid);
    }
};

function countInput(iid) {
        var incount = + $("#input-id" + iid).val();
    if(incount>0) {
        var oldCount = + $("#input-id" + iid).attr("oldCount");
        var $count = + localStorage.getItem('count-of-cart') - oldCount + incount;
        localStorage.setItem('count-of-cart', $count);
        var oldPrice = + $("#input-id" + iid).attr("oldPrice");
        var $price = + localStorage.getItem('price-of-cart') + (- oldCount + incount) * oldPrice;
        localStorage.setItem('price-of-cart', $price);
        changeCount(incount,iid);
    }else {
        deleteCartProduct(iid);
    }
};

function itog_price() {

    $(".itog-price > strong").html(localStorage.getItem('price-of-cart'));

}

function changeCount(incount, idcart) {
    $.ajax({
        url: "/cart/" + idcart,
        type: "PUT",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        data: JSON.stringify(incount),
        success: function (cart) {
            $("#input-id" + cart.id).val(cart.count);
            loadingcart();
            // Ціну помножити на кількість
            result_total = + (cart.price * cart.count);
            $("#tovar" + cart.id + " > p").html(fun_group_price(result_total) + " грн");
            $("#tovar" + cart.id + " > h5 > .span-count").html(cart.count);
            itog_price();
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

};

function deleteCartProduct(idToDelete) {
    $.ajax({
        url: "/cart/" + idToDelete,
        type: "DELETE",
        contentType: "application/json",
        success: function (cart) {
            location.reload();
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

}


function fun_group_price(intprice) {
    // Угруповання цифр за розрядами
    var result_total = String(intprice);
    var lenstr = result_total.length;

    switch (lenstr) {
        case 4: {
            groupprice = result_total.substring(0, 1) + " " + result_total.substring(1, 4);
            break;
        }
        case 5: {
            groupprice = result_total.substring(0, 2) + " " + result_total.substring(2, 5);
            break;
        }
        case 6: {
            groupprice = result_total.substring(0, 3) + " " + result_total.substring(3, 6);
            break;
        }
        case 7: {
            groupprice = result_total.substring(0, 1) + " " + result_total.substring(1, 4) + " " + result_total.substring(4, 7);
            break;
        }
        default: {
            groupprice = result_total;
        }
    }
    return groupprice;
}

function showBy(selectSort) {
    localStorage.setItem('current-show-sort', selectSort);
    // localStorage.setItem('current-sorting', selectSort);
    var sorting = '';
    switch (selectSort) {
        case 'newTovar': sorting = 'Новинки';
            break;
        case 'leader': sorting = 'Популярні';
            break;
        case 'sale': sorting = 'Розпродаж';
            break;
        default : sorting = 'Усі товари';
            break;
    }
    window.open('/view_aystopper', "_self");
}

function searchByTitle() {
    localStorage.setItem("keyToSearch", $("#input-search").val());
    window.open('/search', "_self");
};

function viewContent(object) {
    $.ajax({
        url: "/products/changeCount/" + object,
        type: "POST",
        contentType: "application/json",
        success: function (data) {
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

        localStorage.setItem('currentViewContentId', object);
        window.open('/view_content', "_self");
}

function changeLikeCount(idProduct) {
    $.ajax({
        url: "/products/changeLikeCount/" + idProduct,
        type: "POST",
        contentType: "application/json",
        success: function (data) {
            $("#likegoodcount").html(data.yesLike);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
}
