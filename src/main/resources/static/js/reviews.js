function loadingPage() {
    $("#welcomeField").append("Ви - <h6 >" + localStorage.getItem('currentUser') + "</h6>");
    $("#link-nav").append("<a href='/admin/index' >Головна</a> \\ <a href='/admin/reviews' >Новини</a>");
    $.ajax({
        url: "/reviews",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (data) {
            var noAccept = 0;
            for (var i = 0; i < data.length ; i++) {
                if(!data[i].moderat) {
                    noAccept++;
                }
            }
            $("#all-count-result strong").html(data.length);
            $("#no-accept-count-result strong").html(noAccept);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });

}
$(document).ready(function () {
    $.ajax({
        url: "/reviews",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (data) {
            var noAccept = 0;
            var $link_accept = "";
            for (var i = 0; i < data.length ; i++) {
                console.log(data[i].moderat);
                if(!data[i].moderat) {
                    noAccept++;
                    $link_accept = "<a class='green' style='cursor: pointer' onclick='acceptReviews(" + data[i].id + ")'" +
                        " id='acceptReview" + data[i].id + "' >Прийняти</a> |";
                }
                var d = new Date(data[i].date);
                $(".block-reviews").append("<div id='rowReviews" + data[i].id + "'><div class='block-title-img'><p>" + data[i].products.title + "</p><center>" +
                    "<img src='/uploads_images/" + data[i].products.image +"' width=150px height=auto /></center></div>" +
                    "<p class='author-date'><strong>" + data[i].name + "</strong>" + d.toLocaleDateString() + "</p>" +
                    "<div class='plus-minus'><img src='/images/plus16.png'/><p>" + data[i].goodReviews + "</p>" +
                    "<img src='/images/minus16.png'/><p>" + data[i].badReviews + "</p></div>" +
                    "<p class='reviews-comment' >" + data[i].comment + "</p><p class='links-actions' align='right' >" +
                    $link_accept + "<a class='delete' onclick='deleteReviews(" + data[i].id + ")'>Видалити</a> </p></div>");
            }
            $("#all-count-result strong").html(data.length);
            $("#no-accept-count-result strong").html(noAccept);
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
});

function deleteReviews(idToDelete) {
    $.ajax({
        url: "/reviews/" + idToDelete,
        type: "DELETE",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (data) {
            $("#rowReviews" + idToDelete).remove();
            loadingPage();
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
        }
    });
};

function acceptReviews(idToUpdate) {
    $.ajax({
        url: "/reviews/" + idToUpdate,
        type: "PUT",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (data) {
            $("#acceptReview" + idToUpdate).remove();
            loadingPage();
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
};

