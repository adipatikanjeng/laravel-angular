<?php

class AuthController extends BaseController{
	
	public function Login(){
		if(Auth::attempt(Input::only('username','password'))){
			return Auth::user();
		}else{
			return 'invalid username/pass combo';
		}
	}
	
	public Function Logout(){
		Auth::logout();
		return 'logged out';
	}
	
}
