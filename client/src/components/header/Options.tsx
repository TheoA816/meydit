import styles from './Header.module.css';
import { FaPlus, FaUserAlt } from "react-icons/fa";

const Options = () => {
  return (
    <div className={styles.options}>
      <FaPlus/>
      <FaUserAlt/>
    </div>
  )
}

export default Options