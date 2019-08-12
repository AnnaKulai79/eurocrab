function loadingSF() {
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
                for (var i = 0; i < carts.length ; i++) {
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

        var $count = + localStorage.getItem('count-of-cart');
        if($count>0) {
            loadingcart();
        };
    }
    if (localStorage.getItem('auth') == "yes_auth") {
        $("#reg-auth-title-div > p").html("");
        $("#auth-user-info-div > p").html("<img src='/images/user.png' />Вітаємо Вас, " + localStorage.getItem('auth_name') + "!");
        console.log("yes");
    }else{
        $("#auth-user-info-div > p").html("");
        $("#reg-auth-title-div > p").html("<a onclick='authentication()' class='top-auth' id=''>Увійти</a><a href='/registration'>Реєстрація</a>");
        console.log("no");
    }
    $("ul.tabs").jTabs({content: ".tabs_content", animate: true, effect:"fade"});
    $(".image-modal").fancybox();
    $(".send-review").fancybox();

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

var count_reviews;

$(document).ready(function () {
    $('body,html').animate({scrollTop:0},800);

    $("ul.tabs").jTabs({content: ".tabs_content", animate: true, effect:"fade"});
    $(".image-modal").fancybox();
    $(".send-review").fancybox();

    $.ajax({
        url: "/products/" +  localStorage.getItem('currentViewContentId'),
        type: "GET",
        contentType: "application/json",
        success: function (product) {
            $( "#block-content" ).empty();
            if(product.visible) {
                $.ajax({
                    url: "/reviews/" + product.id,
                    type: "GET",
                    contentType: "application/json",
                    success: function (allReviews) {
                        count_reviews = allReviews.length;
                        $("#block-content").append("<div id='block-breadcrumbs-and-rating'>" +
                            "<p id='nav-breadcrumbs2'><a style='cursor: pointer' onclick='viewByCategory(" +
                            product.brand.categories.id + ")'>" + product.brand.categories.name +
                            "</a> \\ <span>" + product.brand.brand +"</span></p>" +
                            "<div id='block-like'>" +
                            "<p id='likegood' onclick='changeLikeCount(" + product.id + ")' tid=" + product.id +
                            " >Подобається</p><p id='likegoodcount' >" + product.yesLike + "</p>" +
                            "</div></div>" +
                            "<div id='block-content-info'>" +
                            "<img src='/uploads_images/" + product.image + "' width=110px height=auto />" +
                            "<div id='block-mini-description'><p id='content-title'>" + product.title + "</p>" +
                            "<ul class='reviews-and-counts-content'>" +
                            "<li><img style='width: 18px; height: auto' src='/images/eye-icon.png' /><p>" + product.count + "</p></li>" +
                            "<li><img style='width: 18px; height: auto' src='/images/comment-icon.png' /><p>" + count_reviews + "</p></li></ul>" +
                            "<p id='style-price' >" + product.price + " грн</p>" +
                            "<a class='add-cart' id='add-cart-view' tid='" + product.id + "' onclick='addToCart(" +
                            product.id + ")' ></a><p id='content-text'>" + product.miniDescription + "</p></div></div>" +
                            "<div id='block-img-slide'><ul id='block-img-slide-ul'></ul></div>" +
                            "<ul class='tabs'><li><a class='active' href='#' >Опис</a></li>" +
                            "<li><a href='#' >Характеристики</a></li><li><a href='#' >Відгуки</a></li></ul>" +
                            "<div class='tabs_content'><div>" + product.description + "</div>" +
                            "<div>" + product.features + "</div>" +
                            "<div><p id='link-send-review' ><a class='send-review' href='#send-review' >Написати відгук</a></p>" +
                            "<div id='block-reviews' ></div></div></div>" +
                            "<div id='send-review' >" +
                            "<p align='right' id='title-review'>Публікація відгука проводиться після модерації.</p>" +
                            "<ul><li><p align='right'><label id='label-name' >Ім'я<span>*</span></label><input maxlength='15' type='text' id='name_review' /></p></li>" +
                            "<li><p align='right'><label id='label-good' >Переваги<span>*</span></label><textarea id='good_review' ></textarea></p></li>" +
                            "<li><p align='right'><label id='label-bad' >Недоліки<span>*</span></label><textarea id='bad_review' ></textarea></p></li>" +
                            "<li><p align='right'><label id='label-comment' >Коментар</label><textarea id='comment_review' ></textarea></p></li></ul>" +
                            "<p id='reload-img'><img src='/images/loading.gif'/></p> <p id='button-send-review' iid='" + product.id +
                            "' onclick='sendReview()' >Відправити</p></div>");
                        if(count_reviews>0){
                            for (var i = 0; i < allReviews.length ; i++) {
                                var dateReview = new Date(allReviews[i].date)
                                $("#block-reviews").append("<div class='block-reviews' >" +
                                    "<p class='author-date' ><strong>" + allReviews[i].name + "</strong>, " +
                                    dateReview.toLocaleDateString() + "</p><img src='/images/plus-reviews.png' />" +
                                    "<p class='textrev' >" + allReviews[i].goodReviews + "</p>" +
                                    "<img src='/images/minus-reviews.png' />" +
                                    "<p class='textrev' >" + allReviews[i].badReviews + "</p>" +
                                    "<p class='text-comment'>" + allReviews[i].comment + "</p></div>");
                            }
                        }else{
                            $("#block-reviews").append("<p class='title-no-info' >Відгуків поки що немає</p>");
                        }
                        $.ajax({
                            url: "/upload_images/" +  localStorage.getItem('currentViewContentId'),
                            type: "GET",
                            contentType: "application/json",
                            success: function (imagesData) {
                                for (var k = 0; k < imagesData.length; k++) {
                                    $("#block-img-slide-ul").append("<li><a class='image-modal' href='#image" +
                                        imagesData[k].id + "'><img src='/uploads_images/" + imagesData[k].image +
                                        "' width=auto height=70px /></a></li>" +
                                        "<a style='display:none;' class='image-modal' rel='group'" +
                                        "id='image" + imagesData[k].id + "' ><img  src='/uploads_images/" +
                                        imagesData[k].image + "' /></a>");
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
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

});

function sendReview() {

    var name = $("#name_review").val();
    var good = $("#good_review").val();
    var bad = $("#bad_review").val();
    var comment = $("#comment_review").val();
    var iid = $("#button-send-review").attr("iid");

    if (name != "") {
        name_review = '1';
        $("#name_review").css("borderColor", "#DBDBDB");
    } else {
        name_review = '0';
        $("#name_review").css("borderColor", "#FDB6B6");
    }

    if (good != "") {
        good_review = '1';
        $("#good_review").css("borderColor", "#DBDBDB");
    } else {
        good_review = '0';
        $("#good_review").css("borderColor", "#FDB6B6");
    }

    if (bad != "") {
        bad_review = '1';
        $("#bad_review").css("borderColor", "#DBDBDB");
    } else {
        bad_review = '0';
        $("#bad_review").css("borderColor", "#FDB6B6");
    }


    // Глобальна перевірка і відправка відгуку

    if (name_review == '1' && good_review == '1' && bad_review == '1') {
        $("#button-send-review").hide();
        $("#reload-img").show();
        $.ajax({
            url: "/products/" + iid,
            type: "GET",
            contentType: "application/json",
            success: function (product) {

        var reviewsToSave = {
            products : product,
            name : name,
            goodReviews : good,
            badReviews : bad,
            comment : comment,
            date : new Date()
        };
        $.ajax({
            url: "/reviews",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(reviewsToSave),
            success: function (data) {
                setTimeout("$.fancybox.close()", 1000);
            }
        });
            }
        });
    }
};

