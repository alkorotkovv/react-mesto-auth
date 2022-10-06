import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {


  let block;
  const location = useLocation();

  function handleClick() {
    localStorage.removeItem('token');
  }

  function handleBurgerClick() {
    console.log("bclick");
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
      <div className="header__burger" onClick={handleBurgerClick}></div>
      <div className="header__info">
        {block}
      </div>      
    </header>
  )
}

export default Header;