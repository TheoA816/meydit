import { FaPlus } from "react-icons/fa"
import styles from './AddQuote.module.css';

const AddQuote = () => {

  return (
    <div className={styles.container}>
      <FaPlus/>
      <span>New Quote</span>
    </div>
  )
}

export default AddQuote