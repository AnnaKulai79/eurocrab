$("#saveFeedBack.add.btn.btn-primary").click(function () {
    var messageToSave = {
        name : $("#feed_name").val(),
        email : $("#feed_email").val(),
        subject : $("#feed_subject").val(),
        text : $("#feed_text").val(),
        date : new Date()
    };

    $.ajax({
        url: "/feedbacks",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(messageToSave),
        success: function (data) {
            $("#block-content").empty();
            $("#block-content").append("<h3>Ваше повідомлення успішно надіслане</h3>");

        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
});

$(document).ready(function() {

});


var res;

function generate() {
    //clear the contents of captcha div first
    document.getElementById('block-captcha').innerHTML = "";
    var charsArray =
        "123456789acefghijklmnpqrstuvwxyz";
    var lengthOtp = 5;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        var index = Math.floor(Math.random() * charsArray.length + 1);
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "block-captcha";
    canv.width = 80;
    canv.height = 35;
    var ctx = canv.getContext("2d");
    canv.style.webkitFilter = "blur(1.5px)";
    canv.style.filter = "blur(1.5px)";
    ctx.fillStyle = "rgba(99,32,238,1)";
    ctx.font = "bold 30px Vergana";
    ctx.alignItems = "center";
    ctx.fillText(captcha.join(""), 0, 30);
    var nLines = Math.floor( Math.random() * 40 ) + 25;
    ctx.moveTo(0 , 0);
    for (var i=0;i<nLines;i++){
        ctx.lineTo(Math.random()*150,Math.random()*250);
    }
    ctx.lineWidth = 5;
    ctx.strokeStyle = "rgba(99,32,238,0.5)";
    ctx.stroke();
    res = captcha.join("");
    document.getElementById("block-captcha").appendChild(canv);
}

function verifyCaptcha() {
    if (document.getElementById("entref").value == res) {
    }else{

        generate();
    }

}
