import { useEffect, useState } from 'react'
import { Quote, User } from '../../../../interfaces'
import styles from './QuoteCard.module.css'
import axios from '../../../config/axios'
import { FaPencilAlt, FaTrash } from 'react-icons/fa'
import { useAuth } from '../../../context/AuthProvider'
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

interface quoteCardProps {
  quotes: Quote[]
  setQuotes: React.Dispatch<React.SetStateAction<Quote[]>>
  idx: number
}

const QuoteCard = ({ quotes, setQuotes, idx }: quoteCardProps) => {

  const [quote, setQuote] = useState(quotes[idx]);
  const [maker, setMaker] = useState<User>(null!);
  const [edit, setEdit] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const loadMaker = async () => {
      const newMaker = await axios.get('/getuser', { params: { id: quote.contact }});
      setMaker(newMaker.data);
    }
    loadMaker();
  }, [])

  const handleCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuote((quote) => ({ ...quote, [name]: value.toLowerCase() }));
  };

  const handleDate = (date: Date | null) => {
    setQuote((quote) => ({ ...quote, finishby: date?.toDateString() }));
  };

  const delQuote = async () => {
    await axios.delete('/user/delquote', { params: { id: quote.id }});
    setQuotes(quotes.filter((q) => q !== quote));
  }

  const saveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post('/user/editquote', quote);
    window.location.reload();
  }

  return (
    <div className={styles.container}>

      <div className={styles.details}>
        <div className={styles.profile}>
          <img className={styles.img} src={maker?.profpic} referrerPolicy='no-referrer'/>
          <span className={styles.data}>{maker?.name}</span>
        </div>

        <div className={styles.detailContainer}>
          <span className={styles.property}>Cost: </span>
          { edit ?
            <TextField className={styles.textField} label="Cost" variant="outlined" required size="small"
            name="cost" value={quote.cost} onChange={handleCost}/>
          :
            <span className={styles.data} contentEditable={edit} suppressContentEditableWarning={edit}>
              {quote.cost}
            </span>
          }
        </div>

        <div className={styles.detailContainer}>
          <span className={styles.property}>Est Finish: </span>
          { edit ?
            <DatePicker label='Estimated Finish' onChange={handleDate}/>
          :
            <span className={styles.data}>{quote.finishby}</span>
          }
        </div>
      </div>

      { maker?.id === user?.id &&
        <form className={styles.modify} onSubmit={saveEdit}>
          { edit && <Button type="submit" variant="outlined">Save</Button> }
          <FaPencilAlt onClick={() => setEdit(!edit)} className={styles.icon}/>
          <FaTrash onClick={delQuote} className={styles.icon}/>
        </form>
      }
    </div>
  )
}

export default QuoteCard