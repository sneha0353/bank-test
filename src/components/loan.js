import React,{useState,useEffect} from "react"

const Loan=()=>{
    const[loan,setLoan]=useState()
    const[sdate,setSdate]=useState()
    const [edate,setEdate]=useState()

    const handleSubmit=e=>{
        e.preventDefault()
        fetch("http://localhost:7000/api/loan",{
            method:"POST",
            headers:{
                Authorization:localStorage.getItem('token'),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                l_amt:loan,
                l_start:sdate,
                l_end:edate
            })
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }
    return(
        <>
        <form>
      <div class="form-group">
      <label for="exampleInputEmail1">Loan Amount</label>
      <input type="text" 
      class="form-control" 
      onChange={e=>setLoan(e.target.value)}
      id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter loan amount"/>
      </div>
    <div class="form-group">
    <label for="exampleInputPassword1">Start Date</label>
    <input type="date" 
    onChange={e=>setSdate(e.target.value)}
    class="form-control" id="exampleInputPassword1" placeholder="Start Date"/>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">End Date</label>
    <input type="date" 
    onChange={e=>setEdate(e.target.value)}
    class="form-control" id="exampleInputPassword1" placeholder="End Date"/>
  </div>
  <button type="submit" 
  onClick={e=>handleSubmit(e)}
  class="btn btn-primary">Submit</button>
</form>
</>
    )
}


export default Loan;