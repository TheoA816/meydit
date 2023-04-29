import { useState, useEffect, useRef } from 'react'
import styles from './AddQuote.module.css'
import { FaPlus } from 'react-icons/fa';
import { Button, TextField } from '@mui/material';
import { useAuth } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from '../../../config/axios';
import { Quote } from '../../../../interfaces';
import { DatePicker } from '@mui/x-date-pickers';
import { AxiosError } from 'axios';

interface addQuoteProps {
  jobId: number
}

const AddQuote = ({ jobId }: addQuoteProps) => {
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLFormElement>(null!);

  const { user } = useAuth();
  
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote>({
    cost: 0,
    finishby: "8 May 2023",
    job: jobId,
    contact: user?.id!
  });

  useEffect(() => {
    const clickOutside = (e: Event) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setShowPanel(false);
    }
    document.addEventListener("mousedown", clickOutside);
    return () =>  document.removeEventListener("mousedown", clickOutside);
  }, [panelRef]);

  const handleCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuote((quote) => ({ ...quote, [name]: value.toLowerCase() }));
  };

  const handleDate = (date: Date | null) => {
    setQuote((quote) => ({ ...quote, finishby: date?.toDateString() }));
  };

  const pushQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if not logged in - redirect login
    if (user?.id! <= 0) return navigate('/login');
    // add job
    const params = { ...quote, contact: user?.id };
    try {
      await axios.post('/user/addquote', params);
    } catch (e: any) {
      return alert(e.response.data);
    }
    // reload page
    window.location.reload();
  }

  return (
    <>
      <div className={styles.container}>
        <FaPlus onClick={() => setShowPanel(!showPanel)}/>
      </div>

      { showPanel && 
        <div className={styles.panelBg}>
          <form ref={panelRef} className={styles.panelContainer} onSubmit={pushQuote}>

            {/* HEADING */}
            <span className={styles.heading}>Create a new quote for this job</span>

            <TextField className={styles.textField} label="Cost" variant="outlined" required size="small"
                       name="cost" value={quote.cost} onChange={handleCost}/>
            <DatePicker label="Estimated Finish" onChange={handleDate}/>

            <Button style={{ width: '100%', margin: '1em 0' }} type="submit" variant="outlined">Push out job</Button>
          </form>
        </div>
      }
    </>
  )
}

export default AddQuote