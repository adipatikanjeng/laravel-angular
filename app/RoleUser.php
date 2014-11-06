<?php namespace App;
use Illuminate\Database\Eloquent\Model;
class RoleUser extends Model {	
	
	public function role()
	{

		return $this->hasOne('App\Role', 'id');
	}
}