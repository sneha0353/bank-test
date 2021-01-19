import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import Navbar from "./navbar"
import axios from "axios"

const ActivateCard = () => {

    const [card_number,setCard_number] = useState('')
    const [valid,setValid] = useState('')

    const history = useHistory()

    localStorage.setItem("set",JSON.stringify(4))
    console.log(valid);

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
        localStorage.setItem('card_num',JSON.stringify(card_number))
        localStorage.setItem('valid',JSON.stringify(valid))
        history.push('/checkotp')
    }
    
    const handleSubmit = () => {
        localStorage.removeItem('status')
    axios({
        method:'post',
        url:'http://localhost:7000/api/activate-card',
        data:{
            card_number:JSON.parse(localStorage.getItem('card_num')),
            valid:JSON.parse(localStorage.getItem('valid'))
        },
        headers:{
            'Content-Type':'application/json',
            Authorization:localStorage.getItem('token')
        }
    }).then(function(response){
        console.log(response.data)
        localStorage.removeItem('card_num')
        localStorage.removeItem('valid')
        history.push('/')
    }).catch(function(response){
        console.log(response.data)
        localStorage.removeItem('card_num')
        localStorage.removeItem('valid')
        history.push('/')
    })
    }

    return(
        <div>
            <Navbar />
            <div className='container p-2 border mt-5' style={{borderRadius:'20px'}}>
                <h3 className='mt-2 mb-4'>Activate Your Card!</h3>
                
                {localStorage.getItem('card_num') && localStorage.getItem('valid') ?
                <div>
                <label for='cnum'>Enter the Card Number</label> 
                <input className='form-control' type='number' name='cnum' placeholder="Card Number" value={JSON.parse(localStorage.getItem('card_num'))} />
                <label for='valid'>Valid Thru</label>
                <input className='form-control' type='number' name='valid' placeholder="Valid" value={JSON.parse(localStorage.getItem('valid'))} />
                </div>
                :
                <div>
                <label for='cnum'>Enter the Card Number</label>
                <input className='form-control' type='number' name='cnum' placeholder="Card Number" onChange={e=>setCard_number(e.target.value)} />
                <label for='valid'>Valid Thru</label>
                <input className='form-control' type='date' name='valid' placeholder="Valid" onChange={e=>setValid(e.target.value)} />
                </div>
                }
                
                {localStorage.getItem('status') ? 
                <div>
                {localStorage.getItem('status')=='approved' ? 
                <div>
                {localStorage.getItem('card_num') ? 
                <button className='btn btn-info btn-sm mt-3' onClick={handleSubmit()}>Activate Card</button>
                :
                <button className='btn btn-info btn-sm mt-3' onClick={()=>handleSubmit()}>Activate Card</button>
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

export default ActivateCard;