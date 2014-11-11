<!doctype html>
<html lang="en" ng-app="app">
<head>
	<meta charset="UTF-8">
	<title>Teewool.com</title>
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
				<a class="navbar-brand" href="#/home">Teewool.com</a>
			</div>

			<!-- Collect the nav links, forms, and other content for toggling -->
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav" ng-show="isLoggedIn()">					
					<li class="active" class="dropdown">
						<a href="" class="dropdown-toggle" data-toggle="dropdown">Setting <span class="caret"></span></a>
						<ul class="dropdown-menu" role="menu">
							<li><a href="#/user/lists">User</a></li>							
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
				<form class="navbar-form navbar-right" role="search">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Search" name="q">
						<div class="input-group-btn">
							<button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
						</div>
					</div>
				</form>		
			</div><!-- /.navbar-collapse -->
		</div><!-- /.container-fluid -->
	</nav>	

	<div class="container">  
		<toaster-container toaster-options="{{toasterOptions}}">{{ flash }}
	</toaster-container>
	<div id="view" ng-view></div>
</div>


<script src="bower_components/angular/angular.min.js"></script>		
<script src="js/app.js"></script>
<script src="js/controllers.js"></script>
<script src="js/directives.js"></script>
<script src="js/services.js"></script>	
<script src="bower_components/underscore/underscore-min.js"></script>
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
