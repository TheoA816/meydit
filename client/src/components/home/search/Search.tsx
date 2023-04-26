import { FaSearch } from "react-icons/fa"
import styles from './Search.module.css';

const Search = () => {

  return (
    <div className={styles.container}>
      <FaSearch/>
      <span>Tags</span>
      <span>Latest</span>
    </div>
  )
}

export default Search