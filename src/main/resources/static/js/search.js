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
    if(localStorage.getItem('current-sorting') == '') {
        if(localStorage.getItem('keyToSearch').length <= 2) {
            $("#block-tovar-grid li").remove();
            $("#block-tovar-list li").remove();
            $("#block-tovar-grid").append("<li><h2>Пошукове значення має бути від 2 до 150 символів.</h2></li>");
            $("#block-tovar-list").append("<li><h2>Пошукове значення має бути від 2 до 150 символів.</h2></li>");
            localStorage.setItem('currentPageCount', '1');
        }else {
            $.ajax({
                url: "/products/search/" + localStorage.getItem('keyToSearch') + sortString,
                type: "GET",
                contentType: "application/json",
                success: function (products) {
                    pageCount = Math.ceil(products.length / 10);
                    localStorage.setItem('currentPageCount', pageCount);
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.message);
                }
            });
        }
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


}

var sortString = '/all';

function sortS(sortingString) {
    var selectSortHTML = 'Усі товари';
    console.log(sortString);
    $("#select-sort").empty();
    switch (sortingString) {
        case 'priceDESC' : sortString = '/priceDESC';
            $("#select-sort").html('.............................');
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
            $("#select-sort").html('.............................');
            selectSortHTML = 'Від дешевих до дорогих';
            $("#select-sort").html(selectSortHTML);
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
    if(localStorage.getItem('keyToSearch').length <= 2) {
        $("#block-tovar-grid li").remove();
        $("#block-tovar-list li").remove();
        $("#block-tovar-grid").append("<li><h2>Пошукове значення має бути від 2 до 150 символів.</h2></li>");
        $("#block-tovar-list").append("<li><h2>Пошукове значення має бути від 2 до 150 символів.</h2></li>");
        localStorage.setItem('currentPageCount', '1');
    }else {
        $.ajax({
            url: "/products/search/" + localStorage.getItem('keyToSearch') + sortString,
            type: "GET",
            contentType: "application/json",
            success: function (products) {
                localStorage.setItem('currentPageCount', Math.ceil(products.length / 10));
                $("#block-tovar-grid li").remove();
                $("#block-tovar-list li").remove();
                for (var i = 0; i < products.length; i++) {
                    if ((0 <= i) && (10 > i)) {
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
});


$('#pagination-demo').twbsPagination({
    totalPages: +(localStorage.getItem('currentPageCount')),
    visiblePages: 5,
    next: 'Наступна',
    prev: 'Попередня',
    onPageClick: function (event, page) {
        //fetch content and render here
        $('#page-content').text('Сторінка ' + page) + ' content here';
        // if(localStorage.getItem('current-sorting') == 'byCategories') {
        //     loadNewPageByCategories(page - 1);
        // }else if (localStorage.getItem('current-sorting') == 'byBrand') {
        //     loadNewPageByBrand(page - 1);
        // }else {
            loadNewPage(page - 1);
        // }
    }
});

var count_reviews;

function loadNewPage(page) {
    if(localStorage.getItem('keyToSearch').length <= 2) {
        $("#block-tovar-grid li").remove();
        $("#block-tovar-list li").remove();
        $("#block-tovar-grid").append("<li><h2>Пошукове значення має бути від 2 до 150 символів.</h2></li>");
        $("#block-tovar-list").append("<li><h2>Пошукове значення має бути від 2 до 150 символів.</h2></li>");
        localStorage.setItem('currentPageCount', '1');
    }else {
        $('body,html').animate({scrollTop: 0}, 800);
        $.ajax({
            url: "/products/search/" + localStorage.getItem('keyToSearch') + sortString,
            type: "GET",
            contentType: "application/json",
            success: function (products) {
                localStorage.setItem('currentPageCount', Math.ceil(products.length / 10));
                $("#block-tovar-grid li").remove();
                $("#block-tovar-list li").remove();
                for (var i = 0; i < products.length; i++) {
                    if (((page * 10) <= i) && (((page + 1) * 10) > i)) {
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
};
