$(()=> {
    const serveBg = function() {
        $(".serv_desc button").click(function(){

            const $desc = $(this).next();
            if ($desc.is(":visible")){
                $desc.stop().slideUp(300);
                $(this).stop().animate({height: 50}, 300);
                $(this).removeClass("active");
            } else {
                $desc.stop().slideDown(300);
                $(this).stop().animate({height: 170}, 300);
                $(this).addClass("active");
            
                $(".desc_cont").not($desc).stop().slideUp(300);
                $(".serv_desc button").not($(this)).stop().animate({height: 50, backgroundColor: "rgba(255, 255, 255, 0.5)"}, 300).removeClass("active");
            }
        });
    };

    (() => {
        const $slideContainer =$(".top_cont");
        const $items = $slideContainer.find(".block");
        const $currentNum = $(".top_current");
        const $progressFill = $(".progress_fill");

        let currentIndex = 0;
        const totalSlides = 8;

        function topSlider(){
            const itemWidth = $items.first().outerWidth();
            const gap = parseInt($slideContainer.css('gap')) || 12;
            const slideWidth = itemWidth + gap;
            
            const moveDistance = -(currentIndex * slideWidth);
            $slideContainer.css('transform', `translateX(${moveDistance}px)`);
            $currentNum.text(currentIndex + 1);
            const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;
            $progressFill.css('width', progressPercentage + '%');
        }
        $(".next_more").on('click', function(){
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            topSlider();
        });
        $(".pre_more").on('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = totalSlides - 1;
            }
            topSlider();
        });
        topSlider();
    })();

    $('.btn_wish').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).toggleClass('on');
    });

    $(".page_num").on("click", function(e) {
        e.preventDefault();

        $(".page_num").removeClass("active");
        $(this).addClass("active");

        const currentPage = $(this).text();
        console.log(`현재 ${currentPage}페이지 선택됨`);
    });

    $(".frip_title button").on("click", function() {
        const category = $(this).data("category");

        $(".frip_title button").removeClass("active");
        $(this).addClass("active");

        const $allList = $(".serv_list");

        if (category === "all") {
            $allList.stop().fadeIn(300);
        } else {
            $allList.hide();
            
            $allList.filter(`[data-category="${category}"]`).stop().fadeIn(300);
        }
    });

    serveBg();
});