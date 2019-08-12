function loadingVCat() {
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
    if (localStorage.getItem('id-active-category') !== "") {
        $.ajax({
            url: "/brands/" + localStorage.getItem('id-active-category'),
            type: "GET",
            contentType: "application/json",
            success: function (dataBrand) {
                $(".checkbox-brand li").remove();

                $("#li-brand" + localStorage.getItem('id-active-category')).append("<li><a style='cursor: pointer' " +
                    "onclick='viewByCategory(" + localStorage.getItem('id-active-category') + ")'>" + "<strong>" +
                    "Всі види</strong></a></li>");
                localStorage.setItem('name-active-category', dataBrand[0].categories.name);
                for (var j = 0; j < dataBrand.length; j++) {
                    $("#li-brand" + localStorage.getItem('id-active-category')).append("<li><a " +
                        "style='cursor: pointer' onclick='viewByBrand(" + dataBrand[j].id + ")'>" + dataBrand[j].brand +
                        "</a></li>");
                    $(".checkbox-brand").append("<li><input type='checkbox' name='brand[]' value='" + dataBrand[j].id + "' " +
                        "id='checkbrend" + dataBrand[j].id + "' /><label for='checkbrend" + dataBrand[j].id + "'>" +
                        dataBrand[j].brand + "</label></li>");
                }

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert("i1" + err.message);
            }
        });
        if(localStorage.getItem('id-active-brand') !== '') {
                $.ajax({
                    url: "/products/byBrand/" + localStorage.getItem('id-active-brand') + "/all",
                    type: "GET",
                    contentType: "application/json",
                    success: function (products) {
                        pageCount = Math.ceil(products.length/10);
                        localStorage.setItem('currentPageCount', pageCount);
                    },
                    error: function (xhr, status, error) {
                        var err = eval("(" + xhr.responseText + ")");
                        alert("i2" + err.message);
                    }
                });
            }else {
            $.ajax({
                url: "/products/byCategory/" + localStorage.getItem('id-active-category') + "/all",
                type: "GET",
                contentType: "application/json",
                success: function (products) {
                    pageCount = Math.ceil(products.length/10);
                    localStorage.setItem('currentPageCount', pageCount);
                },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert("i3" + err.message);
                }
            });

        }
    }
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
                alert("i4" + err.message);
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
            alert("i5" + err.message);
        }
    });


}

var sortString = '/all';

function sortVCat(sortingString) {
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
    var type = 'byCategory/';
    var idType = localStorage.getItem("id-active-category");
    $("#nav-breadcrumbs > span").html("По категорії " + localStorage.getItem('name-active-category'));
    if(localStorage.getItem('id-active-brand') !== '') {
        type = 'byBrand/';
        idType = localStorage.getItem("id-active-brand");
        $("#nav-breadcrumbs > span").html("По бренду " + localStorage.getItem('name-active-brand'));
    }
        $.ajax({
            url:  "/products/" + type + idType + sortString,
            type: "GET",
            contentType: "application/json",
            success: function (products) {
            localStorage.setItem('currentPageCount',  Math.ceil(products.length/10));
            $("#block-tovar-grid li").remove();
            $("#block-tovar-list li").remove();
                console.log(products.length);
                if(products.length <= 0) {
                $("#block-tovar-grid").append("<li><h3>По даному запиту товарів немає</h3></li>");
                $("#block-tovar-list").append("<li><h3>По даному запиту товарів немає</h3></li>");
            }else {
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
                                alert("i6" + err.message);
                            }
                        });
                        $("#block-tovar-grid").append("<li><div class='block-images-grid' >" +
                            "<img id='card-imageG" + products[i].id + "' style='cursor: pointer' src='/uploads_images/" + products[i].image + "' width=180px height=auto" +
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
                            "<img id='card-imageL" + products[i].id + "' style='cursor: pointer' src='/uploads_images/" + products[i].image + "' width=180px height=auto" +
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
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert("i7" + err.message);
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
    $('body,html').animate({scrollTop:0},800);
    var type = 'byCategory/';
    var idType = localStorage.getItem("id-active-category");
    $("#nav-breadcrumbs > span").html("По категорії " + localStorage.getItem('name-active-category'));
    if(localStorage.getItem('id-active-brand') !== '') {
        type = 'byBrand/';
        idType = localStorage.getItem("id-active-brand");
        $("#nav-breadcrumbs > span").html("По бренду " + localStorage.getItem('name-active-brand'));
    }
    $.ajax({
        url:  "/products/" + type + idType + sortString,
        type: "GET",
        contentType: "application/json",
        success: function (products) {
            localStorage.setItem('currentPageCount',  Math.ceil(products.length/10));
            $("#block-tovar-grid li").remove();
            $("#block-tovar-list li").remove();
            if(products.length <= 0) {
                $("#block-tovar-grid").append("<li><h3>По даному запиту товарів немає</h3></li>");
                $("#block-tovar-list").append("<li><h3>По даному запиту товарів немає</h3></li>");
            }else {
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
                                alert("i8" + err.message);
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
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert("i9" + err.message);
        }
    });
};
