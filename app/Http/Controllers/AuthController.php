<?php namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Contracts\Auth\Authenticator;
use Response;
use Lang;
use Input;
use App\User;
use Hash;
use View;

class AuthController extends Controller {

	public function __construct(Authenticator $auth)
	{
		$this->auth = $auth;
		$this->model = new User;

	}
	
	public function login()
	{

		$remember = (Input::json('remember')) ? true : false;

		if($this->auth->attempt(array('email' => Input::json('email'), 'password' => Input::json('password')), $remember))
		{

			if($this->model->whereEmail(Input::json('email'))->first()->activated)
			{
				$model = $this->model->find($this->auth->user()->id);
				$role = $model->roleUser->role->name;
				
				return Response::json(array('flash'=> Lang::get('auth.alerts.confirmation_login'), 'user'=> array('id' => $this->auth->user()->id, 'name' => $this->auth->user()->first_name." ".$this->auth->user()->last_name), 'role'=>$role ));

			}else{

				return Response::json(array('flash' =>  Lang::get('auth.alerts.not_confirmed')), 405);

			}	
			
		} else {		
			
			$html = View::make('alert.warning')->with('data',Lang::get('auth.alerts.wrong_credentials'))->render();
			return Response::json(array('flash' => $html), 405);
		}
	}

	public function logout()
	{
		$this->auth->logout();

		return Response::json(array('flash' => Lang::get('auth.logout.title')));
	}

	public function register()
	{

		if(User::whereEmail(Input::json('email'))->first()){

			return Response::json(array('flash' => Lang::get('auth.alerts.duplicated_credentials')), 500);

		}else if(Input::json('password')!==Input::json('password_confirmation'))
		{
			return Response::json(array('flash' => Lang::get('auth.alerts.wrong_confirmation')), 500);
		}else{

			$model = new User;
			$model->first_name = Input::json('first_name');
			$model->last_name = Input::json('last_name');
			$model->email = Input::json('email');
			$model->password = Hash::make(Input::json('password'));
			$model->activation_code = uniqid (rand(), true); 
			$model->save();
			$email = Input::json('email');

			$data = array('activation_code'=>$model->activation_code,'first_name'=>$model->first_name);


			\Mail::send('emails.auth.register', array('data' => $data), function($message) use ($email)
			{  
				$message->to($email);
				$message->subject(Lang::get('auth.email.account_confirmation.subject'));
			});

			return Response::json(array('flash' => Lang::get('auth.alerts.account_created').", ".Lang::get('auth.alerts.instructions_sent')), 200);

		} 


	}

	public function confirm()
	{

		if ($user = User::whereActivationCode(Input::json('code'))->first()) {

			$user->find($user->id);   
			$user->activation_code = ""; 
			$user->activated = 1; 
			$user->update();

			return Response::json(array('flash' => Lang::get('auth.alerts.confirmation')), 200);

		} else {

			return Response::json(array('flash' => Lang::get('auth.alerts.wrong_confirmation')), 500);
		}
	}

	public function reset()
	{
		if($user=User::whereEmail(Input::json('email'))->first()){

			if($user->activated){

				$email = Input::json('email');

				$user->find($user->id);   
				$user->token = uniqid (rand(), true); 
				$user->update();

				$data = array('token'=>$user->token,'user'=>$user->first_name);

				\Mail::send('emails.auth.reset', array('data' => $data), function($message) use ($email)
				{  
					$message->to($email);
					$message->subject(Lang::get('auth.email.password_reset.subject'));
				});

				return Response::json(array('flash' => Lang::get('auth.alerts.reset_confirmed')), 200);
			}else{

				return Response::json(array('flash' => Lang::get('auth.alerts.not_activated')), 500);
			}

		}else{

			return Response::json(array('flash' => Lang::get('auth.alerts.wrong_email_reset')), 500);
		}


	}

	public function resetPassword($token)
	{
		if(Input::json('password')!==Input::json('password_confirmation'))
		{
			return Response::json(array('flash' => Lang::get('auth.alerts.wrong_confirmation')), 500);

		}else if ($user = User::whereToken($token)->first()) {

			$user->find($user->id);   
			$user->token = ""; 
			$user->password = Hash::make(Input::json('password'));  
			$user->update();

			return Response::json(array('flash' => Lang::get('auth.alerts.confirmation')), 200);

		} else {

			return Response::json(array('flash' => Lang::get('auth.alerts.wrong_token')), 500);
		}

	}

}


