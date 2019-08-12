var pageCount = localStorage.getItem('currentPageCount');
var idCurrentCategory;
var sortingString = "";
var valueSelectLinks = "Усі товари";
var sortingBy = "all";

$(document).ready(function () {
    $("#link-nav").append("<a href='/admin/index' >Головна</a>\\<a href='/admin/tovar'>Товари</a>");
    $.ajax({
        url: "/category",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#list-links").append("<ul class='listBrands' id='listBrand" + data[i].id + "'><li><a style='cursor: pointer' " +
                    "onclick='sortByCategory(" + data[i].id + ")'><strong>" + data[i].name + "</strong></a></li></ul>");
                idCurrentCategory = data[i].id;
                $.ajax({
                    url: "/brands/" + idCurrentCategory,
                    type: "GET",
                    contentType: "application/json",
                    success: function (databrand) {
                        console.log(idCurrentCategory);
                        for (var j = 0; j < databrand.length; j++) {
                            $("#listBrand"+ databrand[j].categories.id).append("<li><a style='cursor: pointer'" +
                                "onclick='sortByBrand(" + databrand[j].id + ")'>" + databrand[j].brand + "</a></li>");
                        }
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

    $.ajax({
        url: "/products",
        type: "GET",
        contentType: "application/json",
        success: function (dataAll) {
            pageCount = dataAll.length/6;
            localStorage.setItem('currentPageCount', pageCount+1);
            var count_products = dataAll.length;
            $("#count-style").append("Усього товарів - <strong>" + count_products +"</strong>");
            $.ajax({
                url: "/products/pageable?page=0&size=6",
                type: "GET",
                contentType: "application/json",
                success: function (data) {
                    $("#block-tovar li").remove();
                    for (var i = 0; i < data.content.length; i++) {
                        $("#block-tovar").append("<li><p>" + data.content[i].title + "</p><center>" +
                            "<img src='/uploads_images/"+ data.content[i].image +
                            "' width=90px height=auto></center><p align='center' class='link-action'>" +
                            // "<button  class='deleteBtn btn btn-danger' type='button' name='" +
                            // data.content[i].id +"'>Видалити</button>" +
                            "<button  class='updateBtn btn btn-warning'" +
                            "type='button' name='" + data.content[i].id + "'>Змінити</button></p></li>");
                    }
                    pageCount = data.totalPages;
                    console.log(pageCount);
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

});

function sortByCategory(idCategory) {
    sortingBy = "category";
 //   $("#select-links").html("");
    sortingString = "byCategories/" + idCategory + "/";
    loadNewPage(0);
}

function sortByBrand(idBrand) {
    sortingBy = "brand";
   // $("#select-links").html("");
    sortingString = "byBrandes/" + idBrand + "/";
    loadNewPage(0);

}

function sortByAll() {
    sortingBy = "all";
    sortingString = "";
    loadNewPage(0);

}

$('#pagination-demo').twbsPagination({
    totalPages: pageCount,
    visiblePages: 5,
    next: 'Наступна',
    prev: 'Попередня',
    onPageClick: function (event, page) {
        console.log(pageCount);
        //fetch content and render here
        $('#page-content').text('Сторінка ' + page) + ' content here';
        loadNewPage(page-1);
    }
});

function loadNewPage(page) {
    $.ajax({
        url: "/products/" + sortingString + "pageable?page=" + page + "&size=6",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            switch (sortingBy) {
                case "all": $("#select-links").html("Усі товари");
                break;
                case "category": $("#select-links").html(data.content[0].brand.categories.name);
                break;
                case "brand": $("#select-links").html(data.content[0].brand.brand);
                break;
            }
            $("#block-tovar li").remove();
            for (var i = 0; i < data.content.length; i++) {
                $("#block-tovar").append("<li><p>" + data.content[i].title + "</p><center>" +
                    "<img src='/uploads_images/"+ data.content[i].image +
                    "' width=90px height=auto></center><p align='center' class='link-action'>" +
                    // "<button  class='deleteBtn btn btn-danger' type='button' name='" +
                    // data.content[i].id +"'>Видалити</button>" +
                    "<button  class='updateBtn btn btn-warning'" +
                    "type='button' name='" + data.content[i].id + "'>Змінити</button></p></li>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

}

var Ident;
var focusedButton;

$(document).on('click', 'button.deleteBtn', function () {
    var currentClickedButton = this;
    var idToDelete = currentClickedButton.name;
    console.log(this.name);
    $.ajax({
        url: "/products/" + idToDelete,
        type: "DELETE",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (user) {
            alert("delete");
            $(currentClickedButton).closest('li').remove();
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            redirectOnError(xhr);
        }
    });
});

$(document).on('click', 'button.updateBtn', function () {
    var currentClickedButton = this;
    var idToUpdate = currentClickedButton.name;
            localStorage.setItem('idTovarToUpdate', idToUpdate);
            window.open("/admin/edit_product", "_self");
});


