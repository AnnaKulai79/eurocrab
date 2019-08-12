function loadingPage() {
    $("#link-nav").html("<a href='/admin/index' >Головна</a> \\ <a href='/admin/clients' >Клієнти</a>");
    $("#welcomeField").html("Ви - <h6 >" + localStorage.getItem('currentUser') + "</h6>");

}

$(document).ready(function () {
    // $("#link-nav").html("<a href='/admin/index' >Головна</a> \\ <a href='/admin/clients' >Клієнти</a>");
    // $("#welcomeField").html("Ви - <h6 >" + localStorage.getItem('currentUser') + "</h6>");

    $.ajax({
        url: "/user",
        type: "GET",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (users) {
            $("#countClients").html(users.length);
            for (var i = 0; i < users.length; i++) {
                var dateUser = new Date(users[i].datetime);
                $("#block-content").append("<div class='block-clients'>" +
                    "<p class='client-datetime' >" + dateUser.toLocaleString() + "</p>" +
                    "<p class='client-email'  onclick='showUserInfo(" + users[i].id + ")'><strong>" + users[i].email +
                    "</strong></p>" +
                    "<p class='client-links' ><a class='delete' onclick='showModalWindow(" + users[i].id + ")' >Видалити</a></p>" +
                    "<ul id='infoUser" + users[i].id + "'><li><strong>E-Mail</strong> - " + users[i].email + "</li>" +
                    "<li><strong>ПІБ</strong> - " + users[i].surname + " " + users[i].name + " " + users[i].patronymic + "</li>" +
                    "<li><strong>Адреса</strong> - " + users[i].address + "</li>" +
                    "<li><strong>Телефон</strong> - " + users[i].phone + "</li>" +
                    "<li><strong>IP</strong> - " + users[i].ip + "</li>" +
                    "<li><strong>Дата регістрації</strong> - " + dateUser.toLocaleString() + "</li></ul></div>");
            }
        },
    });


});

var currentIdUserToDelete = "";

function showModalWindow(idUser) {
    currentIdUserToDelete = idUser;
    $('.myModalWindow').fadeIn();
}
function clickNo() {
    currentIdUserToDelete = '';
    $('.myModalWindow').fadeOut();
}

function deleteUser() {
    $('.myModalWindow').fadeOut();
    $.ajax({
        url: "/user/" + currentIdUserToDelete,
        type: "DELETE",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        contentType: "application/json",
        success: function (data) {
            currentIdUserToDelete = "";
            $("#block-content").empty();
            $("#block-content").append("</br><h5 style='margin-left: 15px'>Користувача було успішно видалено</h5>");
         },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
}
function showUserInfo(id) {
    $("#infoUser" + id).slideToggle(300);

}

