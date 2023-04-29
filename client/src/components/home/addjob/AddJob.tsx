import { FaPlus } from "react-icons/fa"
import styles from './AddJob.module.css';
import { useEffect, useRef, useState } from "react";
import { TextField, InputAdornment, Button } from '@mui/material';
import ImageUpload from "../../image/ImageUpload";
import { Job, myFile } from "../../../../interfaces";
import axios from "../../../config/axios";
import { useAuth } from "../../../context/AuthProvider";
import { useNavigate, useParams } from "react-router-dom";

const AddJob = () => {

  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef<HTMLFormElement>(null!);
  const { user } = useAuth();
  const navigate = useNavigate();

  // param for submit call
  const [order, setOrder] = useState({
    clothing: '',
    material: '',
    budget: 0,
    descr: '',
    contact: 0,
  });
  const [addr, setAddr] = useState({
    city: '',
    country: '',
    state: '',
    zipcode: 0
  })
  const [files, setFiles] = useState<myFile[]>([]);

  // change inputs based on text value
  const handleOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setOrder((values) => ({ ...values, [name]: value.toLowerCase() }));
  };

  const handleAddr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setAddr((values) => ({ ...values, [name]: value.toLowerCase() }));
  };

  // close panel by clicking outside
  useEffect(() => {
    const clickOutside = (e: Event) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setShowPanel(false);
    }
    document.addEventListener("mousedown", clickOutside);
    return () =>  document.removeEventListener("mousedown", clickOutside);
  }, [panelRef]);

  // submit api call - add job
  const pushJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if not logged in - redirect login
    if (user?.id! <= 0) return navigate('/login');
    // add job
    const params: Job = { ...order, addr: addr, images: files.map((file) => file.url) };
    await axios.post('/user/addjob', params);
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
          <form ref={panelRef} className={styles.panelContainer} onSubmit={pushJob}>

            {/* HEADING */}
            <span className={styles.heading}>Fill this form out to put out a new job order!</span>

            {/* BOX */}
            <div className={styles.order}>
              <div className={styles.img}>
                <ImageUpload files={files} setFiles={setFiles}/>
              </div>

              {/* ORDER FIELDS */}
              <div className={styles.orderDetails}>
                <TextField className={styles.textField} label="Clothing Type" variant="outlined" required size="small" 
                           name="clothing" value={order.clothing} onChange={handleOrder} />
                <TextField className={styles.textField} label="Material Wanted" variant="outlined" required size="small" 
                           name="material" value={order.material} onChange={handleOrder} />
                <TextField className={styles.textField} label="Budget" variant="outlined" size="small"
                           name="budget" value={order.budget}  onChange={handleOrder}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />

                {/* CONTACT FIELDS */}
                <div className={styles.contact}>
                  <span className={styles.heading}>Contact</span>
                  <TextField className={styles.textField} label="City" variant="outlined" required size="small"
                             name="city" value={addr.city} onChange={handleAddr} />
                  <TextField className={styles.textField} label="State" variant="outlined" required size="small"
                             name="state" value={addr.state} onChange={handleAddr}/>
                  <TextField className={styles.textField} label="Country" variant="outlined" required size="small"
                             name="country" value={addr.country} onChange={handleAddr}/>
                  <TextField className={styles.textField} label="Zip Code" variant="outlined" required size="small"
                             name="zipcode" value={addr.zipcode} onChange={handleAddr}/>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <TextField style={{ width: '100%' }} label="Description" multiline rows={4}
              placeholder="Put any other additional information here! Be as descriptive as you want"
              name="descr" value={order.descr} onChange={handleOrder}
            />
            <Button style={{ width: '100%', margin: '1em 0' }} variant="outlined" type="submit">Push out job</Button>
          </form>
        </div>
      }
    </>
  )
}

export default AddJob