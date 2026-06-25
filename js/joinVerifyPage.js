$(() => {
    $('#btnVerify').on('click', function() {
        if(confirm("본인인증 팝업창을 여시겠습니까?")) {
            alert("인증이 완료되었습니다.");
            window.location.href = 'join_profile.html'; 
        }
    });
});