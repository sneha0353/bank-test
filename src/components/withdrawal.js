import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import Navbar from "./navbar"
import axios from "axios"

const Withdrawal = () => {
    const [amount,setAmount] = useState('')
    const history = useHistory()

    localStorage.setItem("set",JSON.stringify(2))

    // const otp = () => {
    //     axios({
    //         method:'post',
    //         url:"http://localhost:7000/api/tester",
    //         headers:{
    //             "Content-Type":'application/json',
    //             Authorization:localStorage.getItem('token')
    //         }
    //     }).then(res=>console.log(res))
    //     .catch(err=>console.log(err))
    //     localStorage.setItem('amount',JSON.stringify(amount))
    //     history.push('/checkotp')
    // }
    
    const handleSubmit = () => {
        localStorage.removeItem('status')
        
    axios({
        method:'put',
        url:'http://localhost:7000/api/withdraw',
        data:{
            withdraw:amount//JSON.parse(localStorage.getItem('amount'))
        },
        headers:{
            'Content-Type':'application/json',
            Authorization:localStorage.getItem('token')
        }
    }).then(function(response){
        console.log(response.data)
        localStorage.removeItem('amount')
        history.push('/')
    }).catch(function(response){
        console.log(response.data)
        localStorage.removeItem('amount')
        history.push('/')
    })
    }

    return(
        <div>
            <Navbar />
            <div className='container p-2 border mt-5' style={{borderRadius:'20px'}}>
                <h3 className='mt-2 mb-4'>Withdraw Money from Your Account!</h3>
                <label for='amount'>Enter the Amount to be Withdrawn</label>
                {localStorage.getItem('amount') ? 
                <input className='form-control' type='number' name='amount' placeholder="Amount" value={JSON.parse(localStorage.getItem('amount'))} />
                :
                <input className='form-control' type='number' name='amount' placeholder="Amount" onChange={e=>setAmount(e.target.value)} />
                }
                
                {/* {localStorage.getItem('status') ? 
                <div>
                {localStorage.getItem('status')=='approved' ? 
                <div>
                {localStorage.getItem('amount') ? 
                <button className='btn btn-info btn-sm mt-3' onClick={handleSubmit()}>Withdraw</button>
                :
                <button className='btn btn-info btn-sm mt-3' onClick={()=>handleSubmit()}>Withdraw</button>
                }
                </div>
                :
                <button className='btn btn-info btn-sm mt-3' onClick={()=>otp()}>Verify OTP</button>
                }
                </div>
                :
                <button className='btn btn-info btn-sm mt-3' onClick={()=>otp()}>Verify OTP</button>
                }*/}
                <button onClick={() => handleSubmit()} >Withdraw</button>
            </div>
        </div>
    )
}

export default Withdrawal;