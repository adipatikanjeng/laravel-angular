<!doctype html>
<html lang="en" ng-app="app">
<head>
  <meta charset="UTF-8">
  <title>AngularJS AuthenticationService Example</title>
  <link rel="stylesheet" href="<?php echo asset(null) ?>css/style.css">
  <link rel="stylesheet" href="<?php echo asset(null) ?>css/normalize.css">
  <link rel="stylesheet" href="<?php echo asset(null) ?>css/foundation.min.css">  
  <link rel="stylesheet" href="<?php echo asset(null) ?>css/angular-table.css">
  <script src="<?php echo asset(null) ?>js/angular.js"></script>
  <script src="<?php echo asset(null) ?>js/angular-sanitize.js"></script>
  <script src="<?php echo asset(null) ?>js/angular-table.js"></script>
  <script src="<?php echo asset(null) ?>js/underscore.js"></script>
  <script src="<?php echo asset(null) ?>js/app.js"></script>
  <script src="<?php echo asset(null) ?>js/controllers.js"></script>
  <script src="<?php echo asset(null) ?>js/directives.js"></script>
  <script src="<?php echo asset(null) ?>js/services.js"></script>
  <script>
    angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
  </script>
  <!-- <base href="<?php echo asset(null) ?>"> -->
</head>
<body>

  <div class="row">
    <div class="large-12">
      <h1>End to End with Angular JS</h1>    
      <div class="row">
        <div class="large-6 large-offset-3">
          <div id="flash" class="alert-box alert" ng-show="flash">
            {{ flash }}

          </div>
        </div>
      </div>
      <div id="view" ng-view></div>
    </div>
  </div>

</body>
</html>
