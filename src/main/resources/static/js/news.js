var count_news = 0;

$(document).ready(function () {
    $("#link-nav").append("<a href='/admin/index' >Головна</a> \\ <a href='/admin/news' >Новини</a>");
    $("#result-count").append(count_news);
    $.ajax({
        url: "/news",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (data) {
            count_news = data.length;
            $("#result-count").empty();
            $("#result-count").append(count_news);
            for (var i = 0; i < data.length ; i++) {
                var d = new Date(data[i].date);
                $("#block-news").append("<li><h3>" + data[i].title + "</h3><span>" + d.toLocaleDateString() + "</span>" +
                    "<p>" + data[i].text + "</p>" +
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
        url: "/news/" + idToDelete,
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

$("#saveBtn.add.btn.btn-primary").click(function () {
    var newsToSave = {
        title : $("#nameTitle").val(),
        text : $("#nameText").val(),
        date : new Date()
    };
    $.ajax({
        url: "/news",
        type: "POST",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        data: JSON.stringify(newsToSave),
        success: function (data) {
            if(data!=null) {
                var d = new Date(data.date);
                $("#block-news").append("<li><h3>" + data.title + "</h3><span>" + d.toLocaleDateString() + "</span>" +
                    "<p>" + data.text + "</p>" +
                    "<p class='links-actions' align='right' ><button  class='deleteBtn btn btn-danger'" +
                    "type='button' name='" + data.id + "'>Видалити</button></p></li>");
                count_news++;
                $("#result-count").empty();
                $("#result-count").append(count_news);
                $("#nameTitle").val(null);
                $("#nameText").val(null);
                $.fancybox.close();
            };
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
});

