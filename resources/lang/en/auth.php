<?php

return array(

    'username' => 'Username',
    'password' => 'Password',
    'password_confirmation' => 'Confirm Password',
    'e_mail' => 'Email',
    'username_e_mail' => 'Username or Email',

    'signup' => array(
        'title' => 'Signup',
        'desc' => 'Signup for new account',
        'confirmation_required' => 'Confirmation required',
        'submit' => 'Create new account',
    ),

    'login' => array(
        'title' => 'Login',
        'desc' => 'Enter your credentials',
        'forgot_password' => '(forgot password)',
        'remember' => 'Remember me',
        'submit' => 'Login',
    ),

    'logout' => array(
        'title' => 'Logged Out!',        
    ),

     'forgot' => array(
        'title' => 'Forgot password',
        'submit' => 'Continue',
    ),

    'alerts' => array(
        'account_created' => 'Your account has been successfully created.',
        'instructions_sent'       => 'Please check your email for the instructions on how to confirm your account.',
        'not_activated' => 'Your account not activated yet!.',
        'too_many_attempts' => 'Too many attempts. Try again in few minutes.',
        'wrong_credentials' => 'Incorrect username, email or password.',
        'not_confirmed' => 'Your account may not be confirmed. Check your email for the confirmation link',
        'confirmation' => 'Your account has been confirmed! You may now login.',
        'confirmation_login' => 'Your account has login.',
        'wrong_confirmation' => 'Wrong confirmation code.',
        'password_forgot' => 'The information regarding password reset was sent to your email.',
        'wrong_password_forgot' => 'User not found.',
        'password_reset' => 'Your password has been changed successfully.',
        'reset_confirmed' => 'To complete this action please check your email!',
        'wrong_password_reset' => 'Invalid password. Try again',
        'wrong_email_reset' => 'Your email address not registered!',
        'wrong_token' => 'The password reset token is not valid.',
        'wrong_email_address' => 'Your email address is not valid.',
        'duplicated_credentials' => 'The credentials provided have already been used. Try with different credentials.',
    ),

    'email' => array(
        'account_confirmation' => array(
            'subject' => 'Account Confirmation',
            'greetings' => 'Hello :name',
            'body' => 'Please access the link below to confirm your account.',
            'farewell' => 'Regards',
        ),

        'password_reset' => array(
            'subject' => 'Password Reset',
            'greetings' => 'Hello :name',
            'body' => 'Access the following link to change your password',
            'farewell' => 'Regards',
        ),
    ),

);
