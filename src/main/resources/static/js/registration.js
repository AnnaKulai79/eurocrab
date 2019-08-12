$("#saveUserBtn.add.btn.btn-primary").click(function () {
    var userToSave = {
        login : $("#reg_login").val(),
        pass : $("#reg_pass").val(),
        surname : $("#reg_surname").val(),
        name : $("#reg_name").val(),
        patronymic : $("#reg_patronymic").val(),
        email : $("#reg_email").val(),
        phone : $("#reg_phone").val(),
        address : $("#reg_address").val(),
        ip : localStorage.getItem("ipadd"),
        datetime : new Date()
    };

    $.ajax({
        url: "/user",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(userToSave),
        success: function (data) {
            $("#block-form-registration").fadeOut(300,function() {
                $("#reg_message").addClass("reg_message_good").fadeIn(400).html("Вітаємо, Ви успішно зареєстровані!");
                $("#saveUserBtn").hide();
                localStorage.setItem('currentCustomerUser', userToSave.login);
                localStorage.setItem('status-order', 'new');
            });
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.message);
        }
    });
});

$(document).ready(function() {
    $('#form_reg').validate(
        {
            // правила для перевірки
            rules:{
                "reg_login":{
                    required:true,
                    minlength:5,
                    maxlength:15,
                    // remote: {
                    //     type: "post",
                    //     url: "/reg/check_login.php"
                    // }
                },
                "reg_pass":{
                    required:true,
                    minlength:7,
                    maxlength:15
                },
                "reg_surname":{
                    required:true,
                    minlength:2,
                    maxlength:15
                },
                "reg_name":{
                    required:true,
                    minlength:2,
                    maxlength:15
                },
                "reg_patronymic":{
                    required:true,
                    minlength:2,
                    maxlength:25
                },
                "reg_email":{
                    required:true,
                    email:true
                },
                "reg_phone":{
                    required:true
                },
                "reg_address":{
                    required:true
                },
                "reg_captcha":{
                    required:true
                    // remote: {
                    //     type: "post",
                    //     url: "/reg/check_captcha.php"

                    // }

                }
            },

            // повідомлення при порушенні відповідних правил
            messages:{
                "reg_login":{
                    required:"Вкажіть Логін!",
                    minlength:"Від 5 до 15 символів!",
                    maxlength:"Від 5 до 15 символів!",
                    // remote: "Логін зайнятий!"
                },
                "reg_pass":{
                    required:"Вкажіть Пароль!",
                    minlength:"Від 7 до 15 символів!",
                    maxlength:"Від 7 до 15 символів!"
                },
                "reg_surname":{
                    required:"Вкажіть Ваше Прізвище!",
                    minlength:"Від 2 до 20 символів!",
                    maxlength:"Від 2 до 20 символів!"
                },
                "reg_name":{
                    required:"Вкажіть Ваше Ім'я!",
                    minlength:"Від 2 до 15 символів!",
                    maxlength:"Від 2 до 15 символів!"
                },
                "reg_patronymic":{
                    required:"Вкажіть Ваше по батькові!",
                    minlength:"Від 2 до 25 символів!",
                    maxlength:"Від 2 до 25 символів!"
                },
                "reg_email":{
                    required:"Вкажіть свій E-mail",
                    email:"Некоректний E-mail"
                },
                "reg_phone":{
                    required:"Вкажіть номер телефону!"
                },
                "reg_address":{
                    required:"Вкажіть адресу доставки!"
                },
                "reg_captcha":{
                    required:"Введіть код з малюнка!",
                    remote: "Не вірний код перевірки!"
                }
            },

            submitHandler: function(form){
                $(form).ajaxSubmit({
                    success: function(data) {

                        if (data == true)
                        {
                            $("#block-form-registration").fadeOut(300,function() {

                                $("#reg_message").addClass("reg_message_good").fadeIn(400).html("Вітаємо, Ви успішно зареєстровані!");
                                $("#form_submit").hide();

                            });

                        }
                        else
                        {
                            $("#reg_message").addClass("reg_message_error").fadeIn(400).html(data);
                        }
                    }
                });
            }
        });
});


var res;

function generate() {
    //clear the contents of captcha div first
    document.getElementById('block-captcha').innerHTML = "";
    var charsArray =
        "123456789abcdefghijklmnopqrstuvwxyz";
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
    canv.width = 130;
    canv.height = 45;
    var ctx = canv.getContext("2d");
    canv.style.webkitFilter = "blur(1.5px)";
    canv.style.filter = "blur(1.5px)";
    ctx.fillStyle = "rgba(99,32,238,1)";
    ctx.font = "bold 25px Vergana";
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
    if (document.getElementById("entre").value == res) {
    }else{

        generate();
    }

}
