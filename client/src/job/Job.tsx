import styles from './Job.module.css'
import Customer from './Customer'
import Order from './Order'
import ImageUpload from '../helpers/ImageUpload'
import QuoteCard from './quote/QuoteCard'
import { FaPlus } from 'react-icons/fa'
import AddQuote from './addquote/AddQuote'

const Job = () => {

  return (
    <>

    {/* JOB DETAILS */}
    <div className={styles.jobContainer}>
      {/* IMAGE */}
      <div className={styles.img}>
        <ImageUpload/>
      </div>
      {/* DETAILS */}
      <div className={styles.details}>
        <Customer/>
        <Order/>
      </div>
    </div>

    {/* QUOTE DETAILS */}
    <div className={styles.quoteContainer}>
      <div className={styles.quoteHeader}>
        <span className={styles.title}>Quotes</span>
        <AddQuote/>
      </div>
      <QuoteCard/>
    </div>

    </>
  )
}

export default Job