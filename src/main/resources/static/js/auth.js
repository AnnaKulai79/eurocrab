$("#top-auth.top-auth").click(function () {
    var statusTopAuth = $('#top-auth').attr("name");
    console.log("ggggggggg");
    if (statusTopAuth == "") {
        $("#top-auth").attr("name", "active-button");
        $("#block-top-auth").fadeIn(200);
    } else {
        $("#top-auth").attr("name", "");
        $("#block-top-auth").fadeOut(200);
    }
});
