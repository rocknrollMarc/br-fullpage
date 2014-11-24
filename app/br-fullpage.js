(function(){
    'use strict';

    angular
        .module('br.fullpage', [])
        .directive('fullpage', ['$window', FullPage])
        .directive('fullpageHref', ['$window', FullpageHref]);

    var nav,
        pageHeight,
        pageIndex,
        pages,
        scrolling,
        isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/),
        isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));

    function FullpageHref(){
        function fullpageHref($scope, $element){
            $element.css('cursor', 'pointer');
            $element.on('click', function(){
                for (var i = 0; i < pages.length; i++) {
                    if (pages[i].id == $scope.scrollTo){
                        pageIndex = i;
                    }
                }
                angular.element(pages[0]).css(
                    'marginTop', '-' + pageHeight * pageIndex + 'px'
                );
                angular.element(document.getElementsByClassName('br-fullpage-nav-item')).removeClass('active');
                angular.element(document.getElementsByClassName('br-fullpage-nav-item')[pageIndex]).addClass('active');
                sessionStorage.setItem('br-fullpage-index', pageIndex);
            });
        }

        return {
            scope: {
                scrollTo: '@fullpageHref'
            },
            restrict: 'A',
            link: fullpageHref
        }
    }

    function FullPage($window){
        function fullPage($scope, $element, $attr){
            pages = document.getElementsByClassName($attr.pageClass);
            nav = document.getElementsByClassName('br-fullpage-nav')[0];
            pageHeight = $window.innerHeight;
            scrolling = false;

            //retrieve page index from session storage
            pageIndex = sessionStorage.getItem('br-fullpage-index');
            if (!pageIndex){
                pageIndex = 0;
            }

            //add fullpage class
            angular.element(pages).addClass('br-fullpage');

            //add menu items
            for (var i = 0; i<pages.length; i++){
                angular.element(nav).append('<li><i class="br-fullpage-nav-item"></i></li>');
            }
            //align menu in middle
            nav.style.marginTop = (0 - (pages.length * 17)) + 'px';
            angular.element(document.getElementsByClassName('br-fullpage-nav-item')[pageIndex]).addClass('active');
            angular.element(pages[0]).css(
                'marginTop', '-' + pageHeight * pageIndex + 'px'
            );

            //paginate function
            function paginate(delta){
                if (!scrolling){
                    if (delta > 0) {
                        prevPage();
                    }
                    else {
                        nextPage();
                    }
                }
                angular.element(pages[0]).css(
                    'marginTop', '-' + pageHeight * pageIndex + 'px'
                );
                angular.element(document.getElementsByClassName('br-fullpage-nav-item')).removeClass('active');
                angular.element(document.getElementsByClassName('br-fullpage-nav-item')[pageIndex]).addClass('active');
                sessionStorage.setItem('br-fullpage-index', pageIndex);

                setTimeout(function () {
                    scrolling = false;
                }, 1200);
            }

            function prevPage() {
                if (pageIndex !== 0) {
                    scrolling = true;
                    pageIndex--;
                }
            }

            function nextPage() {
                if (pageIndex < (pages.length-1)){
                    scrolling = true;
                    pageIndex++;
                }
            }

            angular.element(document).bind("mousewheel", mouseScroll); //IE9, Chrome, Safari, Opera
            angular.element(document).bind("onmousewheel", mouseScroll); //IE 6-8
            angular.element(document).bind("wheel", mouseScroll); //Firefox

            angular.element(document).bind("touchstart", startTouch); //Mobile
            angular.element(document).bind("pointerdown", startTouch); //Mobile
            angular.element(document).bind("MSPointerDown", startTouch); //Mobile

            angular.element(document).bind("touchmove", endTouch); //Mobile
            angular.element(document).bind("pointermove", endTouch); //Mobile
            angular.element(document).bind("MSPointerMove", endTouch); //Mobile

            function mouseScroll(e){
                var event = window.event || e.originalEvent || e;
                var delta = event.detail? event.detail*(-120) : event.wheelDelta;
                paginate(delta);
            }

            var startTouchY;
            function startTouch(e){
                startTouchY = e.pageY;
            }
            function endTouch(e){
                var delta = e.pageY - startTouchY;
                paginate(delta);
            }

            //on resize reset pageHeight
            angular.element($window).bind("resize", function(){
                pageHeight = $window.innerHeight;
                angular.element(pages[0]).css(
                    'marginTop', '-' + pageHeight * pageIndex + 'px'
                );
            });
        }

        return {
            template:   '<section class="br-fullpage-wrapper">' +
                            '<section ng-transclude>' +
                            '</section>' +
                            '<ul class="br-fullpage-nav"></ul>' +
                        '</section>',
            restrict: 'E',
            transclude: true,
            replace: true,
            link: fullPage
        }
    }
})();