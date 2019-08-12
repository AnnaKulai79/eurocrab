var count_feedback = 0;

$(document).ready(function () {
    $("#link-nav").append("<a href='/admin/index' >Головна</a> \\ <a href='/admin/feedback' >Повідомлення</a>");
    $("#count-feedback").append(count_feedback);
    $.ajax({
        url: "/feedbacks",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (data) {
            count_feedback = data.length;
            $("#count-feedback").empty();
            $("#count-feedback").append(count_feedback);
            for (var i = 0; i < data.length ; i++) {
                var d = new Date(data[i].date);
                $("#block-feedback").append("<li><h3>" + data[i].subject + "</h3>  <h3>" + data[i].name + "</h3><span>" +
                    d.toLocaleDateString() + "</span>" + "<p>" + data[i].text + "</p>" +
                    "<p class='links-actions' align='right' ><button  class='deleteBtn btn btn-danger'" +
                    "type='button' name='" + data[i].id + "'>Видалити</button></p></li>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
});

$(document).on('click', 'button.deleteBtn', function () {
    var currentClickedButton = this;
    var idToDelete = currentClickedButton.name;
    $.ajax({
        url: "/feedbacks/" + idToDelete,
        type: "DELETE",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (news) {
            alert("delete");
            $(currentClickedButton).closest('li').remove();
            count_news--;
            $("#result-count").empty();
            $("#result-count").append(count_news);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
        }
    });
});
