<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
</head>
<body>
  <h1>{{ Lang::get('auth.email.account_confirmation.subject') }}</h1>

  <p>{{ Lang::get('auth.email.account_confirmation.greetings', array('name' => $data['first_name'])) }},</p>

  <p>{{ Lang::get('auth.email.account_confirmation.body') }}</p>
  <a href='{{ url(null)."/#confirm/". $data["activation_code"] }}'>
    {{{ url(null)."/#confirm/". $data["activation_code"] }}}
  </a>

  <p>{{ Lang::get('auth.email.account_confirmation.farewell') }}</p>

</body>
</html>