import styles from './Header.module.css';
import Options from './Options';
import { FaGithubAlt } from 'react-icons/fa';

const Header = () => {

  return (
    <div className={styles.header}>
      <FaGithubAlt/>
      <span className={styles.title}>Meydit</span>
      <Options/>
    </div>
  )
}

export default Header