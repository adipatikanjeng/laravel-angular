<!doctype html>
<html lang="en" ng-app="app">
<head>
	<meta charset="UTF-8">
	<title>Laravel + AngularJS Authentication Service</title>
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="bower_components/toaster/toaster.css">
	<link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
</head>
<body ng-controller="ApplicationController">
	<nav class="navbar navbar-default" role="navigation">
		<div class="container-fluid">
			<!-- Brand and toggle get grouped for better mobile display -->
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Brand</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li class="active"><a href="#">Link</a></li>
					<li><a href="#">Link</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#">Action</a></li>
							<li><a href="#">Another action</a></li>
							<li><a href="#">Something else here</a></li>
							<li class="divider"></li>
							<li><a href="#">Separated link</a></li>
							<li class="divider"></li>
							<li><a href="#">One more separated link</a></li>
						</ul>
					</li>
				</ul>
				<form class="navbar-form navbar-left" role="search">
					<div class="form-group">
						<input type="text" class="form-control" placeholder="Search">
					</div>
					<button type="submit" class="btn btn-default">Submit</button>
				</form>
				<ul class="nav navbar-nav navbar-right">
					<li><a href="#">Link</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#">Action</a></li>
							<li><a href="#">Another action</a></li>
							<li><a href="#">Something else here</a></li>
							<li class="divider"></li>
							<li><a href="#">Separated link</a></li>
						</ul>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right" ng-show="isLoggedIn()">
					<li ><a href=""><span ng-click="logout()" class="glyphicon glyphicon-off"></span></a></li>        
				</ul>
				<ul class="nav navbar-nav navbar-right" ng-show="isLoggedIn()">
					<li ><a href="#/user/show/{{ userId }}"><span class="glyphicon glyphicon-user"></span> {{ userName }} </a></li>     
				</ul>

				<ul class="nav navbar-nav navbar-right" ng-show="!isLoggedIn()">     
					<li ><a href=""><span ng-click="login()">Login</span></a></li>      
				</ul>
			</div><!-- /.navbar-collapse -->
		</div><!-- /.container-fluid -->
	</nav>	

	<div class="container">  
		<toaster-container toaster-options="{'position-class': 'toast-top-full-width'}">{{ flash }}</toaster-container>
		<div id="view" ng-view></div>
	</div>

	
	<script src="bower_components/angular/angular.min.js"></script>		
	<script src="js/underscore.js"></script>
	<script src="js/app.js"></script>
	<script src="js/controllers.js"></script>
	<script src="js/directives.js"></script>
	<script src="js/services.js"></script>	
	<script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
	<script src="bower_components/angular-route/angular-route.min.js"></script>
	<script src="bower_components/angular-animate/angular-animate.min.js"></script>
	<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
	<script src="bower_components/toaster/toaster.js"></script>
	<script src="bower_components/jquery/dist/jquery.min.js"></script>
	<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

	<script>
		angular.module("app").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');
	</script>
</body>
</html>
