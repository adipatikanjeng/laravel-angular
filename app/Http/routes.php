<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function() {
  return View::make('index');
});


Route::group(array('prefik' => "", 'before' => 'auth'), function()
{
  Route::get('/books', function() {
    return Response::json(array(
      array('title' => 'Great Expectations', 'author' => 'Dickens'),
      array('title' => 'Foundation', 'author' => 'Asimov'),
      array('title' => 'Treasure Island', 'author' => 'Stephenson')
      ));  
  });

  Route::get('user/profile', function() {

    return Response::json(User::find(Auth::user()->id));  
  });

  Route::post('user/update/{id}', 'UserController@update');
  Route::post('user/destroy/{id}', 'UserController@destroy');

  Route::get('user/lists', 'UserController@lists');
  Route::post('user/create', 'UserController@create');
  Route::get('user/show/{id}', 'UserController@show');
  // Route::get('user/user-addedit/{id}', 'UserController@show');


  // return Response::json(array('flash' => 'Session expired'), 401);

});

//auth router
Route::post('auth/login', array('before' => 'csrf_json', 'uses' => 'AuthController@login'));
Route::get('auth/logout', 'AuthController@logout');
Route::post('auth/register', 'AuthController@register');
Route::post('auth/confirm', 'AuthController@confirm');
Route::post('auth/reset', 'AuthController@reset');
Route::post('auth/resetPassword/{token}', 'AuthController@resetPassword');





App::missing(function($exception)
{
  return View::make('index');
});

// Route::any('auth/{all}', function($uri)
// {
//     return View::make('singlepage');
// })->where('auth', '.*');


//dd(Auth::viaRemember());
