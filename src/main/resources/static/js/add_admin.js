$("#saveAdminBtn.add.btn.btn-primary").click(function () {
    var cb_view_orders = false;
    var cb_accept_orders = false;
    var cb_delete_orders = false;
    var cb_add_tovar = false;
    var cb_edit_tovar = false;
    var cb_delete_tovar = false;
    var cb_accept_reviews = false;
    var cb_delete_reviews = false;
    var cb_view_clients = false;
    var cb_delete_clients = false;
    var cb_add_news = false;
    var cb_delete_news = false;
    var cb_add_category = false;
    var cb_delete_category = false;
    var cb_view_admin = false;
    if ($('#view_orders').is(":checked")) { cb_view_orders = true; };
    if ($('#accept_orders').is(":checked")) { cb_accept_orders = true; };
    if ($('#delete_orders').is(":checked")) {
        cb_delete_orders = true;
    }
    ;
    if ($('#add_tovar').is(":checked")) {
        cb_add_tovar = true;
    }
    ;
    if ($('#edit-tovar').is(":checked")) {
        cb_edit_tovar = true;
    }
    ;
    if ($('#delete_tovar').is(":checked")) {
        cb_delete_tovar = true;
    }
    ;
    if ($('#accept_reviews').is(":checked")) {
        cb_accept_reviews = true;
    }
    ;
    if ($('#delete_reviews').is(":checked")) {
        cb_delete_reviews = true;
    }
    ;
    if ($('#view_clients').is(":checked")) {
        cb_view_clients = true;
    }
    ;
    if ($('#delete_clients').is(":checked")) {
        cb_delete_clients = true;
    }
    ;
    if ($('#add_news').is(":checked")) {
        cb_add_news = true;
    }
    ;
    if ($('#delete_news').is(":checked")) {
        cb_delete_news = true;
    }
    ;
    if ($('#add_category').is(":checked")) {
        cb_add_category = true;
    }
    ;
    if ($('#delete_category').is(":checked")) {
        cb_delete_category = true;
    }
    ;
    if ($('#view_admin').is(":checked")) {
        cb_view_admin = true;
    }
    ;

    var adminToSave = {
        login: $("#admin_login").val(),
        pass: $("#admin_pass").val(),
        fio: $("#admin_fio").val(),
        role: $("#admin_role").val(),
        email: $("#admin_email").val(),
        phone: $("#admin_phone").val(),
        viewOrders: cb_view_orders,
        acceptOrders: cb_accept_orders,
        deleteOrders: cb_delete_orders,
        addTovar: cb_add_tovar,
        editTovar: cb_edit_tovar,
        deleteTovar: cb_delete_tovar,
        acceptReviews: cb_accept_reviews,
        deleteReviews: cb_delete_reviews,
        viewClients: cb_view_clients,
        deleteClients: cb_delete_clients,
        addNews: cb_add_news,
        deleteNews: cb_delete_news,
        addCategory: cb_add_category,
        deleteCategory: cb_delete_category,
        viewAdmin: cb_view_admin
    };

    $.ajax({
        url: "/administrator",
        type: "POST",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        data: JSON.stringify(adminToSave),
        success: function (data) {
            alert("Адміністратор успішно доданий");
            window.open("/admin/admin", "_self");

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

});


$(document).ready(function () {
    $("#link-nav").append("<a href='/admin/index' >Головна</a> \ <a href='/admin/add_admin' >Додання адміністратора</a>");

});


