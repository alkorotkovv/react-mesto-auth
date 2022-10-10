import React from 'react';
import FormAuth from './FormAuth';

function Login(props) {

  return (
    <main className="content">
      <FormAuth 
        title="Вход" 
        buttonText="Войти"
        onSubmit={props.onLogin}
      />
    </main>
  )
}

export default Login;