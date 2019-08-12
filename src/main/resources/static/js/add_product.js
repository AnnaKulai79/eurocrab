var base64GalleryFiles = [];

function readImage(index) {
    var inputFile;
    inputFile = document.getElementById('galleryimg' + index).files;
    var notBase64Fil = inputFile[0];
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


function addInfo(object) {
    var notBase64UploadedFile = object.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(notBase64UploadedFile);
    reader.onload = function () {
        var base64File = reader.result;

        var id = $("#form_type").val().substring(9);
//        console.log(base64File);
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
                var brandNew = {
                    id: dataBrand.id,
                    type: dataBrand.type,
                    name: dataBrand.name
                };

                var tovarToSave = {
                    title: $("#nameTitle").val(),
                    price: $("#namePrice").val(),
                    brand: brandNew,
                    image: base64File,
                    seoWords: $("#nameSeoWords").val(),
                    seoDescription: $("#nameSeoDescription").val(),
                    miniDescription: $("#nameMiniDescription").val(),
                    description: $("#nameDescription").val(),
                    minifeatures: $("#nameMiniFeatures").val(),
                    features: $("#nameFeatures").val(),
                    datetime: new Date(),
                    newTovar: cb_new,
                    leader: cb_leader,
                    sale: cb_sale,
                    visible: cb_visible
                };

                $.ajax({
                    url: "/products",
                    type: "POST",
                    headers: {
                        'Authorize': "Bearer " + localStorage.getItem('token')
                    },
                    contentType: "application/json",
                    data: JSON.stringify(tovarToSave),
                    success: function (product) {
                        alert("Товар успішно доданий");
                        console.log(base64GalleryFiles);
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
                        // window.open("/admin/tovar", "_self");

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

    };
};



$(document).ready(function () {
    $("#link-nav").append("<a href='/admin/index' >Головна</a> \ <a href='/admin/tovar' >Товари</a> \ <a>Додання товару</a>");

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


