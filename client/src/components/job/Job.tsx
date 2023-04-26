import styles from './Job.module.css'
import Customer from './Customer'
import Order from './Order'
import QuoteCard from './quote/QuoteCard'
import AddQuote from './addquote/AddQuote'
import { useLoaderData } from 'react-router-dom'
import { Job as JobType } from '../../../interfaces'
import Image from './Image'

const Job = () => {

  const job = useLoaderData() as JobType;
  console.log(job)

  return (
    job ?
      <>
      {/* JOB DETAILS */}
      <div className={styles.jobContainer}>
        {/* IMAGE */}
        <div className={styles.imgContainer}>
          <img src={job.images[0]} alt='no picture found' className={styles.mainImg}/>
          <div className={styles.smallImgs}>
            {job.images.map((url) => <Image url={url}/>)}
          </div>
        </div>
        {/* DETAILS */}
        <div className={styles.details}>
          <Customer />
          <Order job={job}/>
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
  :
    <span>No Job Found</span>
  )
}

export default Job