import React, { useEffect, useState } from "react"
import {toast,ToastContainer} from "react-toastify"
import {useHistory} from "react-router-dom"
import Test from "./test"

const Register = () => {
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [address,setAddress] = useState('')
    const [user,setUser] = useState('')
    const [mobile,setMobile] = useState('')
    const [gender,setGender] = useState('')
    const [accnt_type,setAccnt_type] = useState('')
    const [sec_q,setSet_q] = useState('')
    const [sec_a,setSec_a] = useState('')
    const [pin,setPin] = useState('')
    const [state,setState] = useState('')
    const [country,setCountry] = useState('')
    const [city,setCity] = useState('')
    const [dob,setDob] = useState('')
    const [msg,setMsg] = useState('')

    const history = useHistory()

    setInterval(function() {  
        if(localStorage.getItem('msg')){
            setMsg('success')
            return
        }
    }, 2000); 

    useEffect(()=>{
        localStorage.removeItem("msg")
        fetch("http://localhost:7000/api/user",{
            method:"GET",
            headers:{
                "Content-Type":'application/json',
                Authorization:localStorage.getItem('token')
            }
        }).then(res=>res.json())
        .then(data => {
            console.log(data)
            setUser(data)
        })
    },[])
    const getPin=e=>{
        setState("")
        setCountry("")
        setCity("")
        if(e.target.value.length===6)
        {
            fetch(`https://api.postalpincode.in/pincode/${e.target.value}`)
            .then(res=>res.json())
            .then(data=>{
                if(data[0].PostOffice)
                {
                document.getElementById("state").value=data[0].PostOffice[0].State
                setState(data[0].PostOffice[0].State)
                document.getElementById("country").value=data[0].PostOffice[0].Country
                setCountry(data[0].PostOffice[0].Country)
                document.getElementById("city").value=data[0].PostOffice[0].District
                setCity(data[0].PostOffice[0].District)
            }
            else{
                setState("")
                setCountry("")
                setCity("")
                 console.log("not found")
            }
        })
        }
    }

    const handleSubmit = () => {
        fetch("http://localhost:7000/api/register",
        {
            method:'POST',
            headers:{
                'Content-Type':"application/json",
                Authorization:localStorage.getItem('token')
            },
            body:JSON.stringify({
                firstname,
                lastname,
                pin,
                address,
                accnt_type,
                gender,
                mobile,
                sec_q,
                sec_a,
                city,
                state,
                country,
                dob
            })
        }
        )
        .then(res=>res.json())
        .then(data=>{
            if(data.error){
                return toast(data.error,{type:'error'})
            }
            console.log(data)
            history.push('/')
        })
    }

    return(
        <div>
            <ToastContainer />
            <div className='container bg-light p-2 mt-2' style={{borderRadius:'20px'}}>
                <h1 className='text-center'>Big Bank Registration</h1>
                <div className='container mt-4 mb-4'>
                    <label for='firstname'>First Name</label>
                    <input name='firstname' type='text' className='form-control mb-2' placeholder='Enter your First Name'
                    required
                    onChange={e=>setFirstname(e.target.value)}
                    />
                    <label for='lastname'>Last Name</label>
                    <input name='lastname' type='text' className='form-control mb-2' placeholder='Enter your Last name'
                    required
                    onChange={e=>setLastname(e.target.value)}
                    />
                    <label for='mobile'>Mobile Number</label>
                    <input name='mobile' minLength="10" maxLength="10" type='text' className='form-control mb-2' placeholder='Mobile'
                    onChange={e=>setMobile(e.target.value)}
                    />
                    <label>Gender</label>
                    <select className="form-control mb-2" onChange={e=>setGender(e.target.value)}>
                        <option value='' selected>-</option>
                        <option value='M' >M</option>
                        <option value='F' >F</option>
                        <option value='O' >Other</option>
                    </select>
                    <label for='dob'>Date of Birth</label>
                    <input name='dob' type='date' className='form-control mb-2'
                    onChange={e=>setDob(e.target.value)}
                    />
                    <label for='pin'>Pin</label>
                    <input name='pin' maxLength="6" minLength="6" type='text' className='form-control mb-2' placeholder='Enter Your Pin'
                    required
                    onChange={e=>{
                        setPin(e.target.value)
                        getPin(e)}}
                    />
                    <label for='state'>City</label>
                    <input id='city' type='text' className='form-control mb-2' placeholder='City'
                    value={city?city:""}
                    required
                    />
                    <label for='state'>State</label>
                    <input id='state' type='text' className='form-control mb-2' placeholder='State'
                    value={state?state:""}
                    required
                    />
                    <label for='country'>Country</label>
                    <input id='country' type='text' className='form-control mb-2' placeholder='Country'
                    value={country?country:""}
                    required
                    />
                    <label for='address'>Address</label>
                    <input id='address' type='text' className='form-control mb-2' placeholder='address' 
                    onChange={e=>setAddress(e.target.value)}
                    required
                    />
                    <label for='accnum'>Account Number</label>
                    <input name='accnum' type='text' value={user ? user.accnum : ""} className="form-control" />
                    <label>Account Type</label>
                    <select className='form-control mb-2' onChange={e=>setAccnt_type(e.target.value)}>
                        <option value='' selected>-</option>
                        <option value='Savings'>Savings</option>
                        <option value='Current'>Current</option>
                    </select>
                    
                    <label>Select a security question!</label>
                    <select className='form-control mb-2' name='sec_q' onChange={e=>setSet_q(e.target.value)}>
                        <option value='' selected>-</option>
                        <option value='What is Your Nickname?'>What is Your Nickname?</option>
                        <option value="What is Your pet's name?">What is Your pet's name?</option>
                        <option value='What is Your School name?'>What is Your School name?</option>
                    </select>
                    <label for='sec_a'>Enter the answer to your security question</label>
                    <input className='form-control mb-2' type='text' name='sec_a'
                    onChange={e=>setSec_a(e.target.value)}
                    />
                    <Test />
                    {msg ?
                    <button className='btn btn-block btn-warning mt-4' type='submit' onClick={()=>handleSubmit()}>Register</button>
                    :
                    <button className='btn btn-block btn-warning mt-4' disabled type='submit' onClick={()=>handleSubmit()}>Register</button>
                }
                   
                    
                </div>
                <p className='text-center mb-4'><a href='/login'>Login</a> or <a href='/signup'>Signup</a></p>
            </div>
        </div>
    )
}

export default Register;