import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.css';
import MonashLab from '../UI/MonashLab.js';
import { AuthContext } from '../../shared/context/Auth-context'; 
import { useContext,useEffect,useState } from 'react';
const Header = () => {
  const auth = useContext(AuthContext);  // Access the context
  const [_, forceUpdate] = useState();

   useEffect(() => {
      forceUpdate({});  // Force a re-render whenever auth changes
   }, [auth.isLoggedIn]);

   console.log("Auth state in Header: ", auth.isLoggedIn);

  return (
    <Fragment>
      <header className={classes.header}>
         <Link to ="/">
            <div className={classes.monash_icon} >
              <MonashLab />
            </div>
          </Link>
          <div className={classes.buttons}>
            <span> <Link to ="/"> Home</Link></span>
            <span><Link to="/review">Persona History</Link></span>

            {/* Conditionally render based on authentication state */}
            {auth.isLoggedIn ? (
              <span onClick={auth.logout}>Sign Out</span>  // If logged in, show Sign Out and call logout function on click
            ) : (
              <span><Link to="/signin">Sign In</Link></span> // If not logged in, show Sign In link
            )}
          </div>
      </header>
    </Fragment>
  );
};

export default Header;