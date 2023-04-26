import styles from './Job.module.css'
import Img from '../../assets/timetable.png';
import { FaPhoneAlt, FaHome } from 'react-icons/fa'

const Customer = () => {
  return (
    <div className={styles.customer}>

      {/* IMAGE */}
      <img className={styles.custImg} src={Img}/>

      {/* DETAILS */}
      <div className={styles.custDetails}>
        <span className={styles.title}>Name Here</span>
        <div className={styles.custInfo}>
          <span className={styles.info}><FaPhoneAlt/></span>
          <span className={styles.info}><FaHome/></span>
        </div>
      </div>
    </div>
  )
}

export default Customer