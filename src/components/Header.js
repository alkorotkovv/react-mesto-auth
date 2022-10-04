import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {

  let block;
  const location = useLocation();
  
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
          <Link to="/sign-in" className="header__sign-up">Выйти</Link>
        </>
      )
      break;
  }

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип"/>
      <div className="header__info">
        {block}
      </div>
      
    </header>
  )
}

export default Header;