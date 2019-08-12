$(document).ready(function () {
    $("#link-nav").append("<a href='/admin/index' >Головна</a> \\ <a href='/admin/admin' >Адміністратори</a>");
    $.ajax({
        url: "/administrators",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#list-admin").append("<li><h3>" + data[i].fio + "</h3><p><strong>Посада</strong> - " + data[i].role
                    + "</p><p><strong>E-mail</strong> - " + data[i].email + "</p><p>" +
                    "<strong>Телефон</strong> - " + data[i].phone + "</p><p class='links-actions' align='right'>" +
                    "<button  class='deleteBtn btn btn-danger' type='button' name='" +
                    data[i].id + "'>Видалити</button><button  class='updateBtn btn btn-warning'" +
                    "type='button' name='" + data[i].id + "'>Змінити</button></p></li>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

});

var Ident;
var focusedButton;

$(document).on('click', 'button.deleteBtn', function () {
    var currentClickedButton = this;
    var idToDelete = currentClickedButton.name;
    console.log(this.name);
    $.ajax({
        url: "/administrator/" + idToDelete,
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
    $.ajax({
        url: "/administrator/" + idToUpdate,
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (data) {
            localStorage.setItem('idAdminToUpdate', data.id);
            window.open("/admin/edit_admin", "_self");
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });


});


