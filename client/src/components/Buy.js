import React from 'react'
import "./Buy.css"
const ethers = require('ethers');


function Buy({state}) {
    const buyChai=async (event)=>{
        event.preventDefault();

        const {contract}=state;
        const name=document.querySelector("#name").value;
        const message=document.querySelector("#message").value;
        console.log(name,message,contract);

        const amount={value: ethers.parseEther("0.001")};
        const transaction=await contract.buyChai(name,message,amount);
        await transaction.wait();
        console.log("Transaction is Done");
    }

  return ( 
    <div className='buy'>
        <form onSubmit={buyChai}>
            <label>Name</label>
            <input className="input" type="text" id="name" placeholder='Enter Your Name'></input>
            <label>Message</label>
            <input className="input" type="text" id="message" placeholder='Enter your Message'></input>
            <button  type="submit"  className="button" disabled={!state.contract}>Pay</button>
        </form>
    </div>
  )
}

export default Buy