(function(){
    'use strict';

    angular
        .module('br.fullpage', [])
        .directive('fullpage', ['$window', FullPage]);

    function FullPage($window){
        function fullPageLink($scope, $element, $attributes){
            var pages = document.getElementsByClassName($attributes.pageClass);
            var nav = document.getElementsByClassName('br-fullpage-nav')[0];
            var pageHeight = $window.innerHeight;
            var pageIndex = sessionStorage.getItem('br-fullpage-index');
            if (!pageIndex){
                pageIndex = 0;
            }
            var scrolling = false;

            angular.element(pages).addClass('br-fullpage');
            $element.css('height', pageHeight + 'px');
            angular.element(pages).css('height', pageHeight + 'px');
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
                console.log(event);
                var delta = event.detail? event.detail*(-120) : event.wheelDelta;
                console.log(delta);

                if (!scrolling){
                    if (delta > 0) {
                        prevPage();
                    }
                    else {
                        nextPage();
                    }
                }
                console.log(pageIndex);
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
            link: fullPageLink
        }
    }
})();