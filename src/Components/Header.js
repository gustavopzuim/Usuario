import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Home } from '../Assets/home.svg';
import { UserContext } from '../UserContext';

const Header = () => {
  const { data } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Home">
          <Home />
        </Link>
        <Link className={styles.login} to="/login">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
