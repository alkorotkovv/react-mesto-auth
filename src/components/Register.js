import React from 'react';
import { Link } from 'react-router-dom';
import FormAuth from './FormAuth';

function Register(props) {

  return (
    <main className="content">
      <FormAuth 
        title="Регистрация" 
        buttonText="Зарегистрироваться"
        onSubmit={props.onRegister}
      />
      <Link to="/sign-in" className="form__question">Уже зарегистрированы? Войти</Link>
    </main>
  )
}

export default Register;