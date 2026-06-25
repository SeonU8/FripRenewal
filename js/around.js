$(function() {
    const $sheet = $('#side_list');
    const $floatBtns = $('#float_btns');
    const $filterList = $('.filter_chips');
    const $btnPrev = $('.btn_filter_nav.prev');
    const $btnNext = $('.btn_filter_nav.next');
    const scrollAmount = 200;

    let map, ps;
    let markers = [];
    let myLocationMarker = null;

    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
    const imageSize = new kakao.maps.Size(24, 35); 
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    function updateListCount() {
        const count = $('.scroll_list .frip_item:visible').length;
        $('.panel_header .point_color').text(count);
    }

    function updateMarkers() {
        if (!map) return;
        markers.forEach(marker => marker.setMap(null));
        markers = [];

        const markerContent = `
            <div style="cursor: pointer; display: flex; flex-direction: column; align-items: center;">
                <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 16 40 16 40C16 40 32 24.8366 32 16C32 7.16344 24.8366 0 16 0Z" fill="#6A5ACD"/>
                    <circle cx="16" cy="16" r="5" fill="white"/>
                </svg>
            </div>
        `;

        $('.frip_item:visible').each(function() {
            const lat = $(this).data('lat');
            const lng = $(this).data('lng');
            const title = $(this).find('.title').text();

            if (lat && lng) {
                const customOverlay = new kakao.maps.CustomOverlay({
                    map: map,
                    position: new kakao.maps.LatLng(lat, lng),
                    content: markerContent,
                    yAnchor: 1
                });
                markers.push(customOverlay);
            }
        });
    }

    kakao.maps.load(function() {
        const mapContainer = document.getElementById('map'); 
        const mapOption = { 
            center: new kakao.maps.LatLng(37.5446, 127.0567),
            level: 3
        };
        map = new kakao.maps.Map(mapContainer, mapOption); 
        ps = new kakao.maps.services.Places();

        updateListCount();
        updateMarkers();

        $(window).on('resize', function() {
            map.relayout();
            map.setCenter(new kakao.maps.LatLng(37.5446, 127.0567));
        });
    });

    $('.btn_my_loc').on('click', function() {
        const $btn = $(this);
        $btn.css('transform', 'scale(0.9)');
        setTimeout(() => $btn.css('transform', 'scale(1)'), 100);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const locPosition = new kakao.maps.LatLng(lat, lon);
                
                if (myLocationMarker) {
                    myLocationMarker.setMap(null);
                }

                const myLocContent = `
                    <div style="position: relative; width: 20px; height: 20px;">
                        <div style="position: absolute; width: 100%; height: 100%; background: #4285F4; border: 3px solid white; border-radius: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.3); z-index: 2;"></div>
                        <div style="position: absolute; width: 100%; height: 100%; background: #4285F4; border-radius: 50%; animation: pulse 2s infinite; opacity: 0.5; z-index: 1;"></div>
                    </div>
                    <style>
                        @keyframes pulse {
                            0% { transform: scale(1); opacity: 0.5; }
                            100% { transform: scale(2.5); opacity: 0; }
                        }
                    </style>
                `;

                myLocationMarker = new kakao.maps.CustomOverlay({
                    map: map,
                    position: locPosition,
                    content: myLocContent,
                    zIndex: 10
                });

                if(map) {
                    map.relayout();
                    map.panTo(locPosition);
                }
            }, function(error) {
                alert("위치 정보를 가져오는데 실패했습니다.");
            });
        } else {
            alert("이 브라우저에서는 위치 정보를 사용할 수 없습니다.");
        }
    });

    $('.filter_chips button').on('click', function() {
        $('.filter_chips button').removeClass('active');
        $(this).addClass('active');

        const category = $(this).data('category');
        const $items = $('.frip_item');

        if (category === 'all') {
            $items.show();
        } else {
            $items.hide();
            $items.filter(`[data-category="${category}"]`).show();
        }

        updateListCount();
        updateMarkers();
    });

    $(document).on('click', '.frip_item', function() {
        const lat = $(this).data('lat');
        const lng = $(this).data('lng');
        if (lat && lng) {
            map.panTo(new kakao.maps.LatLng(lat, lng));
        }
    });

    function executeSearch() {
        const keyword = $('#map_search').val();
        if (!keyword.trim()) { alert("검색어를 입력해주세요."); return; }

        ps.keywordSearch(keyword, function(data, status) {
            if (status === kakao.maps.services.Status.OK) {
                const firstPos = new kakao.maps.LatLng(data[0].y, data[0].x);
                map.panTo(firstPos);
                new kakao.maps.Marker({ map: map, position: firstPos });
            } else {
                alert("검색 결과가 없습니다.");
            }
        });
    }

    $('.btn_search_refined').on('click', executeSearch);
    $('#map_search').on('keypress', (e) => { if (e.which === 13) executeSearch(); });

    $('.sort_select').on('change', function() {
        const val = $(this).val();
        const $list = $('.scroll_list');
        const $items = $list.find('.frip_item').get();

        if (val === "필터순") return;

        $items.sort(function(a, b) {
            const aDist = parseFloat($(a).data('dist')) || 0;
            const bDist = parseFloat($(b).data('dist')) || 0;
            const aStar = parseFloat($(a).data('star')) || 0;
            const bStar = parseFloat($(b).data('star')) || 0;
            return val === "거리순" ? aDist - bDist : bStar - aStar;
        });

        $list.empty().append($items);
        updateMarkers();
    });

    $('#go_footer').on('click', function() {
        // 페이지 전체의 높이를 계산해서 맨 아래로 스크롤
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 600); // 0.6초 동안 부드럽게 이동
    });

    // (옵션) 스크롤 위치에 따라 버튼 모양을 바꾸고 싶다면?
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            // 어느 정도 내려왔을 때 다시 위로 올라가는 버튼으로 변경하고 싶다면 여기에 로직 추가
        }
    });

    function checkScroll() {
        const scrollLeft = $filterList.scrollLeft();
        const maxScroll = $filterList[0].scrollWidth - $filterList.outerWidth();
        $btnPrev.toggle(scrollLeft > 2);
        $btnNext.toggle(scrollLeft < maxScroll - 2);
    }
    $btnNext.on('click', () => $filterList.stop().animate({ scrollLeft: '+=200' }, 300, checkScroll));
    $btnPrev.on('click', () => $filterList.stop().animate({ scrollLeft: '-=200' }, 300, checkScroll));
    $filterList.on('scroll', checkScroll);
});