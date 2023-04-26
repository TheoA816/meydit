import { useState } from 'react';
import styles from './ImageUpload.module.css'
import Image from './Image';
import { myFile } from '../../../interfaces';

interface imageUploadProps {
  files: myFile[],
  setFiles: React.Dispatch<React.SetStateAction<myFile[]>>
}

const ImageUpload = ({ files, setFiles }: imageUploadProps) => {

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    // get data uri and save data
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const myFile = { file: file!, url: fileReader.result as string };
      setFiles([...files, myFile]);
    }
    fileReader.readAsDataURL(file!);
  };

  return (
    <div className={styles.container}>
      <input id="img-input" type="file" accept="image/*" onChange={handleFileSelect} className={styles.input} />
      <label htmlFor="img-input" className={styles.label}>
        Upload image
      </label>

      {files.map((myFile, idx) => (
        <Image myFile={myFile} key={idx} files={files} setFiles={setFiles}/>
      ))}
    </div>
  );
}

export default ImageUpload