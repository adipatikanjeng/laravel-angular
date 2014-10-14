<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
</head>
<body>
 <h1>{{ Lang::get('auth.email.password_reset.subject') }}</h1>

<p>{{ Lang::get('auth.email.password_reset.greetings', array( 'name' => $data['user'])) }},</p>

<p>{{ Lang::get('auth.email.password_reset.body') }}</p>
<a href='{{ url(null)."/#reset/". $data["token"] }}'>
    {{{ url(null)."/#reset/". $data["token"] }}}
  </a>

<p>{{ Lang::get('auth.email.password_reset.farewell') }}</p>

</body>
</html>