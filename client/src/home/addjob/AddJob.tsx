import { FaPlus } from "react-icons/fa"
import styles from './AddJob.module.css';
import { useEffect, useState } from "react";
import { TextField, InputAdornment, Button } from '@mui/material';

const AddJob = () => {

  const [showPanel, setShowPanel] = useState(false);

  // useEffect(() => {
  //   if (showPanel) document.body.style.overflow = 'hidden';
  //   else document.body.style.overflow = 'auto';
  // }, [showPanel])

  return (
    <>
      <div className={styles.container}>
        <FaPlus onClick={() => setShowPanel(!showPanel)}/>
        <span>New Quote</span>
      </div>

      { showPanel && 
        <div className={styles.panelBg}>
          <div className={styles.panelContainer}>

            {/* HEADING */}
            <span className={styles.heading}>Fill this form out to put out a new job order!</span>

            {/* BOX */}
            <div className={styles.order}>
              <div className={styles.img}></div>

              {/* ORDER FIELDS */}
              <div className={styles.orderDetails}>
                <TextField className={styles.textField} label="Clothing Type" variant="outlined" required size="small" />
                <TextField className={styles.textField} label="Budget" variant="outlined" size="small"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
                <TextField className={styles.textField} label="No. of Clothing" type="number" variant="outlined" required size="small" />

                {/* CONTACT FIELDS */}
                <div className={styles.contact}>
                  <span className={styles.heading}>Contact</span>
                  <TextField className={styles.textField} label="Street Address" variant="outlined" required size="small" />
                  <TextField className={styles.textField} label="City" variant="outlined" required size="small" />
                  <TextField className={styles.textField} label="Country" variant="outlined" required size="small" />
                  <TextField className={styles.textField} label="Zip Code" variant="outlined" required size="small" />
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <TextField style={{ width: '100%' }} label="Description" multiline rows={4} 
              defaultValue="Put any other additional information here! Be as descriptive as you want"
            />
            <Button style={{ width: '100%', margin: '1em 0' }} variant="outlined">Push out job</Button>
          </div>
        </div>
      }
    </>
  )
}

export default AddJob