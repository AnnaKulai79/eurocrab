$(document).ready(function () {

});

function changeStartPrice() {
    localStorage.setItem('currentStartPrice', $('#start-price').val());
    // $("#leftBlock span").html($('#start-price').val());
    // $("#leftBlock span.limit").html("10");
}

function changeEndPrice() {
    localStorage.setItem('currentEndPrice', $('#end-price').val());
    // $("#rightBlock span").html($('#end-price').val());
    // $("#rightBlock span.limit").html("1000");
}

function searchParam() {
    $(".checkbox-brand li h4").remove();
    if(localStorage.getItem('id-active-category') == "") {
        $(".checkbox-brand").append("<li><h4>Не вибрано категорію</h4></li>");
        localStorage.setItem('currentStartPrice', $('#start-price').val());
        localStorage.setItem('currentEndPrice', $('#end-price').val());
        $.ajax({
            url: "/brand/",
            type: "GET",
            contentType: "application/json",
            success: function (dataBrand) {
                var stringBrand = '';
                for (var i = 0; i < dataBrand.length; i++) {
                        if(stringBrand == '') {
                            stringBrand = dataBrand[i].id;
                        } else {
                            stringBrand = stringBrand + "," + dataBrand[i].id;
                        }
                    }
                localStorage.setItem('stringBrand', stringBrand)
                window.open('/search_filter', "_self");
            },
                error: function (xhr, status, error) {
                    var err = eval("(" + xhr.responseText + ")");
                    alert(err.message);
                }
            });

    }else {
        localStorage.setItem('currentStartPrice', $('#start-price').val());
        localStorage.setItem('currentEndPrice', $('#end-price').val());
        $.ajax({
            url: "/brands/" + localStorage.getItem('id-active-category'),
            type: "GET",
            contentType: "application/json",
            success: function (dataBrand) {
                var stringBrand = '';
                for (var i = 0; i < dataBrand.length; i++) {
                    if ($('#checkbrend' + dataBrand[i].id).is(":checked")) {
                        if(stringBrand == '') {
                            // stringBrand = "'" + dataBrand[i].id + "'";
                            stringBrand = dataBrand[i].id;
                        } else {
                            stringBrand = stringBrand + "," + dataBrand[i].id;
                        }
                    }
                }
                if(stringBrand == '') {
                    $(".checkbox-brand").append("<li><h4>Не вибрано бренд</h4></li>");
                    localStorage.setItem('currentStartPrice', $('#start-price').val());
                    localStorage.setItem('currentEndPrice', $('#end-price').val());
                    $.ajax({
                        url: "/brands/" + localStorage.getItem('id-active-category'),
                        type: "GET",
                        contentType: "application/json",
                        success: function (dataBrand) {
                            var stringBrand = '';
                            for (var i = 0; i < dataBrand.length; i++) {
                                if(stringBrand == '') {
                                    stringBrand = dataBrand[i].id;
                                } else {
                                    stringBrand = stringBrand + "," + dataBrand[i].id;
                                }
                            }
                            localStorage.setItem('stringBrand', stringBrand)
                            window.open('/search_filter', "_self");
                        },
                        error: function (xhr, status, error) {
                            var err = eval("(" + xhr.responseText + ")");
                            alert(err.message);
                        }
                    });
                }else {

                    localStorage.setItem('stringBrand', stringBrand)
                    window.open('/search_filter', "_self");
                }
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });
    }
}