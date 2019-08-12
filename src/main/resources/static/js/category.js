function addCategory(object) {
    var notBase64UploadedFile = object.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(notBase64UploadedFile);
    console.log(notBase64UploadedFile);
    reader.onload = function () {
        var base64File = reader.result;
        console.log(base64File);
        console.log($("#nameUploadIcon").val())
        var categoryBrandToSave = {
            type: $("#nameCategory").val(),
            name: $("#nameCategoryName").val(),
            brand: $("#nameBrand").val(),
            icon: base64File
        };

        $.ajax({
            url: "/category",
            type: "POST",
            contentType: "application/json",
            headers: {
                'Authorize': "Bearer " + localStorage.getItem('token')
            },
            data: JSON.stringify(categoryBrandToSave),
            success: function (data) {
                if (data != null) {
                    $("#cat_type").append("<option  value='cat_type|" + data.id + "'>" + data.type + " - " + data.brand + "</option>");
                    $("#nameCategory").val(null);
                    $("#nameCategoryName").val(null);
                    $("#nameBrand").val(null)
                }
                ;
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });
    }
};

$("#deleteBtn").click(function () {

    var optionSelected = $("#cat_type option:selected");
    var idToDelete = optionSelected.val().split("|")[1];
    console.log(optionSelected);
    console.log(idToDelete);
    $.ajax({
        url: "/category/" + idToDelete,
        type: "DELETE",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (user) {
            $("#cat_type option:selected").remove();
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

});

function showLinkNav() {
    $("#link-nav").append("<a href='/admin/index' >Головна</a> \\ <a href='/admin/categories' >Категорії</a>");

}

$(document).ready(function () {
    $.ajax({
        url: "/category/brands",
        type: "GET",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                 $("#cat_type").append("<option value='cat_type|" + data[i].id + "'>" + data[i].type + " - " + data[i].brand + "</option>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

});

