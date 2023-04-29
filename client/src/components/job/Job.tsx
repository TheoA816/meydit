import styles from './Job.module.css'
import Customer from './Customer'
import Order from './Order'
import QuoteCard from './quote/QuoteCard'
import AddQuote from './addquote/AddQuote'
import { useLoaderData } from 'react-router-dom'
import { Job as JobType, Quote } from '../../../interfaces'
import { FaGreaterThan, FaLessThan } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from '../../config/axios'
import { useAuth } from '../../context/AuthProvider'

interface LoadedData {
  job: JobType,
  quotes: Quote[]
}

const Job = () => {

  const { job, quotes } = useLoaderData() as LoadedData;
  const [img, setImg] = useState(0);
  const { user, setUser } = useAuth();
  console.log(user)

  useEffect(() => {
    const checkLogin = async () => {
      const res = (await axios.get('/isloggedin')).data;
      if (res.err) setUser({ id: -1, email: "Invalid", profpic: "Invalid", name: "Invalid" });
      else setUser({ id: res.id, email: res.email, profpic: res.profpic, name: res.name });
    }
    checkLogin();
  }, [])

  const incrImg = () => {
    if (img < job.images.length - 1) setImg(img + 1);
  }

  const decrImg = () => {
    if (img > 0) setImg(img - 1);
  }

  return (
    job ?
      <>
      {/* JOB DETAILS */}
      <div className={styles.jobContainer}>
        {/* IMAGE */}
        <div className={styles.imgContainer}>
          <img src={job.images[img]} alt='no picture found' className={styles.mainImg}/>
          <div className={styles.imgDirectory}>
            <FaLessThan onClick={decrImg}/>
            <FaGreaterThan onClick={incrImg}/>
          </div>
        </div>
        {/* DETAILS */}
        <div className={styles.details}>
          <Customer custId={job.contact}/>
          <Order job={job}/>
        </div>
      </div>

      {/* QUOTE DETAILS */}
      <div className={styles.quoteContainer}>
        <div className={styles.quoteHeader}>
          <span className={styles.title}>Quotes</span>
          <AddQuote jobId={job.id!}/>
        </div>
        { quotes.map((quote, idx) => <QuoteCard quote={quote} key={quote.id}/>) }
      </div>
    </>
  :
    <span>No Job Found</span>
  )
}

export default Job