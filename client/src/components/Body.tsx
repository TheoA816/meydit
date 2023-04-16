import styles from './Body.module.css';
import AddQuote from './addquote/AddQuote';
import Search from './search/Search';

const Body = () => {

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <Search/>
        <AddQuote/>
      </div>
    </div>
  )
}

export default Body