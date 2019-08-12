var base64GalleryFiles = [];

function readImage(index) {
    var inputFile;
    inputFile = document.getElementById('galleryimg' + index).files;
    var notBase64Fil = inputFile[0];
    console.log(notBase64Fil);
    var reader = new FileReader();
    reader.readAsDataURL(notBase64Fil);
    reader.onload = function () {
        base64GalleryFiles[index] = reader.result;
        console.log(base64GalleryFiles[index]);
    }
};

function deleteImgGal(rel){
    $("#addimage"+rel).fadeOut(300,function(){
        $("#addimage"+rel).remove();
    });
    base64GalleryFiles[rel] = null;
};

function deleteGalImg(idImage) {
    $.ajax({
        url: "/upload_images/" + idImage,
        type: "DELETE",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (data) {
            $("#del" + idImage).remove();
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
        }
    });

}

var productImage;

$(document).ready(function () {
    $checked1 = "unchecked";
    $checked2 = "unchecked";
    $checked3 = "unchecked";
    $checked4 = "unchecked";
    var idToUpdate = localStorage.getItem('idTovarToUpdate');
    $.ajax({
        url: "/products/" + idToUpdate,
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (productUpdate) {
            console.log(productUpdate.visible);
            if (productUpdate.visible) $checked1 = "checked";
            if (productUpdate.newTovar) $checked2 = "checked";
            if (productUpdate.leader) $checked3 = "checked";
            if (productUpdate.sale) $checked4 = "checked";
            productImage = productUpdate.image;
            $("#form-edit-product").append("<ul id='edit-tovar'>" +
        "<li><label>Назва товару</label>" +
        "<input type='text' name='form_title' id='form_title' value='" + productUpdate.title + "' /></li>" +
        "<li><label>Ціна</label>" +
        "<input type='text' name='form_price' id='form_price' value='" + productUpdate.price + "' /></li>" +
        "<li><label>Ключові слова</label>" +
        "<input type='text' name='form_seo_words' id='form_seo_words' value='" + productUpdate.seoWords + "' /></li>" +
        "<li><label>Стислий опис</label>" +
        "<textarea name='form_seo_description' id='form_seo_description'>" + productUpdate.seoDescription + "</textarea></li>" +
        "<li><label>Тип товару</label>" +
        "<select name='form_type' id='form_type' size='1' >" +
        "<option value='form_type" + productUpdate.brand.id + "'>" + productUpdate.brand.categories.type +
                " - " + productUpdate.brand.brand + "</option></select></li>" +
        "<li><label>Стислий опис товару</label>" +
        "<textarea id='form_mini_description' name='form_mini_description'>" + productUpdate.miniDescription +
                "</textarea></li>" +
        "<li><label>Опис товару</label>" +
        "<textarea id='form_description' name='form_description'>" + productUpdate.description + "</textarea></li>" +
        "<li><label>Стислі характеристики</label>" +
        "<textarea id='form_mini_features' name='form_mini_features'>" + productUpdate.minifeatures + "</textarea></li>" +
        "<li><label>Характеристики</label>" +
        "<textarea id='form_features' name='form_features'>" + productUpdate.features + "</textarea></li></ul>" +
        "<label class='stylelabel' >Основна картинка</label><div id='baseimg'>" +
        "<img src='/uploads_images/"+ productUpdate.image + "' width=auto height=110px >" +
        "<a style='cursor: pointer' onclick='deleteImage(" + productUpdate.id + ")' ></a></div>" +
        "<label class='stylelabel' >Галерея картинок</label><div id='objects' ><ul id='gallery-img'></ul>" +
        "<div id='addimage1' class='addimage'><input type='file' onchange='readImage(1)' id='galleryimg1' " +
        "name='upload_image' /></div></div><p id='add-input' onclick='addInput()' >Додати</p>" +
        "<h3 class='h3title' >Настройки товару</h3>" +
        "<ul id='chkbox'>" +
        "<li><input type='checkbox' name='chk_visible' id='chk_visible' " + $checked1 + "/>" +
                "<label for='chk_visible' >Показувати товар</label></li>" +
        "<li><input type='checkbox' name='chk_new' id='chk_new' " + $checked2 + " />" +
                "<label for='chk_new' >Новий товар</label></li>" +
        "<li><input type='checkbox' name='chk_leader' id='chk_leader' " + $checked3 + " />" +
                "<label for='chk_leader' >Популярний товар</label></li>" +
        "<li><input type='checkbox' name='chk_sale' id='chk_sale' " + $checked4 + " />" +
                "<label for='chk_sale' >Товар зі скидкою</label></li></ul>" +
        "<p align='right'><button class='updateBtn btn btn-warning' type='button' id='updateProductBtn'>Змінити</button></p>");
            $.ajax({
                url: "/upload_images/" + idToUpdate,
                type: "GET",
                contentType: "application/json",
                success: function (imagesData) {
                    for (var k = 0; k < imagesData.length; k++) {
                        $("#gallery-img").append("<li id='del" + imagesData[k].id + "' >" +
                            "<img src='/uploads_images/"+ imagesData[k].image + "' width=auto height=110px " +
                            "title='"+ imagesData[k].image + "' />" +
                            "<a class='del-img' img_id=" + imagesData[k].id + " onclick='deleteGalImg(" + imagesData[k].id + ")' ></a></li>");
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
    $.ajax({
        url: "/category/brands",
        type: "GET",
        headers: {
            'Authorize' : "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#form_type").append("<option value='form_type" + data[i].id + "'>" + data[i].type + " - " + data[i].brand + "</option>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

});

var count_input = 1;

function addInput() {
        count_input++;
        $('<div id="addimage'+count_input+'" class="addimage"><input type="file" onchange="readImage('+ count_input +')" id="galleryimg'+count_input+'" name="upload_image"/><a style="cursor: pointer" onclick="deleteImgGal('+count_input+')" class="delete-input" rel="'+count_input+'" >Видалити</a></div>').fadeIn(300).appendTo('#objects');
}

$(document).on('click', 'button.updateBtn', function () {
    var base64File = 'nothingChange';
    if(actionDeleteImg) {
        var object = document.getElementById('nameUploadImage');
        var notBase64UploadedFile = object.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(notBase64UploadedFile);
    reader.onload = function () {
        base64File = reader.result;
    };
    }

    var id = $("#form_type").val().substring(9);

        var cb_sale = false;
        var cb_new = false;
        var cb_visible = false;
        var cb_leader = false;
        if ($('#chk_sale').is(":checked")) {
            cb_sale = true;
        }
        ;
        if ($('#chk_new').is(":checked")) {
            cb_new = true;
        }
        ;
        if ($('#chk_leader').is(":checked")) {
            cb_leader = true;
        }
        ;
        if ($('#chk_visible').is(":checked")) {
            cb_visible = true;
        }
        ;


        $.ajax({
            url: "/brand/" + id,
            type: "GET",
            headers: {
                'Authorize': "Bearer " + localStorage.getItem('token')
            },
            contentType: "application/json",
            success: function (dataBrand) {
                console.log("databrand+++");
                var brandNew = {
                    id: dataBrand.id,
                    type: dataBrand.type,
                    name: dataBrand.name
                };
                    var tovarToUpdate = {
                        title: $("#form_title").val(),
                        price: $("#form_price").val(),
                        brand: brandNew,
                        image: base64File,
                        seoWords: $("#form_seo_words").val(),
                        seoDescription: $("#form_seo_description").val(),
                        miniDescription: $("#form_mini_description").val(),
                        description: $("#form_description").val(),
                        minifeatures: $("#form_mini_features").val(),
                        features: $("#form_features").val(),
                        datetime: new Date(),
                        newTovar: cb_new,
                        leader: cb_leader,
                        sale: cb_sale,
                        visible: cb_visible
                    };

                $.ajax({
                    url: "/products/" + localStorage.getItem('idTovarToUpdate'),
                    type: "PUT",
                    headers: {
                        'Authorize': "Bearer " + localStorage.getItem('token')
                    },
                    contentType: "application/json",
                    data: JSON.stringify(tovarToUpdate),
                    success: function (product) {
                        alert("Товар успішно оновлено");
                        if(base64GalleryFiles.length) {
                            for (var j = 0; j < base64GalleryFiles.length; j++) {
                                if(base64GalleryFiles[j]) {
                                    var imageToSave = {
                                        image: base64GalleryFiles[j],
                                        products: product
                                    };
                                    $.ajax({
                                        url: "/upload_images",
                                        type: "POST",
                                        headers: {
                                            'Authorize': "Bearer " + localStorage.getItem('token')
                                        },
                                        contentType: "application/json",
                                        data: JSON.stringify(imageToSave),
                                        success: function (data) {
                                            alert("В галлерею успішно додано - " + data.image + "from");
                                        },
                                        error: function (xhr, status, error) {
                                            var err = eval("(" + xhr.responseText + ")");
                                            alert(err.message);
                                        }
                                    });
                                }
                            }
                        }

                        window.open("/admin/tovar", "_self");

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

$(document).on('click', '#form_type', function () {
    console.log("uraaaaaaaaa");
    $.ajax({
        url: "/category/brands",
        type: "GET",
        headers: {
            'Authorize' : "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (data) {
            $("#form_type").empty();
            for (var i = 0; i < data.length; i++) {
                $("#form_type").append("<option value='form_type" + data[i].id + "'>" + data[i].type + " - " + data[i].brand + "</option>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });


});

var actionDeleteImg = false;

function deleteImage(idProduct) {
    actionDeleteImg = true;
    $("#baseimg").html('<div id="baseimg-upload"><input type="hidden" name="MAX_FILE_SIZE" value="5000000"/>' +
        '<input type="file" id="nameUploadImage" name="upload_image" /></div>');
}