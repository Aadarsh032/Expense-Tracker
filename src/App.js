import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
   const[amount,setAmount] = useState(0);
   const[expear,setExpEar] = useState('');
   const [date,setDate]=useState('');
   const [sum,setSum]=useState(0);
   const expenseEarnings = useRef(null);
   const hiddenh1 = useRef(null);

   const contentRef =useRef(null);
  
   function handleDownload()
   {
     const content = contentRef.current.innerText;
     const finalcontent = content.replaceAll("Delete","");
     const blob = new Blob([finalcontent],{ type: 'text/plain;charset=utf-8' });
     saveAs(blob, 'content.txt');
    }

    function handledelete(event)
    {
       var remove = event.target.parentElement
       var numstr=  remove.innerText.split(" ");
       var numstr2 = numstr[4].split("\n");
       var numtoberemoved = parseFloat(numstr2[0]);
       
      var totsumstrarr= hiddenh1.current.innerText.split(" ")
      var currenttotsumnum = parseFloat(totsumstrarr[3]);
      var totsum = (currenttotsumnum-(numtoberemoved)).toFixed(2);
      setSum(totsum);
      remove.remove();
    };
    
    
   const addExpenseEarnings = ()=>
   {

      const element = document.createElement('h1');
      const sumint= parseFloat(sum);
      const amountint= parseFloat(amount);
      const totsum = sumint+amountint;
      setSum(totsum);
       
      
      element.innerHTML=`${date+"   ----- "}${expear} ${"------  "+amount}`
      element.style.display="flex";
      element.style.flexDirection="row";
      


      const deletebutton = document.createElement('button')
      deletebutton.innerText=" Delete";
      deletebutton.style.backgroundColor="red";
      deletebutton.style.marginLeft="20px"
      deletebutton.style.cursor="pointer"
      deletebutton.addEventListener("click",(event)=>handledelete(event))
      element.appendChild(deletebutton);
     

      if(amount!=0  && expear!=undefined )
      {
        expenseEarnings.current.appendChild( element);
      }

   }

  return (
    <div id='mainbox' >
        <h1>Expense Tracker<sub id='subscript_text'>-By Aadarsh</sub></h1>
        <div id="content" >
           <div className='entries'>
            <label>Date : </label><input id='dateinput' type='date' value={date} onChange={(event)=>setDate(event.target.value)}></input>
            <br />
            <br />
            <label>Items : </label><input id='itemsinput' type='text' placeholder='Expense/Earnings' value={expear} onChange={(event)=>{ setExpEar(event.target.value)}}></input>
            <br />
            <br />
            <label>Amount : </label><input id='amountinput' type='number'  placeholder='Amount' value={amount} onChange={(event)=>setAmount(event.target.value)}></input>
            <br />
            <br />
            <div className='buttonsdiv'>
            <button id='expearbutton' onClick={()=>{  addExpenseEarnings()  }}> Add Expense / Earnings </button>
            <button onClick={handleDownload}>Download</button>
            </div>
            </div>
            <div ref={contentRef}>
              {/* <h1>----Date --------- Item ------ Amount--</h1> */}
            <div ref={expenseEarnings} >
               {/* Expense/Earnings Tags*/}
            </div>
            <h1 ref={hiddenh1} >Total Sum ----------------------{"  "+sum}</h1>
            </div>
        </div>
    </div>
  );
}

export default App;
