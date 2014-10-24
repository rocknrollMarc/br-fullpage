br-fullpage
===========

Angular Directive for full page scrolling applications.

##Installation
    bower install br-fullpage
    
##Browser Comaptibility
Tested browsers:
*   IE
*   Chrome
*   Firefox
*   Safari
  
##Usage
####Include
  ```html
  <script src="br-fullpage.min.js"></script>
  ```
####Inject
  ```javascript
  angular.module('example', ['br.fullpage']);
  ```
####Example
  ```html
  <fullpage page-class="page">
    <section class="page">
        <section class="container">
            <h1>Page 1</h1>
        </section>
    </section>
    <section class="page">
        <section class="container">
            <h1>Page 2</h1>
        </section>
    </section>
    <section class="page">
        <section class="container">
            <h1>Page 3</h1>
        </section>
    </section>
  </fullpage>
  ```
##Attributes
  The fullpage directive currently allows following parameters:
####page-class
  This parameter specifies the class of the sections that represent your full pages.
  The fullpage directive should only have direct children with this class.

