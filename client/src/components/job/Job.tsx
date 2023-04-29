import styles from './Job.module.css'
import Customer from './Customer'
import Order from './order/Order'
import QuoteCard from './quote/QuoteCard'
import AddQuote from './addquote/AddQuote'
import { useLoaderData } from 'react-router-dom'
import { Job as JobType, Quote } from '../../../interfaces'
import { FaGreaterThan, FaHome, FaLessThan } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from '../../config/axios'
import { useAuth } from '../../context/AuthProvider'
import { Link } from 'react-router-dom'

interface LoadedData {
  job: JobType,
  quoteList: Quote[]
}

const Job = () => {

  const { job, quoteList } = useLoaderData() as LoadedData;
  const [img, setImg] = useState(0);
  const { user, setUser } = useAuth();

  const [quotes, setQuotes] = useState<Quote[]>([]);
  
  useEffect(() => {
    const checkLogin = async () => {
      const res = (await axios.get('/isloggedin')).data;
      if (res.err) setUser({ id: -1, email: "Invalid", profpic: "Invalid", name: "Invalid" });
      else setUser({ id: res.id, email: res.email, profpic: res.profpic, name: res.name });
    }
    checkLogin();
    setQuotes(quoteList);
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
      <Link to={'/'}><FaHome className={styles.home}/></Link>
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
        { quotes.map((quote, idx) => 
          <QuoteCard quotes={quotes} setQuotes={setQuotes} idx={idx} key={quote.id}/>)
        }
      </div>
    </>
  :
    <span>No Job Found</span>
  )
}

export default Job