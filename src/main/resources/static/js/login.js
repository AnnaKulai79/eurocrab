$("#submit_enter").click(function () {

    var admin = {
        login: $("#input_login").val(),
        pass: $("#input_pass").val()
    }
    $.ajax({
        url: "/loginadmin",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(admin),
        success: function (tokenData) {
            alert("+");
            localStorage.setItem('currentUser', admin.login);
            localStorage.setItem('token', tokenData);
            $.ajax({
                url: "/admin/index",
                type: "GET",
                contentType: "application/json",
                success: function (htmlPage) {
                    document.documentElement.innerHTML = htmlPage;
                    window.history.pushState("", "", '/admin/index');
                    location.reload();
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


});


$(document).ready(function() {
    localStorage.setItem('currentUser', null);
    localStorage.setItem('token', null);
});