import { Link } from 'react-router-dom'
import styles from './Pages.module.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface pageProps {
  page: number,
  jobCount: number
}

const Pages = ({ page, jobCount }: pageProps) => {

  return (
    <div className={styles.container}>

      {page != 0 && <Link to={`/${(page - 1)}`}>
        <FaArrowLeft className={styles.button}/>
      </Link>}

      {!(page == 0 && jobCount == 0) && <span className={styles.button}>{ page }</span>}

      {jobCount == 9 && <Link to={`/${(page + 1)}`}>
        <FaArrowRight className={styles.button}/>
      </Link>}

    </div>
  )
}

export default Pages