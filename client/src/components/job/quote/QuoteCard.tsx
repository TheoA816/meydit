import { useEffect, useState } from 'react'
import { Quote, User } from '../../../../interfaces'
import styles from './QuoteCard.module.css'
import axios from '../../../config/axios'

interface quoteCardProps {
  quote: Quote
}

const QuoteCard = ({ quote }: quoteCardProps) => {

  const [maker, setMaker] = useState<User>(null!);

  useEffect(() => {
    const loadMaker = async () => {
      const newMaker = await axios.get('/getuser', { params: { id: quote.contact }});
      setMaker(newMaker.data);
    }
    loadMaker();
  }, [])

  return (
    <div className={styles.container}>

      <div className={styles.profile}>
        <img className={styles.img} src={maker?.profpic}/>
        <span className={styles.data}>{maker?.name}</span>
      </div>

      <div>
        <span className={styles.property}>Cost: </span>
        <span className={styles.data}>{quote.cost}</span>
      </div>

      <div>
        <span className={styles.property}>Est Finish: </span>
        <span className={styles.data}>{quote.finishby}</span>
      </div>
    </div>
  )
}

export default QuoteCard