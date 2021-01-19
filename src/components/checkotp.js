import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import Navbar from "./navbar"
import axios from "axios"

const CheckOtp = () => {
    const [otp,setOtp] = useState('')
    const history = useHistory()
    const cotp = () => {
        axios({
            method:'post',
            url:'http://localhost:7000/api/checkotp',
            data:{
                otp
            },
            headers:{
                'Content-Type':'application/json',
                Authorization:localStorage.getItem('token')
            }
        }).then(function(response){
            console.log(response)
            //console.log('adsadasdasda',response[0].data)
            localStorage.setItem('status',response.data.status)
            if(JSON.parse(localStorage.getItem("set")==1))
            {
                history.push('/deposit')
            }
            else if(JSON.parse(localStorage.getItem("set")==2)){
                history.push('/withdraw')
            }
            else if(JSON.parse(localStorage.getItem("set")==3)){
                history.push('/transfer')
            }
            else if(JSON.parse(localStorage.getItem("set")==4)){
                history.push('/activatecard')
            }
            
        }).catch(function(response){
            localStorage.setItem('status',response.status)
            if(JSON.parse(localStorage.getItem("set")==1))
            {
                history.push('/deposit')
            }
            else if(JSON.parse(localStorage.getItem("set")==2)){
                history.push('/withdraw')
            }
            else if(JSON.parse(localStorage.getItem("set")==3)){
                history.push('/transfer')
            }
            else if(JSON.parse(localStorage.getItem("set")==4)){
                history.push('/activatecard')
            }
        })
    }
    

    return(
        <div>
        <Navbar />
            <div className='container'>
                <h2>Enter Your Otp</h2>
                <input type='text' placeholder='OTP' className='form-control'
                onChange={e=>setOtp(e.target.value)}
                />
                <button className='btn btn-sm btn-dark mt-2' onClick={()=>cotp()}>Submit</button>
            </div>
        </div>
    )
}

export default CheckOtp;