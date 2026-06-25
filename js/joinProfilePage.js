$(() => {
    const joinForm = function(){

        const $idInput = $("#u_id");
        const $idMsg = $idInput.closest(".join_row").find("> span");
        const originalIdMsg = $idMsg.text();

        let isIdChecked = false;
        
        const $pwdInput = $("#pwd");
        const $repwdInput = $("#repwd");
        const $repwdMsg = $repwdInput.closest(".join_row").find("> span");

        const $form = $('form[name="join_form"]');

        $("#ch_number").on('click', function(){
            location.href = "join_verify.html";
        });

        $("#reuid").on('click', function(){
            const userId = $idInput.val();
            const idReg = /^[a-z0-9]{4,12}$/;

            if (!idReg.test(userId)) {
                alert("아이디 형식이 올바르지 않습니다.");
                return false;
            }

            let isDuplicate = false;

            if (!isDuplicate) {
                $idMsg.text("사용 가능한 아이디입니다.").css("color", "green");
                isIdChecked = true;
            } else {
                $idMsg.text("이미 사용중인 아이디입니다.").css("color", "red");
                isIdChecked = false;
            }
        });
        $idInput.on('input', function() {
            isIdChecked = false;
            if ($(this).val() === "") {
                $idMsg.text(originalIdMsg).css("color", "#666");
            }
        });


        $pwdInput.on('input', function(){
            const pwd = $(this).val();
            const $pwdMsg = $(this).closest(".join_row").find("> span");
            const pwdReg = /^(?=.{8,20}$)(?:(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[!@#$%^&*])|(?=.*\d)(?=.*[!@#$%^&*]))[A-Za-z\d!@#$%^&*]+$/;

            if (pwd === "") {
                $pwdMsg.css("color", "#666");
            } else if (!pwdReg.test(pwd)) {
                $pwdMsg.css("color", "red");
            } else {
                $pwdMsg.css("color", "#666");
            }
        });

        $repwdMsg.hide();
        $repwdInput.on('input', function() {
            const pwd = $('#pwd').val();
            const repwd = $(this).val();

            if (repwd === "") {
                $repwdMsg.hide();
            } else if (pwd !== repwd) {
                $repwdMsg.show().text("비밀번호가 일치하지 않습니다.").css("color", "red");
            } else {
                $repwdMsg.hide();
            }
        });


        $("#email_sel").on('change', function() {
            const val = $(this).val();
            const $dns = $('#email_dns');
            if (val === "") {
                $dns.val("").prop('readonly', false).focus();
            } else {
                $dns.val(val).prop('readonly', true);
            }
        });


        $("#agree_all").on('change', function() {
            $(".terms_item input:checkbox").prop('checked', $(this).is(':checked'));
        });


        $form.on('submit', function(e) {
            e.preventDefault();

            if ($("#u_name").val().trim() === "") {
                alert("이름을 입력해 주세요.");
                $("#u_name").focus();
                return false;
            }

            const userId = $idInput.val().trim();
            if (userId !== "" && !isIdChecked) {
                alert("아이디 중복 확인을 해주세요.");
                return false;
            }

            if ($pwdInput.val().trim() === "") {
                alert("비밀번호를 입력해 주세요.");
                $pwdInput.focus();
                return false;
            }

            if ($pwdInput.val() !== $repwdInput.val()) {
                alert("비밀번호가 일치하지 않습니다.");
                $repwdInput.focus();
                return false;
            }
            if ($("#email_id").val().trim() === "" || $("#email_dns").val().trim() === "") { 
                alert("이메일을 입력해 주세요.");
                $('#email_id').focus();
                return false; 
            }

            if (!$('#terms_service').is(':checked') || !$('#privacy_policy').is(':checked')) {
                alert("필수 약관에 동의해 주세요.");
                return false;
            }

            location.href = "join_done.html";
            //this.submit();
        });

        const modal = document.getElementById('termsModal');
        let currentTermId = '';

        $(".terms_item button").on('click', function() {
            const $label = $(this).closest('.terms_item').find('label');
            const labelText = $label.text();
            const inputId = $label.attr('for');

            currentTermId = inputId;

            $("#modalTitle").text(labelText);
            if (inputId === 'terms_service') $("#modalBody").text(termsData.service);
            else if (inputId === 'privacy_policy') $("#modalBody").text(termsData.privacy);
            else if (inputId === 'marketing_agree') $("#modalBody").text(termsData.marketing);

            modal.showModal();
        });

        $("#modalConfirmBtn").on('click', function() {
            if (currentTermId) {
                $("#" + currentTermId).prop('checked', true);
                
                updateAgreeAll(); 
            }
            modal.close();
        });

        $("#closeModal").on('click', function() {
            modal.close();
        });

        function updateAgreeAll() {
            const total = $(".terms_item input:checkbox").length;
            const checked = $(".terms_item input:checkbox:checked").length;
            $("#agree_all").prop('checked', total === checked);
        };
    };
    joinForm();

    const termsData = {
        service: `제1조 (목적)
본 약관은 (주)프렌트립이 운영하는 웹사이트 및 관련 서비스(이하 "서비스")를 이용함에 있어 "회사"와 "이용자"의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
1. "이용자"란 "회사"에 접속하여 본 약관에 따라 "회사"가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
2. "회원"이라 함은 "회사"에 개인정보를 제공하여 회원등록을 한 자로서, "회사"의 정보를 지속적으로 제공받으며 "회사"가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.

제3조 (약관 등의 명시와 설명 및 개정)
1. "회사"는 본 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.
2. "회사"는 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.

제4조 (서비스의 제공 및 변경)
1. "회사"는 다음과 같은 업무를 수행합니다.
    - 콘텐츠 제공 및 정보 전달
    - 회원 간의 소통 서비스 제공
    - 기타 "회사"가 정하는 업무
2. 서비스 이용은 "회사"의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간 운영을 원칙으로 합니다.

제5조 (회원가입 및 탈퇴)
1. 이용자는 "회사"가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
2. 회원은 "회사"에 언제든지 탈퇴를 요청할 수 있으며 "회사"는 즉시 회원탈퇴를 처리합니다.

제6조 (회원의 의무)
회원은 다음 행위를 하여서는 안 됩니다.
1. 신청 또는 변경 시 허위 내용의 등록
2. 타인의 정보 도용
3. "회사"가 게시한 정보의 변경
4. "회사"가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시
5. "회사" 및 기타 제3자의 저작권 등 지적재산권에 대한 침해
6. "회사" 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위

제7조 (저작권의 귀속 및 이용제한)
1. "회사"가 작성한 저작물에 대한 저작권 기타 지적재산권은 "회사"에 귀속합니다.
2. 이용자는 서비스를 이용함으로써 얻은 정보 중 "회사"에게 지적재산권이 귀속된 정보를 "회사"의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.

제8조 (분쟁해결)
본 약관과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우, "회사"의 소재지를 관할하는 법원을 전속 관할법원으로 합니다.

부칙
본 약관은 2026년 [월] [일]부터 시행됩니다.`,

        privacy: `(주)프렌트립은 회원가입 및 서비스 제공을 위해 아래와 같이 개인정보를 수집·이용합니다.

1. 수집 목적
- 이용자 식별 및 본인 확인
- 서비스 이용에 따른 민원 사항 처리 및 공지사항 전달
- 부정 이용 방지 및 비인가 사용 방지

2. 수집 항목
- (필수) 아이디, 비밀번호, 이메일 주소, 닉네임
- (자동수집) IP주소, 쿠키, 방문 기록, 서비스 이용 기록

3. 보유 및 이용 기간
회원 탈퇴 시까지 (단, 관계 법령에 따라 보존할 필요가 있는 경우 해당 기간까지 보관)

4. 동의 거부 권리
이용자는 개인정보 수집 및 이용 동의를 거부할 권리가 있습니다. 다만, 거부 시 회원가입 및 서비스 이용이 제한될 수 있습니다.`,

        marketing: `(주)프렌트립은 서비스의 홍보 및 마케팅을 위해 아래와 같이 개인정보를 수집·이용합니다.

1. 수집 목적
- 신규 서비스 안내 및 이벤트 정보 제공 (SMS, 이메일 등)
- 인구통계학적 특성에 따른 서비스 제공 및 광고 게재

2. 수집 항목
- 이메일 주소, 휴대전화 번호

3. 보유 및 이용 기간
동의 철회 시 또는 회원 탈퇴 시까지

4. 동의 거부 권리
본 동의는 선택 사항이며, 거부하시더라도 서비스 이용에는 제한이 없습니다.`
    };
    const modal = document.getElementById('termsModal');

    $(".terms_item button").on('click', function() {
        const $label = $(this).closest('.terms_item').find('label');
        const labelText = $label.text();
        const inputId = $label.attr('for');

        $("#modalTitle").text(labelText);

        if (inputId === 'terms_service') $("#modalBody").text(termsData.service);
        else if (inputId === 'privacy_policy') $("#modalBody").text(termsData.privacy);
        else if (inputId === 'marketing_agree') $("#modalBody").text(termsData.marketing);

        modal.showModal();
    });

    $("#closeModal, #modalConfirmBtn").on('click', function() {
        modal.close();
    });

    $(modal).on('click', function(e) {
        if (e.target === modal) modal.close();
    });
});