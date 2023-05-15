import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import MonashLab from '../UI/MonashLab.js';

const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
          <div className={classes.monash_icon}>
            <MonashLab />
          </div>
          <div className={classes.buttons}>
            <span> <Link to ="/"> Home</Link></span>
            <span><Link to="/review">Persona History</Link></span>
            <span>Setting</span>
          </div>
      </header>
    </Fragment>
  );
};

export default Header;