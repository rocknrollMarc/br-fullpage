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
        scrolling;

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
                console.log(pageIndex);
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
            pageIndex = sessionStorage.getItem('br-fullpage-index');
            if (!pageIndex){
                pageIndex = 0;
            }
            scrolling = false;
            angular.element(pages).addClass('br-fullpage');
            for (var i = 0; i<pages.length; i++){
                angular.element(nav).append('<li><i class="br-fullpage-nav-item"></i></li>');
            }

            nav.style.marginTop = (0 - (pages.length * 17)) + 'px';
            angular.element(document.getElementsByClassName('br-fullpage-nav-item')[pageIndex]).addClass('active');
            angular.element(pages[0]).css(
                'marginTop', '-' + pageHeight * pageIndex + 'px'
            );

            function paginate(e){
                var event = window.event || e.originalEvent || e; //equalize event object
                var delta = event.detail? event.detail*(-120) : event.wheelDelta;

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

            angular.element(document).bind("DOMMouseScroll mousewheel", function(e){
                paginate(e);
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