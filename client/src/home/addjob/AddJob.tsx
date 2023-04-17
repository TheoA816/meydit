import { FaPlus } from "react-icons/fa"
import styles from './AddJob.module.css';

const AddJob = () => {

  return (
    <div className={styles.container}>
      <FaPlus/>
      <span>New Quote</span>
    </div>
  )
}

export default AddJob