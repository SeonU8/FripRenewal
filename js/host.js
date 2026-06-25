var player = null;
var isPlayerReady = false;
var modalPlayer;

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: 'xJfRFM7FJsg',
        playerVars: {
            autoplay: 0,
            controls: 0,
            rel: 0,
            mute: 1,
            loop: 1,
            playlist: 'xJfRFM7FJsg'
        },
        events: {
            onReady: function () {
                isPlayerReady = true;
            }
        }
    });
}
function createModalPlayer(){

    modalPlayer = new YT.Player('modal_player', {
        videoId:'xJfRFM7FJsg',
        playerVars:{
            autoplay:1,
            rel:0
        }
    });

}

$(document).ready(function () {

    $('.video_overlay').on('mouseenter', function () {
        if (isPlayerReady && player) {
            player.playVideo();
        }
    });

    $('.video_overlay').on('mouseleave', function () {
        if (isPlayerReady && player) {
            player.pauseVideo();
        }
    });

    $('.video_overlay').on('click', function(){

        $('.video_modal').addClass('active');

        if(!modalPlayer){
            createModalPlayer();
        }else{
            modalPlayer.playVideo();
        }

    });

    $('.video_close, .video_modal').on('click', function(e){

        if(e.target !== this) return;

        $('.video_modal').removeClass('active');

        if(modalPlayer){
            modalPlayer.pauseVideo();
        }

    });

    const $section = $(".host_why");
    const $cards = $(".why_cardList");
    const cardCount = $cards.length;

    const $stepSection = $(".step_scroll_wrapper");
    const $stepItems = $(".step_item");
    const stepCount = $stepItems.length;

    $(window).on("scroll", function () {

        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();


        const sectionTop = $section.offset().top;
        const sectionHeight = $section.height();

        let progress = (scrollTop - sectionTop) / (sectionHeight - windowHeight);
        progress = Math.max(0, Math.min(1, progress));

        const activeIndex = Math.floor(progress * cardCount);

        $cards.each(function (i) {

            if (i < activeIndex) {
                $(this).addClass("exit").removeClass("active");
            }

            else if (i === activeIndex) {
                $(this).addClass("active").removeClass("exit");
            }

            else {
                $(this).removeClass("active exit");
            }

        });


        const stepTop = $stepSection.offset().top;
        const stepHeight = $stepSection.height();

        let stepProgress = (scrollTop - stepTop) / (stepHeight - windowHeight);
        stepProgress = Math.max(0, Math.min(1, stepProgress));

        const stepIndex = Math.floor(stepProgress * stepCount);

        $stepItems.each(function (i) {

            if (i < stepIndex) {
                $(this).addClass("exit").removeClass("active");
            }

            else if (i === stepIndex) {
                $(this).addClass("active").removeClass("exit");
            }

            else {
                $(this).removeClass("active exit");
            }

        });

    });

    $('.faq_q').on('click', function () {

        const $parent = $(this).closest('.faq_item');

        $parent
            .toggleClass('on')
            .siblings()
            .removeClass('on');

    });

});