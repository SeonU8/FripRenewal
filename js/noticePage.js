$(() => {
            $(".notice_header").on("click", function() {
                const $item = $(this).closest(".notice_item");
                const $content = $(this).next(".notice_content");
                const $arrow = $(this).find(".arrow_icon");
                const $badge = $(this).find(".badge");
                const $title = $(this).find(".title")
                const badgeColor = $badge.css("background-color");

                $item.toggleClass("open");
                $content.stop().slideToggle(300);

                if ($item.hasClass("open")) {
                    $arrow.css("border-color", badgeColor);
                    $content.css("border-left-color", badgeColor);
                    $title.css("font-weight","bold");
                } else {
                    $arrow.css("border-color", "");
                    $title.css("font-weight","");
                }
                
                $(".notice_content").not($content).stop().slideUp(300);
                $(".notice_item").not($item).removeClass("open");
                $(".arrow_icon").not($arrow).css("border-color", "");
                $(".title").not($title).css("font-weight", "");
            });

            $(".tab_menu button").on("click", function() {
                const category = $(this).text().trim();

                $(".tab_menu button").removeClass("active");
                $(this).addClass("active");

                $(".notice_item").removeClass("open");
                $(".notice_content").stop().hide();
                $(".arrow_icon").css("border-color", "");

                if (category === "전체") {
                    $(".notice_item").stop().fadeIn(300);
                } else if (category === "공지") {
                    $(".notice_item").hide();
                    $(".notice_item[data-category='notice']").stop().fadeIn(300);
                } else if (category === "이벤트") {
                    $(".notice_item").hide();
                    $(".notice_item[data-category='event']").stop().fadeIn(300);
                }
            });
            
            $(".page_num").on("click", function(e) {
                e.preventDefault();

                $(".page_num").removeClass("active");
                $(this).addClass("active");

                const currentPage = $(this).text();
                console.log(`현재 ${currentPage}페이지 선택됨`);
            });
        });