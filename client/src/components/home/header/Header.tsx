import { useAuth } from '../../../context/AuthProvider';
import styles from './Header.module.css';
import User from './User';
import { FaGithubAlt } from 'react-icons/fa';

const Header = () => {

  const { user } = useAuth();

  return (
    <div className={styles.header}>
      <FaGithubAlt/>
      <span className={styles.title}>Meydit</span>
      {user?.id! <= 0 ?
        <User/>
      :
        <img src={user?.profpic} referrerPolicy='no-referrer' className={styles.img}/>
      }
    </div>
  )
}

export default Header