<?php namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\User;
use Response;
use Input;
use Hash;

class UserController extends Controller {

	public function __construct()
	{
		$this->model = new User;

	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function lists()
	{
		$model = $this->model->all();

		return Response::json($model);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		$model = $this->model;
		$model->first_name = \Input::json('first_name');
		$model->last_name = \Input::json('last_name');
		$model->email = \Input::json('email');
		$model->password = Hash::make(\Input::json('password'));
		$model->save();
		
		return Response::json();
		
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$this->model->find($id)->delete();

		return Response::json();
	}

}
