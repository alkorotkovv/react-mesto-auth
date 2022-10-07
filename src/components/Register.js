import React from 'react';
import { Link } from 'react-router-dom';
import FormAuth from './FormAuth';

function Register(props) {

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
    props.onRegister(email, password);
  }

  return (
    <main className="content">
      <FormAuth 
        onSubmit={handleSubmit} 
        onEmailChange={handleEmailChange} 
        onPasswordChange={handlePasswordChange} 
        email={email} 
        password={password} 
        title="Регистрация" 
        buttonText="Зарегистрироваться"
      />
      <Link to="/sign-in" className="form__question">Уже зарегистрированы? Войти</Link>
    </main>
  )
}

export default Register;