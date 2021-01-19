import React, { useState } from "react"
import {toast,ToastContainer} from "react-toastify"
import {useHistory} from "react-router-dom"
import Test from "./test"

const Signup = () => {
    const [name,setName] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const history = useHistory()

    const handleSubmit = () => {
        fetch("http://localhost:7000/api/signup",
        {
            method:'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify({
                name,
                username,
                password,
                email
            })
        }
        )
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                return toast(data.error,{type:'error'})
            }
            localStorage.setItem('auth',JSON.stringify(data.token))
            //history.push("/profile");
            //console.log(data)
            toast(data.message,{type:'info'})
        })
    }

    const handleClick = () => {
        fetch("http://localhost:7000/api/resendEmail",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                token:JSON.parse(localStorage.getItem('auth'))
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.message){
                toast('Email Resend!',{type:'warning'})
            }
        })
    }
    
    // console.log(Date.now() + 3600000)

    return(
        <div>
            <ToastContainer />
            <div className='container bg-light p-2 mt-2' style={{borderRadius:'20px'}}>
                <h1 className='text-center'>Big Bank Signup</h1>
                <div className='container mt-4 mb-4'>
                    <label for='name'>Name</label>
                    <input name='name' type='text' className='form-control mb-2' placeholder='Enter your Name'
                    required
                    onChange={e=>setName(e.target.value)}
                    />
                    <label for='email'>Email</label>
                    <input name='email' type='email' className='form-control mb-2' placeholder='Enter your email'
                    required
                    onChange={e=>setEmail(e.target.value)}
                    />
                    <label for='username'>Username</label>
                    <input name='username' type='text' className='form-control mb-2' placeholder='Enter your Username'
                    required
                    onChange={e=>setUsername(e.target.value)}
                    />
                    <label for='password'>Password</label>
                    <input name='password' type='password' className='form-control mb-2' placeholder='Enter Your Password'
                    required
                    onChange={e=>setPassword(e.target.value)}
                    />
                    <Test />
                    <button className='btn btn-block btn-warning mt-4' onClick={()=>handleSubmit()}>Continue to Registration</button>
                    <h1 className='text-center'><button className='btn btn-sm btn-dark' onClick={()=>handleClick()}>Resend Email</button></h1>
                </div>
                <p className='text-center mb-4'><a href='/login'>Login</a> or <a href='/signup'>Signup</a></p>
            </div>
        </div>
    )
}

export default Signup;