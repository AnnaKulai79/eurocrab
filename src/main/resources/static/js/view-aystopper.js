var pageCount = localStorage.getItem('currentPageCount');
var count_reviews=0;

function loadingVA() {

    localStorage.setItem('currentStartPrice', "10");
    localStorage.setItem('currentEndPrice', '1000');
    $('#blocktrackbar').trackbar({
        onMove : function() {
            document.getElementById("start-price").value = this.leftValue;
            document.getElementById("end-price").value = this.rightValue;
        },
        width : 160,
        leftLimit : 10,
        leftValue : document.getElementById("start-price").value,
        rightLimit : 1000,
        rightValue : document.getElementById("end-price").value,
        roundUp : 10
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
    if (localStorage.getItem('auth') == "yes_auth") {
        $("#reg-auth-title-div > p").html("");
        $("#auth-user-info-div > p").html("<img src='/images/user.png' />Вітаємо Вас, " + localStorage.getItem('auth_name') + "!");
        console.log("yes");
    }else{
        $("#auth-user-info-div > p").html("");
        $("#reg-auth-title-div > p").html("<a onclick='authentication()' class='top-auth' id=''>Увійти</a><a href='/registration'>Реєстрація</a>");
        console.log("no");
    }
        $.ajax({
            url: "/products/" + localStorage.getItem('current-show-sort') + sortString,
            type: "GET",
            contentType: "application/json",
            success: function (products) {
                pageCount = Math.ceil(products.length/10);
                localStorage.setItem('currentPageCount', pageCount);
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

};

var sortString = '/all';

function sortVA(sortingString) {
    var selectSortHTML = 'Усі товари';
    console.log(sortString);
    $("#select-sort").empty();
    switch (sortingString) {
        case 'priceDESC' : sortString = '/priceDESC';
            $("#select-sort").html('Від ............................ дорогих до дешевих');
            selectSortHTML = 'Від дорогих до дешевих';
            $("#select-sort").html(selectSortHTML);
            break;
        case 'byLeader' : sortString = '/byLeader';
            selectSortHTML = 'Популярне';
            break;
        case 'byNew' : sortString = '/byNew';
            selectSortHTML = 'Новинки';
            break;
        case 'byTitle' : sortString = '/byTitle';
            selectSortHTML = 'Від А до Я';
            break;
        case 'priceASC' : sortString = '/priceASC';
            selectSortHTML = 'Від дешевих до дорогих';
            break;
        default : sortString = '/all';
            break;
    }
    $("#select-sort").html('...........................');
    $("#select-sort").html(selectSortHTML);

    $("#sorting-list").hide();
    $('#page-content').text('Сторінка 1') + ' content here';
    loadNewPage(0);
}

$(document).ready(function () {
    $('body,html').animate({scrollTop:0},800);
    var textNavBreadcrumbs;
    switch (localStorage.getItem('current-show-sort')) {
        case 'newTovar' : textNavBreadcrumbs = 'НОВИНКИ';
                        break;
        case 'leader' : textNavBreadcrumbs = 'ЛІДЕРИ ПРОДАЖ';
                        break;
        case 'sale' : textNavBreadcrumbs = 'РОЗПРОДАЖ';
                        break;
    }
    $("#nav-breadcrumbs > span").html(textNavBreadcrumbs);

    $.ajax({
        url: "/products/" + localStorage.getItem('current-show-sort') + sortString,
        type: "GET",
        contentType: "application/json",
        success: function (products) {
            pageCount = Math.ceil(products.length/10);
            localStorage.setItem('currentPageCount', pageCount);
            $("#block-tovar-grid li").remove();
            $("#block-tovar-list li").remove();
            for (var i = 0; i < products.length; i++) {
                if(((0) <= i) && (((1)*10) > i)) {
                    $.ajax({
                        url: "/reviews/" + products[i].id,
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
                    $("#block-tovar-grid").append("<li><div class='block-images-grid' >" +
                        "<img id='card-imageG" + products[i].id + "' style='cursor: pointer' src='/uploads_images/" + products[i].image + "' width=90px height=auto" +
                        " onclick='viewContent(" + products[i].id + ")' /></div>" +
                        "<p class='style-title-grid' ><a style='cursor: pointer' onclick='viewContent(" + products[i].id + ")'>" +
                        products[i].title + "</a></p><ul class='reviews-and-counts-grid'>" +
                        "<li><img src='/images/eye-icon.png' /><p>" + products[i].count + "</p></li>" +
                        "<li><img src='/images/comment-icon.png' /><p>" + count_reviews + "</p></li></ul>" +
                        "<a class='add-cart-style-grid'  tid='" + products[i].id + "'" +
                        "onclick='addToCart(" + products[i].id + ")'></a>" +
                        "<p class='style-price-grid'><strong>" + products[i].price + "</strong> грн.</p >" +
                        "<div class='mini-features'>" + products[i].minifeatures + "</div></li>");
                    $("#block-tovar-list").append("<li><div class='block-images-list' >" +
                        "<img id='card-imageL" + products[i].id + "' style='cursor: pointer' src='/uploads_images/" + products[i].image + "' width=90px height=auto" +
                        " onclick='viewContent(" + products[i].id + ")' /></div>" +
                        "<p class='style-title-list' ><a style='cursor: pointer' onclick='viewContent(" + products[i].id + ")'>" +
                        products[i].title + "</a></p><ul class='reviews-and-counts-list'>" +
                        "<li><img src='/images/eye-icon.png' /><p>" + products[i].count + "</p></li>" +
                        "<li><img src='/images/comment-icon.png' /><p>" + count_reviews + "</p></li></ul>" +
                        "<a class='add-cart-style-list' tid='" + products[i].id + "'" +
                        "onclick='addToCart(" + products[i].id + ")'></a>" +
                        "<p class='style-price-list'><strong>" + products[i].price + "</strong> грн.</p >" +
                        "<div class='style-text-list'>" + products[i].miniDescription + "</div></li>");
                    var imageH, imageW, ratioH, ratioW, ratio, idImage;
                    var maxW = 180;
                    var maxH = 190;
                    var h,w;
                    idImage = products[i].id;
                   $("#card-imageG" + idImage).load(function() {
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
                    $("#card-imageL" + idImage).load(function() {
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
            alert(err.message);
        }
    });


});

$('#pagination-demo').twbsPagination({
    totalPages: +(localStorage.getItem('currentPageCount')),
    visiblePages: 5,
    next: 'Наступна',
    prev: 'Попередня',
    onPageClick: function (event, page) {
        //fetch content and render here
        $('#page-content').text('Сторінка ' + page) + ' content here';
            loadNewPage(page - 1);
    }
});

function loadNewPage(page) {
    $('body,html').animate({scrollTop:0},800);
    var textNavBreadcrumbs;
    switch (localStorage.getItem('current-show-sort')) {
        case 'newTovar' : textNavBreadcrumbs = 'НОВИНКИ';
            break;
        case 'leader' : textNavBreadcrumbs = 'ЛІДЕРИ ПРОДАЖ';
            break;
        case 'sale' : textNavBreadcrumbs = 'РОЗПРОДАЖ';
            break;
    }
    $("#nav-breadcrumbs > span").html(textNavBreadcrumbs);
    console.log(sortString);
    $.ajax({
        url: "/products/" + localStorage.getItem('current-show-sort') + sortString,
        type: "GET",
        contentType: "application/json",
        success: function (products) {
            pageCount = Math.ceil(products.length/10);
            localStorage.setItem('currentPageCount', pageCount);
            $("#block-tovar-grid li").remove();
            $("#block-tovar-list li").remove();
            for (var i = 0; i < products.length; i++) {
                if(((page*10) <= i) && (((page + 1)*10) > i)) {
                    $.ajax({
                        url: "/reviews/" + products[i].id,
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
                    $("#block-tovar-grid").append("<li><div class='block-images-grid' >" +
                        "<img id='card-imageG" + products[i].id + "' style='cursor: pointer' src='/uploads_images/" + products[i].image + "' width=90px height=auto" +
                        " onclick='viewContent(" + products[i].id + ")' /></div>" +
                        "<p class='style-title-grid' ><a style='cursor: pointer' onclick='viewContent(" + products[i].id + ")'>" +
                        products[i].title + "</a></p><ul class='reviews-and-counts-grid'>" +
                        "<li><img src='/images/eye-icon.png' /><p>" + products[i].count + "</p></li>" +
                        "<li><img src='/images/comment-icon.png' /><p>" + count_reviews + "</p></li></ul>" +
                        "<a class='add-cart-style-grid'  tid='" + products[i].id + "'" +
                        "onclick='addToCart(" + products[i].id + ")'></a>" +
                        "<p class='style-price-grid'><strong>" + products[i].price + "</strong> грн.</p >" +
                        "<div class='mini-features'>" + products[i].minifeatures + "</div></li>");
                    $("#block-tovar-list").append("<li><div class='block-images-list' >" +
                        "<img id='card-imageL" + products[i].id + "' style='cursor: pointer' src='/uploads_images/" + products[i].image + "' width=90px height=auto" +
                        " onclick='viewContent(" + products[i].id + ")' /></div>" +
                        "<p class='style-title-list' ><a style='cursor: pointer' onclick='viewContent(" + products[i].id + ")'>" +
                        products[i].title + "</a></p><ul class='reviews-and-counts-list'>" +
                        "<li><img src='/images/eye-icon.png' /><p>" + products[i].count + "</p></li>" +
                        "<li><img src='/images/comment-icon.png' /><p>" + count_reviews + "</p></li></ul>" +
                        "<a class='add-cart-style-list' tid='" + products[i].id + "'" +
                        "onclick='addToCart(" + products[i].id + ")'></a>" +
                        "<p class='style-price-list'><strong>" + products[i].price + "</strong> грн.</p >" +
                        "<div class='style-text-list'>" + products[i].miniDescription + "</div></li>");
                    var imageH, imageW, ratioH, ratioW, ratio, idImage;
                    var maxW = 180;
                    var maxH = 190;
                    var h,w;
                    idImage = products[i].id;
                    $("#card-imageG" + idImage).load(function() {
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
                    $("#card-imageL" + idImage).load(function() {
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
            alert(err.message);
        }
    });
}

function sort(statusSort) {
    localStorage.setItem('current-sorting', statusSort);
    localStorage.setItem('current-show-sort', "");
    console.log(statusSort);
    var sorting = '';
    switch (statusSort) {
        case 'priceASC': sorting = 'Від дешевих до дорогих';
            break;
        case 'priceDESC': sorting = 'Від дорогих до дешевих';
            break;
        case 'byLeader': sorting = 'Популярне';
            break;
        case 'byNew': sorting = 'Новинки';
            break;
        case 'byTitle': sorting = 'Від А до Я';
            break;
        default : sorting = 'Усі товари';
            break;
    }

    $("#select-sort").html(sorting);
     $("#sorting-list").hide();
    $('#page-content').text('Сторінка 1') + ' content here';
    loadNewPage(0);
};


$("#top-auth.top-auth").click(function () {
    var statusTopAuth = $('#top-auth').attr("name");
    console.log("ggggggggg");
    if (statusTopAuth == "") {
        $("#top-auth").attr("name", "active-button");
        $("#block-top-auth").fadeIn(200);
    } else {
        $("#top-auth").attr("name", "");
        $("#block-top-auth").fadeOut(200);
    }
});


