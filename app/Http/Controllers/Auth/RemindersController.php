<?php namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Contracts\Auth\PasswordBroker;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class RemindersController extends Controller {

	/**
	 * The password reminder implementation.
	 *
	 * @var PasswordBroker
	 */
	protected $passwords;

	/**
	 * Create a new password reminder controller instance.
	 *
	 * @param  PasswordBroker  $passwords
	 * @return void
	 */
	public function __construct(PasswordBroker $passwords)
	{
		$this->passwords = $passwords;

		$this->beforeFilter('guest');
		$this->beforeFilter('csrf', ['on' => ['post']]);
	}

	/**
	 * Display the password reminder view.
	 *
	 * @return Response
	 */
	public function getRemind()
	{
		return view('password.remind');
	}

	/**
	 * Handle a POST request to remind a user of their password.
	 *
	 * @param  Request  $request
	 * @return Response
	 */
	public function postRemind(Request $request)
	{
		switch ($response = $this->passwords->remind($request->only('email')))
		{
			case PasswordBroker::INVALID_USER:
				return redirect()->back()->with('error', trans($response));

			case PasswordBroker::REMINDER_SENT:
				return redirect()->back()->with('status', trans($response));
		}
	}

	/**
	 * Display the password reset view for the given token.
	 *
	 * @param  string  $token
	 * @return Response
	 */
	public function getReset($token = null)
	{
		if (is_null($token))
		{
			throw new NotFoundHttpException;
		}

		return view('password.reset')->with('token', $token);
	}

	/**
	 * Handle a POST request to reset a user's password.
	 *
	 * @param  Request  $request
	 * @return Response
	 */
	public function postReset(Request $request)
	{
		$credentials = $request->only(
			'email', 'password', 'password_confirmation', 'token'
		);

		$response = $this->passwords->reset($credentials, function($user, $password)
		{
			$user->password = bcrypt($password);

			$user->save();
		});

		switch ($response)
		{
			case PasswordBroker::INVALID_PASSWORD:
			case PasswordBroker::INVALID_TOKEN:
			case PasswordBroker::INVALID_USER:
				return redirect()->back()->with('error', trans($response));

			case PasswordBroker::PASSWORD_RESET:
				return redirect()->to('/');
		}
	}

}
