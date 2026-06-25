$(() => {

    $(".logout_btn").on("click", function(e){
        e.preventDefault();

        localStorage.removeItem("login");
        localStorage.removeItem("user");

        alert("로그아웃되었습니다.");

        location.href = "index.html";
    });

});