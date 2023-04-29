import { useState } from 'react';
import { useAuth } from '../../../context/AuthProvider';
import styles from './Header.module.css';
import User from './User';
import { FaGithubAlt } from 'react-icons/fa';
import { Button } from '@mui/material';
import axios from '../../../config/axios';

const Header = () => {

  const { user } = useAuth();
  const [logout, setLogout] = useState(false);

  // logout
  const onClick = async () => {
    await axios.get('/logout');
    window.location.reload();
  }

  return (
    <div className={styles.header}>
      <FaGithubAlt/>
      <span className={styles.title}>Meydit</span>
      {user?.id! <= 0 ?
        <User/>
      :
        <div className={styles.account}>
          {logout && 
            <div className={styles.logoutContainer}>
              <Button variant='outlined' className={styles.logout} onClick={onClick}>
                Logout
              </Button>
            </div>
          }
          <img src={user?.profpic} referrerPolicy='no-referrer' className={styles.img} onClick={() => setLogout(!logout)}/>
        </div>
      }
    </div>
  )
}

export default Header