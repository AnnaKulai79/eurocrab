$(document).ready(function() {
    $("#welcomeField").html("Ви - <h6 >" + localStorage.getItem('currentUser') + "</h6>");
        $.ajax({
            url: "/orders",
            type: "GET",
            headers: {
                'Authorize': "Bearer " + localStorage.getItem('token')
            },
            contentType: "application/json",
            success: function (allOrders) {
                $("#count-orders").append(allOrders.length);

            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });
        $.ajax({
            url: "/reviews",
            type: "GET",
            headers: {
                'Authorize': "Bearer " + localStorage.getItem('token')
            },
            contentType: "application/json",
            success: function (allReviews) {
                $("#count-reviews").append(allReviews.length);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });
        $.ajax({
            url: "/feedbacks",
            type: "GET",
            headers: {
                'Authorize': "Bearer " + localStorage.getItem('token')
            },
            contentType: "application/json",
            success: function (allFeedback) {
                $("#count-feedback").append(allFeedback.length);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });
        $.ajax({
            url: "/ipadd",
            type: "GET",
            headers: {
                'Authorize': "Bearer " + localStorage.getItem('token')
            },
            contentType: "application/json",
            success: function (data) {
                var count_ipadd = 0;
                for (var i = 0; i < data.length; i++) {
                    count_ipadd += data.count;
                }
                $("#count-ipadd").append(count_ipadd);
            },
            error: function (xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.message);
            }
        });
    // <TH>Дата</TH>
    // <TH>Товар</TH>
    // <TH>Ціна</TH>
    // <TH>Статус</TH>



    $('.delete').click(function(){

        var rel = $(this).attr("rel");

        $.confirm({
            'title'		: 'Підтвердження видалення',
            'message'	: 'Після видалення відновлення буде неможливе! Продовжити?',
            'buttons'	: {
                'Так'	: {
                    'class'	: 'blue',
                    'action': function(){
                        location.href = rel;
                    }
                },
                'Ні'	: {
                    'class'	: 'gray',
                    'action': function(){}
                }
            }
        });

    });

    $('#select-links').click(function(){
        $("#list-links,#list-links-sort").slideToggle(200);
    });


    $('.h3click').click(function(){
        $(this).next().slideToggle(400);
    });


    var count_input = 1;

    $("#add-input").click(function(){

        count_input++;

        // $('<div id="addimage'+count_input+'" class="addimage"><input type="hidden" name="MAX_FILE_SIZE" value="2000000"/><input type="file" name="galleryimg[]"/><a class="delete-input" rel="'+count_input+'" >Видалити</a></div>').fadeIn(300).appendTo('#objects');
        $('<div id="addimage'+count_input+'" class="addimage"><input type="hidden" name="MAX_FILE_SIZE" value="2000000"/><input type="file" onchange="readImage('+ count_input +')" id="galleryimg'+count_input+'" name="upload_image"/><a style="cursor: pointer" onclick="deleteImgGal('+count_input+')" class="delete-input" rel="'+count_input+'" >Видалити</a></div>').fadeIn(300).appendTo('#objects');

    });

    $('.delete-input').click(function(){

        var rel = $(this).attr("rel");
        console.log($("#addimage" + rel));

        $("#addimage"+rel).fadeOut(300,function(){
            $("#addimage"+rel).remove();
        });

    });

    // $('.del-img').click(function(){
    //     var img_id = $(this).attr("img_id");
    //     var title_img = $("#del"+img_id+" > img").attr("title");
    //
    //     $.ajax({
    //         type: "POST",
    //         url: "./actions/delete-gallery.php",
    //         data: "id="+img_id+"&title="+title_img,
    //         dataType: "html",
    //         cache: false,
    //         success: function(data) {
    //             if (data == "delete")
    //             {
    //                 $("#del"+img_id).fadeOut(300);
    //             }
    //         }
    //
    //     });
    //
    // });
    //

    $('.delete-cat').click(function(){

        // var selectid = $("#cat_type option:selected").val();
        //
        // if (!selectid)
        // {
        //     $("#cat_type").css("borderColor","#F5A4A4");
        // }else
        // {
        //     $.ajax({
        //         type: "POST",
        //         url: "./actions/delete-category.php",
        //         data: "id="+selectid,
        //         dataType: "html",
        //         cache: false,
        //         success: function(data) {
        //
        //             if (data == "delete")
        //             {
        //                 $("#cat_type option:selected").remove();
        //             }
        //         }
        //     });
        // }

    });

    $('.block-clients').click(function(){

        $(this).find('ul').slideToggle(300);
        $(this).find('ul').show();


    });


    $('#select-all').click(function(){
        $(".privilege input:checkbox").attr('checked', true);
    });

    $('#remove-all').click(function(){
        $(".privilege input:checkbox").attr('checked', false);
    });





});

