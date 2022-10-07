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
    props.onExit();
    setVisible(false);
  }

  function handleBurgerClick() {
    setVisible(!visible);
  }
  
  switch (location.pathname) {
    case "/sign-in":
      block = (
        <Link to="/sign-up" className={'header__sign-up' + (props.loggedIn? " header__sign-up_grid" : "")}>Регистрация</Link>
      )
      break;
    case "/sign-up":

      block = (
        <Link to="/sign-in" className={'header__sign-up' + (props.loggedIn? " header__sign-up_grid" : "")}>Войти</Link>
      )
      break;
    case "/":
      block = (
        <>
          <p className="header__email">{props.email}</p>
          <button className={'header__sign-up' + (props.loggedIn? " header__sign-up_grid" : "")} onClick={handleClick}>Выйти</button>
        </>
      )
      break;
  }

  return (
    <header className={'header' + (props.loggedIn? " header_grid" : "")}>
      <img className="header__logo" src={headerLogo} alt="логотип"/>
      <img className={'header__burger' + (props.loggedIn? " header__burger_grid" : "")} src={image} onClick={handleBurgerClick}/>
      <div className={'header__info' + (props.loggedIn? " header__info_grid" : "") + ((!visible && props.loggedIn)? " header__info_unvisible" : "")}>
        {block}
      </div>
    </header>
  )
}

export default Header;