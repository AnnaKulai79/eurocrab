var count_ipadd = 0;

$(document).ready(function () {
    $("#link-nav").append("<a href='/admin/index' >Головна</a> \\ <a href='/admin/ipadd' >Відвідування</a>");
    $("#result-count").append(count_ipadd);
    $.ajax({
        url: "/ipadd",
        type: "GET",
        contentType: "application/json",
        headers: {
            'Authorize': "Bearer " + localStorage.getItem('token')
        },
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                count_ipadd += data.count;
            }
            $("#result-count").empty();
            $("#result-count").append(count_ipadd);
            $("#result-count-ipadd").empty();
            $("#result-count-ipadd").append(data.length);
            for (var i = 0; i < data.length ; i++) {
                $("#block-feedback").append("<li><h3>" + data[i].ip + "</h3>  <span>" +
                    data.count + "</span>");
            }
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
});
