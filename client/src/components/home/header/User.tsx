import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { FaPlus, FaUserAlt } from "react-icons/fa";

const User = () => {
  
  return (
    <div className={styles.user}>
      <Link to={'/login'}><FaUserAlt/></Link>
    </div>
  )
}

export default User