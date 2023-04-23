import styles from './QuoteCard.module.css'
import Img from '../../assets/timetable.png'

const QuoteCard = () => {

  return (
    <div className={styles.container}>
      <img className={styles.img} src={Img}/>
      <span className={styles.data}>Name Here</span>
      <span className={styles.data}>Cost</span>
      <span className={styles.data}>Timeframe</span>
    </div>
  )
}

export default QuoteCard