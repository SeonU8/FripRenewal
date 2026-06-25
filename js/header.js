$(() => {
    const gnb = function(){
        const $gnb = $(".gnb");
        const $gnb_bg = $(".gnb_bg");
        const $depth2 = $(".gnb_2depth");
        const $pad = $(".gnb_hover_pad");
        const $main = $("#main");

        $gnb.hover(
            function () {
                $gnb_bg.stop().slideDown();
                $depth2.stop().fadeIn();
                $pad.show();
                $main.addClass("blur");
            },
            function() {
                $gnb_bg.stop().slideUp();
                $depth2.stop().fadeOut();
                $pad.hide();
                $main.removeClass("blur");
            }
        );
    };

    const loginCheck = () => {

        const login = localStorage.getItem("login");
        const user = localStorage.getItem("user");

        if(login === "true" && user){
            $(".user_name").text(user + "님");
        }
    };

    const mypageCheck = () => {

        $(".my a").on("click", function(e){

            e.preventDefault();

            const login = localStorage.getItem("login");

            if(login === "true"){
                location.href = "my.html";
            }else{
                location.href = "login.html";
            }

        });

    };
    
    const loginUI = () => {

        const login = localStorage.getItem("login");

        if(login === "true"){
            $(".user_name").text("frip님");
        }

    };

    $('.skip_menu a').on('click', function(e) {
        e.preventDefault();

        var target = $(this).attr('href');

        var offsetTop = $(target).offset().top;

        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 600);
    });

    $('.ready_no').on('click', function(e) {
        e.preventDefault();
        alert("본 페이지는 미생성 페이지입니다.\n메인 화면과 구현된 페이지 위주로 감상해 주세요! 감사합니다.");
    });

    $('a[href="#"], a[href="#none"]').on('click', function(e) {
        e.preventDefault();
        alert("준비 중인 기능입니다.");
    });

    gnb();
    loginCheck();
    mypageCheck();
    loginUI();
});
