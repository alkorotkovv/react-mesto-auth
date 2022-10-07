import React from 'react';
import FormAuth from './FormAuth';

function Login(props) {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <main className="content">
      <FormAuth 
        onSubmit={handleSubmit} 
        onEmailChange={handleEmailChange} 
        onPasswordChange={handlePasswordChange} 
        email={email} 
        password={password} 
        title="Вход" 
        buttonText="Войти"
      />
    </main>
  )
}

export default Login;