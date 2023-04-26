import { useState, useEffect, useRef } from 'react'
import styles from './AddQuote.module.css'
import { FaPlus } from 'react-icons/fa';
import { Button, TextField } from '@mui/material';

const AddQuote = () => {
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const clickOutside = (e: Event) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setShowPanel(false);
    }
    document.addEventListener("mousedown", clickOutside);
    return () =>  document.removeEventListener("mousedown", clickOutside);
  }, [panelRef]);

  return (
    <>
      <div className={styles.container}>
        <FaPlus onClick={() => setShowPanel(!showPanel)}/>
        <span>New Quote</span>
      </div>

      { showPanel && 
        <div className={styles.panelBg}>
          <div ref={panelRef} className={styles.panelContainer}>

            {/* HEADING */}
            <span className={styles.heading}>Create a new quote for this job</span>

            <TextField className={styles.textField} label="Email / Phone" variant="outlined" required size="small" />
            <TextField className={styles.textField} label="Cost" variant="outlined" required size="small" />
            <TextField className={styles.textField} label="Timeframe" variant="outlined" required size="small" />

            <Button style={{ width: '100%', margin: '1em 0' }} variant="outlined">Push out job</Button>
          </div>
        </div>
      }
    </>
  )
}

export default AddQuote