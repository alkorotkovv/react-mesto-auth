import React from 'react';
import headerLogo from '../images/logo.svg';
import burgerLogo from '../images/burger.png';
import closeLogo from '../images/close.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {


  let block;
  
  const location = useLocation();
  const [visible, setVisible] = React.useState(false);
  const image = visible? closeLogo : burgerLogo;

  function handleClick() {
    localStorage.removeItem('token');
  }

  function handleBurgerClick() {
    console.log("bclick");
    setVisible(!visible);
  }
  
  switch (location.pathname) {
    case "/sign-in":
      block = (
        <Link to="/sign-up" className="header__sign-up">Регистрация</Link>
      )
      break;
    case "/sign-up":
      block = (
        <Link to="/sign-in" className="header__sign-up">Войти</Link>
      )
      break;
    case "/":
      block = (
        <>
          <p className="header__email">{props.email}</p>
          <Link to="/sign-in" className="header__sign-up" onClick={handleClick}>Выйти</Link>
        </>
      )
      break;
  }

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип"/>
      <img className="header__burger" src={image} onClick={handleBurgerClick}/>
      <div className={'header__info' + (visible? "" : " header__info_unvisible")}>
        {block}
      </div>
    </header>
  )
}

export default Header;

//className={`popup popup_type_card` + (Object.keys(props.card).length ? " popup_opened" : "")}