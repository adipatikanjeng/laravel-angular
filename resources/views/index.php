<!doctype html>
<html lang="en" ng-app="app">
<head>
  <meta charset="UTF-8">
   <title>Laravel + AngularJS Authentication Service</title>
  <link rel="stylesheet" href="css/style.css">
  <!-- <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/foundation.min.css">  --> 
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <script src="js/angular.js"></script>
  <script src="js/angular-sanitize.js"></script>
  <script src="js/angular-table.js"></script>
  <script src="js/underscore.js"></script>
  <script src="js/app.js"></script>
  <script src="js/controllers.js"></script>
  <script src="js/directives.js"></script>
  <script src="js/services.js"></script>
  <script src="js/message-center.js"></script>

  <script>
    angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
  </script>
  <!-- <base href=""> -->
</head>
<body>

 <div class="navbar navbar-default">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="#">Company Info</a>
  </div>
  <div id="navbar" class="collapse navbar-collapse">
    <ul class="nav navbar-nav">
      <li class="active"><a href="#">Home Page</a></li>
      <li><a href="#">Contacts</a></li>
      <li><a href="#">About</a></li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li><a href="#">Social</a></li>
    </ul>
  </div>
</div>

<div class="container">
  {{ flash }}
  <div id="view" ng-view></div>
</div>

</body>
</html>
