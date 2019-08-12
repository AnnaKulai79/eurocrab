$(document).ready(function () {
    $("#link-nav").append("<a href='/admin/index' >Головна</a> \\ <a href='/admin/edit_admin' >Редагування адміністраторів</a>");
    var idToUpdate = localStorage.getItem('idAdminToUpdate');
    var $view_orders = "unchecked";
    var $accept_orders = "unchecked";
    var $delete_orders = "unchecked";
    var $add_tovar = "unchecked";
    var $edit_tovar = "unchecked";
    var $delete_tovar = "unchecked";
    var $accept_reviews = "unchecked";
    var $delete_reviews = "unchecked";
    var $view_clients = "unchecked";
    var $delete_clients = "unchecked";
    var $add_news = "unchecked";
    var $delete_news = "unchecked";
    var $view_admin = "unchecked";
    var $add_category = "unchecked";
    var $delete_category = "unchecked";
    $('#select-all').click(function(){
        console.log(select - all);
        $(".privilege input:checkbox").attr('checked', true);
    });

    $('#remove-all').click(function(){
        console.log(remove-all);
        $(".privilege input:checkbox").attr('checked', false);
    });
    $.ajax({
        url: "/administrator/" + idToUpdate,
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (adminUpdate) {

    console.log(adminUpdate.viewOrders);

    if (adminUpdate.viewOrders) $view_orders = "checked";
    if (adminUpdate.acceptOrders) $accept_orders = "checked";
    if (adminUpdate.deleteOrders) $delete_orders = "checked";
    if (adminUpdate.addTovar) $add_tovar = "checked";
    if (adminUpdate.editTovar) $edit_tovar = "checked";
    if (adminUpdate.deleteTovar) $delete_tovar = "checked";
    if (adminUpdate.acceptReviews) $accept_reviews = "checked";
    if (adminUpdate.deleteReviews) $delete_reviews = "checked";
    if (adminUpdate.viewClients) $view_clients = "checked";
    if (adminUpdate.deleteClients) $delete_clients = "checked";
    if (adminUpdate.addNews) $add_news = "checked";
    if (adminUpdate.deleteNews) $delete_news = "checked";
    if (adminUpdate.viewAdmin) $view_admin = "checked";
    if (adminUpdate.addCategory) $add_category = "checked";
    if (adminUpdate.deleteCategory) $delete_category = "checked";

    $("#form-info").append("<ul id='info-admin'>" +
        "<li><label>Логін</label><input type='text' name='admin_login' id='admin_login' value=" + adminUpdate.login +" /></li>" +
        "<li><label>Пароль</label><input type='password' name='admin_pass' id='admin_pass' /></li>" +
        "<li><label>ПІБ</label><input type='text' name='admin_fio' id='admin_fio' value=" + adminUpdate.fio + " /></li>" +
        "<li><label>Посада</label><input type='text' name='admin_role' id='admin_role' value=" + adminUpdate.role + " /></li>" +
        "<li><label>E-mail</label><input type='text' name='admin_email' id='admin_email' value=" + adminUpdate.email + " /></li>" +
        "<li><label>Телефон</label><input type='text' name='admin_phone' id='admin_phone' value=" + adminUpdate.phone + " /></li></ul>" +
        "<h3 id='title-privilege' >Привілеї</h3>" +
        "<p id='link-privilege'><a id='select-all' onclick='chekked()'>Вибрати все</a> | <a id='remove-all' onclick='unchekked()'>Зняти все</a></p>" +
        "<div class='block-privilege'><ul class='privilege'><li><h3>Замовлення</h3></li>" +
        "<li><input type='checkbox' name='view_orders' id='view_orders' value='1' " + $view_orders + " />" +
        "<label for='view_orders'>Перегляд замовлень.</label></li>" +
        "<li><input type='checkbox' name='accept_orders' id='accept_orders' value='1' " + $accept_orders + " />" +
        "<label for='accept_orders'>Обробка замовлень.</label></li>" +
        "<li><input type='checkbox' name='delete_orders' id='delete_orders' value='1' " + $delete_orders + " />" +
        "<label for='delete_orders'>Видалення замовлень.</label></li></ul>" +
        "<ul class='privilege'><li><h3>Товари</h3></li>" +
        "<li><input type='checkbox' name='add_tovar' id='add_tovar' value='1' " + $add_tovar + " />" +
        "<label for='add_tovar'>Додання товарів.</label></li>" +
        "<li><input type='checkbox' name='edit_tovar' id='edit_tovar' value='1' " + $edit_tovar + " />" +
        "<label for='edit_tovar'>Редагування товарів.</label></li>" +
        "<li><input type='checkbox' name='delete_tovar' id='delete_tovar' value='1' " + $delete_tovar + " />" +
        "<label for='delete_tovar'>Видалення товарів.</label></li></ul>" +
        "<ul class='privilege'><li><h3>Відгуки</h3></li>" +
        "<li><input type='checkbox' name='accept_reviews' id='accept_reviews' value='1' " + $accept_reviews + " />" +
        "<label for='accept_reviews'>Модерація відгуків.</label></li>" +
        "<li><input type='checkbox' name='delete_reviews' id='delete_reviews' value='1' " + $delete_reviews + " />" +
        "<label for='delete_reviews'>Видалення відгуків.</label></li></ul></div>" +
        "<div class='block-privilege'><ul class='privilege'><li><h3>Клієнти</h3></li>" +
        "<li><input type='checkbox' name='view_clients' id='view_clients' value='1' " + $view_clients + " />" +
        "<label for='view_clients'>Перегляд клієнтів.</label></li>" +
        "<li><input type='checkbox' name='delete_clients' id='delete_clients' value='1' " + $delete_clients + " />" +
        "<label for='delete_clients'>Видалення клієнтів.</label></li></ul>" +
        "<ul class='privilege'><li><h3>Новини</h3></li>" +
        "<li><input type='checkbox' name='add_news' id='add_news' value='1' " + $add_news + " />" +
        "<label for='add_news'>Додання новин.</label></li>" +
        "<li><input type='checkbox' name='delete_news' id='delete_news' value='1' " + $delete_news + " />" +
        "<label for='delete_news'>Видалення новин.</label></li></ul>" +
        "<ul class='privilege'><li><h3>Категорії</h3></li>" +
        "<li><input type='checkbox' name='add_category' id='add_category' value='1' " +$add_category + " />" +
        "<label for='add_category'>Додання категорій.</label></li>" +
        "<li><input type='checkbox' name='delete_category' id='delete_category' value='1' " + $delete_category + " />" +
        "<label for='delete_category'>Видалення категорій.</label></li></ul></div>" +
        "<div class='block-privilege'><ul class='privilege'><li><h3>Адміністратори</h3></li>" +
        "<li><input type='checkbox' name='view_admin' id='view_admin' value='1' " + $view_admin + " />" +
        "<label for='view_admin'>Перегляд адміністраторів.</label></li></ul></div>" +
        "<p align='right'><button class='updateBtn btn btn-warning' type='button' id='updateAdminBtn'>Змінити</button></p>");
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
});

$(document).on('click', 'button.updateBtn', function () {
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
    if ($('#delete_orders').is(":checked")) { cb_delete_orders = true; };
    if ($('#add_tovar').is(":checked")) { cb_add_tovar = true; };
    if ($('#edit-tovar').is(":checked")) { cb_edit_tovar = true; };
    if ($('#delete_tovar').is(":checked")) { cb_delete_tovar = true; };
    if ($('#accept_reviews').is(":checked")) { cb_accept_reviews = true; };
    if ($('#delete_reviews').is(":checked")) { cb_delete_reviews = true; };
    if ($('#view_clients').is(":checked")) { cb_view_clients = true; };
    if ($('#delete_clients').is(":checked")) { cb_delete_clients = true; };
    if ($('#add_news').is(":checked")) { cb_add_news = true; };
    if ($('#delete_news').is(":checked")) { cb_delete_news = true; };
    if ($('#add_category').is(":checked")) { cb_add_category = true; };
    if ($('#delete_category').is(":checked")) { cb_delete_category = true; };
    if ($('#view_admin').is(":checked")) { cb_view_admin = true; };

    var adminToUpdate = {
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
        url: "/administrator/" + localStorage.getItem('idAdminToUpdate'),
        type: "PUT",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        data: JSON.stringify(adminToUpdate),
        success: function (data) {
            alert("Адміністратора успішно оновлено");
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

});

function unchekked() {
    console.log('remove-all');
    $(".privilege input:checkbox").attr('checked', false);

}

function chekked() {
    console.log('select-all');
    $(".privilege input:checkbox").attr('checked', true);

}
