$(()=>{
    $(".login_button").on('click', function(e) {
        const userId = $(".id input").val().trim();
        const userPwd = $(".pwd input").val().trim();
        const $errMsge = $('.login_err');

        $errMsge.text("");

        if (userId === "") {
            alert("아이디 또는 이메일을 입력해주세요.");
            $(".id input").focus();
            return false;
        }

        if (userPwd === "") {
            alert("비밀번호를 입력해주세요.");
            $(".pwd input").focus();
            return false;
        }

        if (userId !== "frip") {
            $errMsge.text("존재하지 않는 아이디입니다.");
            $('.id input').focus();
            return false;
        }
        if (userPwd !== "1234") {
            $errMsge.text("비밀번호가 일치하지 않습니다.");
            $('.pwd input').focus();
            return false;
        }
        localStorage.setItem("login", "true");
        localStorage.setItem("user", userId);
        
        location.href = "index.html";
    });

    $(".id input").on('keydown', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $(".pwd input").focus();
        }
    });
    $(".pwd input").on('keydown', function(e) {
        if (e.which === 13) {
            e.preventDefault();
            $(".login_button").trigger('click');
        }
    });

    $(".login_other button, .join_kakao, .join_facebook").on('click', function(e) {
        e.preventDefault();
        
        let url = "";
        let name = "";
        const specs = "width=500,height=650,top=100,left=100";

        if ($(this).hasClass("join_kakao") || $(this).find('img').attr('alt')?.includes("카카오")) {
            url = "https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fclient_id%3D90a1878dbc5b1c03f9c7db732ac4b97f%26redirect_uri%3Dkakaojs%26response_type%3Dcode%26state%3Dwujmmd3hkgpf90x0oyl9f%26proxy%3DeasyXDM_Kakao_utxna9xsyt_provider%26ka%3Dsdk%252F1.43.6%2520os%252Fjavascript%2520sdk_type%252Fjavascript%2520lang%252Fko-KR%2520device%252FWin32%2520origin%252Fhttps%25253A%25252F%25252Fwww.frip.co.kr%26origin%3Dhttps%253A%252F%252Fwww.frip.co.kr%26through_account%3Dtrue%26auth_tran_id%3Dwujmmd3hkgpf90x0oyl9f&talk_login=hidden#login";
            name = "KakaoAuthPopup";
        }
        else if ($(this).hasClass("join_facebook") || $(this).find('img').attr('alt')?.includes("페이스북")) {
            url = "https://www.facebook.com/login.php?skip_api_login=1&api_key=488654004608324&kid_directed_site=0&app_id=488654004608324&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv8.0%2Fdialog%2Foauth%3Fapp_id%3D488654004608324%26cbt%3D1773804646245%26channel_url%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Df8324818b3a61ce82%2526domain%253Dwww.frip.co.kr%2526is_canvas%253Dfalse%2526origin%253Dhttps%25253A%25252F%25252Fwww.frip.co.kr%25252Ffd8b21afb29566729%2526relation%253Dopener%26client_id%3D488654004608324%26display%3Dpopup%26domain%3Dwww.frip.co.kr%26e2e%3D%257B%257D%26fallback_redirect_uri%3Dhttps%253A%252F%252Fwww.frip.co.kr%252Fintro%253FredirectPath%253D%25252Fmy%25252Ffrips%25252Fupcoming%26locale%3Dko_KR%26logger_id%3Df5229b59dd5f4d16e%26origin%3D1%26redirect_uri%3Dhttps%253A%252F%252Fstaticxx.facebook.com%252Fx%252Fconnect%252Fxd_arbiter%252F%253Fversion%253D46%2523cb%253Dfb34c6bb5509cb59f%2526domain%253Dwww.frip.co.kr%2526is_canvas%253Dfalse%2526origin%253Dhttps%25253A%25252F%25252Fwww.frip.co.kr%25252Ffd8b21afb29566729%2526relation%253Dopener%2526frame%253Df8c5a08157ca7ca11%26response_type%3Dtoken%252Csigned_request%252Cgraph_domain%26scope%3Demail%26sdk%3Djoey%26version%3Dv8.0%26ret%3Dlogin%26fbapp_pres%3D0%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Dfb34c6bb5509cb59f%26domain%3Dwww.frip.co.kr%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fwww.frip.co.kr%252Ffd8b21afb29566729%26relation%3Dopener%26frame%3Df8c5a08157ca7ca11%26error%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied&display=popup&locale=ko_KR&pl_dbl=0&is_business_login=0";
            name = "FacebookAuthPopup";
        }

        if (url !== "") {
            window.open(url, name, specs);
        }
    });
});