import React from 'react';
import headerLogo from '../images/logo.svg';
import burgerLogo from '../images/burger.png';
import closeLogo from '../images/close.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {


  let block;
  let isGrid = false;
  //let visible = true;
  const location = useLocation();
  const [visible, setVisible] = React.useState(false);
  const [isHeaderGrid, setIsHeaderGrid] = React.useState(false);
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
        <Link to="/sign-up" className={'header__sign-up' + (isGrid? " header__sign-up_grid" : "")}>Регистрация</Link>
      )
      break;
    case "/sign-up":

      block = (
        <Link to="/sign-in" className={'header__sign-up' + (isGrid? " header__sign-up_grid" : "")}>Войти</Link>
      )
      break;
    case "/":
      console.log("ghghgf")
      isGrid = true;
      block = (
        <>
          <p className="header__email">{props.email}</p>
          <Link to="/sign-in" className={'header__sign-up' + (isGrid? " header__sign-up_grid" : "")} onClick={handleClick}>Выйти</Link>
        </>
      )
      break;
  }

  console.log(isGrid)

  return (
    <header className={'header' + (isGrid? " header_grid" : "")}>
      <img className="header__logo" src={headerLogo} alt="логотип"/>
      <img className={'header__burger' + (isGrid? " header__burger_grid" : "")} src={image} onClick={handleBurgerClick}/>
      <div className={'header__info' + (isGrid? " header__info_grid" : "") + ((!visible && isGrid)? " header__info_unvisible" : "")}>
        {block}
      </div>
    </header>
  )
}

export default Header;

//className={`popup popup_type_card` + (Object.keys(props.card).length ? " popup_opened" : "")}