'use client';

import React, { useState , useEffect,useRef} from 'react';
import * as XLSX from 'xlsx';


export default function Home() {
  const [data, setData] = useState(null);
  const [result, setResult] = useState(null);
  const ref = useRef(null)


  useEffect(()=>{
    fetch("./data.xlsx")
    .then((response) => response.arrayBuffer())
    .then((data) => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
       setData(jsonData)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  const onSearchClick = () => {
    const matchResult =  data.find((result)=>{
     return result['רחוב '] === ref.current.value
    })
   
    setResult(matchResult?.['קו חלוקה '] || '')
  }
 
  return (
    <div style={{display:'flex', flexDirection:'column' , alignItems:'center'}}>
      <h1>חיפוש רחוב</h1>

    

      <div style={{display:'flex' , gap:'8px', marginBottom:'8px'}}>
      <label>הזן שם רחוב:{'     '}
      <input style={{padding:'0px 8px'}} type='text' ref={ref}/>
      </label>
      <button onClick={onSearchClick} >חיפוש</button>
      </div>

      {result &&(
        <>
      <p>רחוב: {ref.current.value}</p>
      <p>קו חלוקה: {result}</p> 
      </>)
      }

      {result === '' &&(
        <p>קו חלוקה - {ref.current.value} לא נמצא</p>
      )}
      
      
    </div>
  );
}
