$(() => {
    $(window).on("mousewheel DOMMouseScroll", function(e) {
        e.preventDefault();
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {
            delta = event.wheelDelta / 120;
            if (window.opera) delta = -delta;
        } else if (event.detail) delta = -event.detail / 3;

        var moveTop = $(window).scrollTop();
        var speed = 400;

        if (delta > 0) {
            $("html,body").stop().animate({
                scrollTop: moveTop - speed
            }, 600, "easeOutQuart");
        } else {
            $("html,body").stop().animate({
                scrollTop: moveTop + speed
            }, 600, "easeOutQuart");
        }
    });
    const searchText = () => {

        const $search = $("#search_text");
        const keywords = [
            "검색어를 입력하세요",
            "# 서울 근교 여행",
            "# 이번 주말에 뭐할까?",
            "# 내 주변 활동 검색",
            "# 번아웃 탈출이 필요한 당신에게",
            "# 친구랑 할 수 있는 체험",
            "# 무기력한 일상에 활력을 채워줄 모임"
        ];

        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;

        function type() {

            const currentWord = keywords[wordIdx];

            if (isDeleting) {
                $search.attr("placeholder", currentWord.substring(0, charIdx--));
            } else {
                $search.attr("placeholder", currentWord.substring(0, charIdx++));
            }

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && charIdx > currentWord.length) {
                isDeleting = true;
                speed = 2000;
            }
            else if (isDeleting && charIdx < 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % keywords.length;
                charIdx = 0;
                speed = 1000;
            }
            setTimeout(type, speed);
        }
        type();
    };

    $(window).on('scroll', function() {
    var scrollTop = $(this).scrollTop();
    var threshold = 400; // 효과가 끝날 지점 (px)

    // 스크롤 양에 따른 불투명도 계산 (1 -> 0)
    var opacity = 1 - (scrollTop / threshold);
    // 스크롤 양에 따른 크기 계산 (1 -> 0.9)
    var scale = 1 - (scrollTop / (threshold * 10));

    if (scrollTop <= threshold) {
        $('.search').css({
            'opacity': opacity,
            'transform': 'scale(' + scale + ')',
            'transition': 'none' // 스크롤 시에는 즉각 반응하도록
        });
    } else {
        $('.search').css('opacity', 0);
    }
});


    const mainSlider = () => {

        const $sliderTrack = $('.main_slList');
        const $slides = $('.main_slList li');
        const $bar = $('.progress-bar');
        const $prevBtn = $('.btn_prev');
        const $nextBtn = $('.btn_next');

        const total = $slides.length;

        let current = 0;
        let autoPlay;

        function move(idx) {

            if (idx >= total) idx = 0;
            if (idx < 0) idx = total - 1;

            current = idx;

            $sliderTrack.css({
                transform: `translateX(-${current * 100}%)`,
                transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)'
            });

            const percent = ((current + 1) / total) * 100;
            $bar.css('width', `${percent}%`);
        }

        function startAuto() {

            stopAuto();

            autoPlay = setInterval(() => {
                move(current + 1);
            }, 3000);

        }

        function stopAuto() {

            if (autoPlay) clearInterval(autoPlay);

        }

        $prevBtn.on('click', e => {
            e.preventDefault();
            stopAuto();
            move(current - 1);
            startAuto();
        });

        $nextBtn.on('click', e => {
            e.preventDefault();
            stopAuto();
            move(current + 1);
            startAuto();
        });

        $('.main_slider')
            .on('mouseenter', stopAuto)
            .on('mouseleave', startAuto);

        move(0);
        startAuto();
    };

    $('.main_pickList a').on('mouseenter', function() {
        const $img = $(this).find('.hover_gif');
        $img.attr('src', $img.data('gif'));
    }).on('mouseleave', function() {
        const $img = $(this).find('.hover_gif');
        $img.attr('src', $img.data('static'));
    });

    const popularSlider = () => {
        const $slideContainer = $(".pop_cont");
        const $items = $slideContainer.find(".block").slice(0, 7);
        const $currentNum = $(".pop_current");
        const $progressFill = $(".progress_fill");

        const totalSlides = $items.length;
        let currentIndex = 0;

        function updateSlider() {
            const itemWidth = $items.first().outerWidth();
            const gap = parseInt($slideContainer.css('gap')) || 12;
            const slideWidth = itemWidth + gap;

            const moveDistance = -(currentIndex * slideWidth);

            $slideContainer.css({
                'transform': `translateX(${moveDistance}px)`,
                'transition': '0.4s ease-in-out'
            });

            $currentNum.text(currentIndex + 1);

            const percent = ((currentIndex + 1) / totalSlides) * 100;
            $progressFill.css('width', percent + '%');
        }

        $(".next_more").on('click', () => {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

        $(".pre_more").off('click').on('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        updateSlider();
    };

    const wishBtn = () => {

        $('.btn_wish').on('click', function(e) {

            e.preventDefault();
            e.stopPropagation();

            $(this).toggleClass('on');

        });

    };

    const popup = $('#copyrightPopup');
    const isHide = localStorage.getItem('hideCopyrightPopup');
    const now = new Date().getTime();

    if (!isHide || now > parseInt(isHide)) {
        popup.css('display', 'block');
        setTimeout(() => {
            popup.addClass('show');
        }, 10);
    }

    searchText();
    mainSlider();
    popularSlider();
    wishBtn();
});

function closePopup() {
    $('#copyrightPopup').removeClass('show').fadeOut(300);
}

function closePopupToday() {
    const expiryDate = new Date().getTime() + (24 * 60 * 60 * 1000); 
    localStorage.setItem('hideCopyrightPopup', expiryDate);
    closePopup();
}