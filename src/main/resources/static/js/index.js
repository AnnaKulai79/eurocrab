var pageCount = localStorage.getItem('currentPageCount');
var count_reviews=0;

var imageH, imageW, ratioH, ratioW, ratio, idImage;

$(document).ready(function () {
    localStorage.setItem('currentStartPrice', "10");
    localStorage.setItem('currentEndPrice', '1000');
    $('body,html').animate({scrollTop:0},800);

    $.ajax({
        url: "/products/pageable?page=0&size=10",
        type: "GET",
        contentType: "application/json",
        success: function (allProducts) {
            pageCount = allProducts.totalPages;
            localStorage.setItem('currentPageCount', pageCount+1);
            $("#block-tovar-grid li").remove();
            $("#block-tovar-list li").remove();
            for (var i = 0; i < allProducts.content.length; i++) {
                if (allProducts.content[i].visible) {
                    $.ajax({
                        url: "/reviews/" + allProducts.content[i].id,
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
                        "<img id='card-imageG" + allProducts.content[i].id + "' width=180px height=auto style='cursor: pointer' " +
                        "src='/uploads_images/" + allProducts.content[i].image + "' onclick='viewContent(" +
                        allProducts.content[i].id + ")' /></div>" +
                        "<p class='style-title-grid' ><a style='cursor: pointer' onclick='viewContent(" + allProducts.content[i].id + ")'>" +
                        allProducts.content[i].title + "</a></p>" +
                        "<ul class='reviews-and-counts-grid'>" +
                        "<li><img src='/images/eye-icon.png' /><p>" + allProducts.content[i].count + "</p></li>" +
                        "<li><img src='/images/comment-icon.png' /><p>" + count_reviews + "</p></li></ul>" +
                        "<a class='add-cart-style-grid' tid='" + allProducts.content[i].id + "'" +
                        " onclick='addToCart(" + allProducts.content[i].id + ")' ></a>" +
                        "<p class='style-price-grid'><strong>" + allProducts.content[i].price + "</strong> грн.</p >" +
                        "<div class='mini-features'>" + allProducts.content[i].minifeatures + "</div></li>");
                    $("#block-tovar-list").append("<li><div class='block-images-list' >" +
                        "<img id='card-imageL" + allProducts.content[i].id + "' width=180px height=auto style='cursor: pointer' " +
                        "src='/uploads_images/" + allProducts.content[i].image +
                        "' onclick='viewContent(" + allProducts.content[i].id + ")' /></div>" +
                        "<p class='style-title-list' ><a style='cursor: pointer' onclick='viewContent(" + allProducts.content[i].id + ")'>" +
                        allProducts.content[i].title + "</a></p>" +
                        "<ul class='reviews-and-counts-list'>" +
                        "<li><img src='/images/eye-icon.png' /><p>" + allProducts.content[i].count + "</p></li>" +
                        "<li><img src='/images/comment-icon.png' /><p>" + count_reviews + "</p></li></ul>" +
                        "<a class='add-cart-style-list' tid='" + allProducts.content[i].id + "'" +
                        "onclick='addToCart(" + allProducts.content[i].id + ")'></a>" +
                        "<p class='style-price-list'><strong>" + allProducts.content[i].price + "</strong> грн.</p >" +
                        "<div class='style-text-list'>" + allProducts.content[i].miniDescription + "</div></li>");
                    var maxW = 180;
                    var maxH = 190;
                    idImage = allProducts.content[i].id;
                    var h,w;
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
            pageCount = allProducts.totalPages;
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
    $.getJSON('https://api.ipify.org?format=json', function(data){
        localStorage.setItem("ipadd", data.ip);
    });

    $.ajax({
        url: "/ipadd",
        type: "POST",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        data: JSON.stringify(localStorage.getItem('ipadd')),
        success: function (data) {
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert("you" + err.message);
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
            loadNewPage(page - 1);
    }
});

function loadNewPage(page) {
    $('body,html').animate({scrollTop:0},800);
    pageCount = 0;
    var sorting = '';
    var idSorting = '';
    switch (localStorage.getItem('current-sorting')) {
        case 'priceASC': sorting = '/priceASC';
                break;
        case 'priceDESC': sorting = '/priceDESC';
                break;
        case 'byLeader': sorting = '/byLeader';
                break;
        case 'byNew': sorting = '/byNew';
                break;
        case 'byTitle': sorting = '/byTitle';
                break;
        case 'byCategories': sorting = '/byCategories';
                idSorting = "/" + localStorage.getItem('current-id-sorting');
                break;
        case 'byBrand': sorting = '/byBrand';
                idSorting = "/" + localStorage.getItem('current-id-sorting');
                break;
        default : sorting = '';
                break;
    }
    $.ajax({
        url: "/products" + sorting + "/pageable?page=" + page + "&size=10",
        type: "GET",
        contentType: "application/json",
        success: function (allProducts) {
            $("#block-tovar-grid li").remove();
            $("#block-tovar-list li").remove();
            pageCount = allProducts.totalPages;
            for (var i = 0; i < allProducts.content.length; i++) {
                //allProducts.content[i].title
                if (allProducts.content[i].visible) {
                    $.ajax({
                        url: "/reviews/" + allProducts.content[i].id,
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
                    if ((localStorage.getItem('current-show-sort') == "newTovar" && allProducts.content[i].newTovar == "1") ||
                        (localStorage.getItem('current-show-sort') == "leader" && allProducts.content[i].leader == "1") ||
                        (localStorage.getItem('current-show-sort') == "sale" && allProducts.content[i].sale == "1") ||
                        (localStorage.getItem('current-show-sort') == "")) {
                    $("#block-tovar-grid").append("<li><div class='block-images-grid' >" +
                        "<img id='card-imageG" + allProducts.content[i].id + "' width=180px height=auto style='cursor: pointer' " +
                        "src='/uploads_images/" + allProducts.content[i].image + //"' width=90px height=auto" +
                        "' onclick='viewContent(" + allProducts.content[i].id + ")' /></div>" +
                        // "<p class='style-title-grid' ><a href='view_content.html?id=" + allProducts.content[i].id + "'>" +
                        "<p class='style-title-grid' ><a style='cursor: pointer' onclick='viewContent(" + allProducts.content[i].id + ")'>" +
                        allProducts.content[i].title + "</a></p>" +
                        "<ul class='reviews-and-counts-grid'>" +
                        "<li><img src='/images/eye-icon.png' /><p>" + allProducts.content[i].count + "</p></li>" +
                        "<li><img src='/images/comment-icon.png' /><p>" + count_reviews + "</p></li></ul>" +
                        "<a class='add-cart-style-grid'  tid='" + allProducts.content[i].id + "'" +
                        "onclick='addToCart(" + allProducts.content[i].id + ")'></a>" +
                        "<p class='style-price-grid'><strong>" + allProducts.content[i].price + "</strong> грн.</p >" +
                        "<div class='mini-features'>" + allProducts.content[i].minifeatures + "</div></li>");
                        $("#block-tovar-list").append("<li><div class='block-images-list' >" +
                        "<img id='card-imageL" + allProducts.content[i].id + "' width=180px height=auto style='cursor: pointer' " +
                        "src='/uploads_images/" + allProducts.content[i].image + //"' width=90px height=auto" +
                        "' onclick='viewContent(" + allProducts.content[i].id + ")' /></div>" +
                        "<p class='style-title-list' ><a style='cursor: pointer' onclick='viewContent(" + allProducts.content[i].id + ")'>" +
                        allProducts.content[i].title + "</a></p>" +
                        "<ul class='reviews-and-counts-list'>" +
                        "<li><img src='/images/eye-icon.png' /><p>" + allProducts.content[i].count + "</p></li>" +
                        "<li><img src='/images/comment-icon.png' /><p>" + count_reviews + "</p></li></ul>" +
                        "<a class='add-cart-style-list' tid='" + allProducts.content[i].id + "'" +
                        "onclick='addToCart(" + allProducts.content[i].id + ")'></a>" +
                        "<p class='style-price-list'><strong>" + allProducts.content[i].price + "</strong> грн.</p >" +
                        "<div class='style-text-list'>" + allProducts.content[i].miniDescription + "</div></li>");
                        var maxW = 180;
                        var maxH = 190;
                        var h,w;
                        idImage = allProducts.content[i].id;
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

//                        pageCount++;
                    }
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
    if (statusTopAuth == "") {
        $("#top-auth").attr("name", "active-button");
        $("#block-top-auth").fadeIn(200);
    } else {
        $("#top-auth").attr("name", "");
        $("#block-top-auth").fadeOut(200);
    }
});


