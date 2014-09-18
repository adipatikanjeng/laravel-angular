<?php namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\User;
use Response;
use Input;

class UserController extends Controller {

	public function __construct(){

		$this->model = new User;

	}

	public function lists()
	{
		$model = $this->model->all();

		return Response::json($model);
	}

	
	public function update($id)
	{

		$model = $this->model->find($id);
		$model->first_name = Input::json('first_name');
		$model->last_name = Input::json('last_name');
		if(Input::json('password'))	
		{
			if(Input::json('password')==Input::json('confirmation_password'))
			{

				$model->password = Hash::make(Input::json('password'));	

			}else{
				return Response::json(array('flash' => Lang::get('user.alerts.wrong_password_confirmation')), 500);
			}
		}	

		$model->update();		

		return Response::json(array('flash' => Lang::get('user.alerts.updated_success')), 200);
	}

	public function delete($id)
	{
		$model = $this->model->find($id);
		$model->delete();

		return Response::json(array('flash' => Lang::get('user.alerts.deleted_confirm')), 200);

	}

	public function show($id)
	{

		return Response::json($this->model->find($id)
	}



}


