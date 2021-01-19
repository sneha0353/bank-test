import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import Navbar from "./navbar"
import axios from "axios"

const Transfer = () => {
    const [amount,setAmount] = useState('')
    const [accnum,setAccnum] = useState('')
    const history = useHistory()

    localStorage.setItem("set",JSON.stringify(3))

    const otp = () => {
        axios({
            method:'post',
            url:"http://localhost:7000/api/tester",
            headers:{
                "Content-Type":'application/json',
                Authorization:localStorage.getItem('token')
            }
        }).then(res=>console.log(res))
        .catch(err=>console.log(err))
        localStorage.setItem('amount',JSON.stringify(amount))
        localStorage.setItem('accnum',JSON.stringify(accnum))
        history.push('/checkotp')
    }
    
    const handleSubmit = () => {
        localStorage.removeItem('status')
        
    axios({
        method:'post',
        url:'http://localhost:7000/api/transfer',
        data:{
            amount:JSON.parse(localStorage.getItem('amount')),
            accnum:JSON.parse(localStorage.getItem('accnum'))
        },
        headers:{
            'Content-Type':'application/json',
            Authorization:localStorage.getItem('token')
        }
    }).then(function(response){
        console.log(response.data)
        localStorage.removeItem('amount')
        localStorage.removeItem('accnum')
        history.push('/')
    }).catch(function(response){
        console.log(response.data)
        localStorage.removeItem('amount')
        localStorage.removeItem('accnum')
        history.push('/')
    })
    }

    return(
        <div>
            <Navbar />
            <div className='container p-2 border mt-5' style={{borderRadius:'20px'}}>
                <h3 className='mt-2 mb-4'>Transfer Money from Your Account!</h3>
                
                {localStorage.getItem('amount') ?
                <div>
                <label for='accnum'>Account Number</label>
                <input className='form-control' type='number' name='accnum' placeholder="Enter the Account Number" value={JSON.parse(localStorage.getItem('accnum'))} />
                <label for='amount'>Enter the Amount to Tranfer</label>
                <input className='form-control' type='number' name='amount' placeholder="Amount" value={JSON.parse(localStorage.getItem('amount'))} />
                </div>
                :
                <div>
                <label for='accnum'>Account Number</label>
                <input className='form-control' type='number' name='accnum' placeholder="Enter the Account Number" onChange={e=>setAccnum(e.target.value)} />
                <label for='amount'>Enter the Amount to Tranfer</label>
                <input className='form-control' type='number' name='amount' placeholder="Amount" onChange={e=>setAmount(e.target.value)} />
                </div>
                }
                
                {localStorage.getItem('status') ? 
                <div>
                {localStorage.getItem('status')=='approved' ? 
                <div>
                {localStorage.getItem('amount') ? 
                <button className='btn btn-info btn-sm mt-3' onClick={handleSubmit()}>Transfer</button>
                :
                <button className='btn btn-info btn-sm mt-3' onClick={()=>handleSubmit()}>Transfer</button>
                }
                </div>
                :
                <button className='btn btn-info btn-sm mt-3' onClick={()=>otp()}>Verify OTP</button>
                }
                </div>
                :
                <button className='btn btn-info btn-sm mt-3' onClick={()=>otp()}>Verify OTP</button>
                }
            </div>
        </div>
    )
}

export default Transfer;