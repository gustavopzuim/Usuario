import React from 'react';
import styles from './Footer.module.css';
import { ReactComponent as Git } from '../Assets/git.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Git />
      <p>Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
