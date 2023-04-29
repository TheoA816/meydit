import { Job } from '../../../interfaces'
import styles from './Job.module.css'

interface orderProps {
  job: Job
}

const Order = ({ job }: orderProps) => {

  return (
    <div className={styles.order}>

      {/* order deets */}
      <div className={styles.orderData}>
        <span className={styles.ordTitle}>{job.clothing}</span>
      </div>

      <div className={styles.orderDetail}>
        <span className={styles.property}>Material</span>
        <span>{job.material}</span>
      </div>

      <div className={styles.orderDetail}>
        <span className={styles.property}>Budget</span>
        <span>{job.budget}</span>
      </div>

      {/* description */}
      <div className={styles.orderDetail}>
        <span className={styles.descProperty}> Additional Information </span>
        <div className={styles.desc}>
          {job.descr}
        </div>
      </div>
    </div>
  )
}

export default Order
