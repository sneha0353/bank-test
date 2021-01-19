import React, { useEffect, useState } from "react"
import {toast,ToastContainer} from "react-toastify"
import {Link} from"react-router-dom"
import Axios from "axios"
import Navbar from "./navbar"

const Profile = () => {
    const [data,setData] = useState()
    useEffect(()=>{
        Axios({
            method:'get',
            url:"http://localhost:7000/api/profile",
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(data=>{
            setData(data.data[0])
            console.log(data.data[0])
            localStorage.setItem("profile",JSON.stringify(data.data[0]))
        })
    },[])
    return(
        <div>
        <Navbar />
        <ToastContainer />
        <div className='container bg-light p-2 mt-4' style={{borderRadius:'20px'}}>
            <h1 className='text-center'>Big Bank Registration</h1>
            <div className='container mt-4 mb-4'>
                <label for='firstname'>First Name</label>
                <input name='firstname' type='text' className='form-control mb-2' placeholder='Enter your First Name'
                required
                value={data ? data.firstname : ""}
                />
                <label for='lastname'>Last Name</label>
                <input name='lastname' type='text' className='form-control mb-2' placeholder='Enter your Last name'
                required
                value={data ? data.lastname : ""}
                />
                <label for='mobile'>Mobile Number</label>
                <input name='mobile' minLength="10" maxLength="10" type='text' className='form-control mb-2' placeholder='Mobile'
                value={data ? data.mobile : ""}
                />
                <label>Gender</label>
                <select className="form-control mb-2" value={data ? data.gender : ""} >
                    <option value='' selected>-</option>
                    <option value='M' >M</option>
                    <option value='F' >F</option>
                    <option value='O' >Other</option>
                </select>
                <label for='dob'>Date of Birth</label>
                <input name='dob' type='date' className='form-control mb-2'
                value={data ? data.dob.slice(0,10) : ""}
                />
                <label for='pin'>Pin</label>
                <input name='pin' maxLength="6" minLength="6" type='text' className='form-control mb-2' placeholder='Enter Your Pin'
                required
                value={data ? data.pin : ""}
                />
                <label for='state'>City</label>
                <input id='city' type='text' className='form-control mb-2' placeholder='City'
                value={data ? data.city : ""}
                required
                />
                <label for='state'>State</label>
                <input id='state' type='text' className='form-control mb-2' placeholder='State'
                value={data ? data.state : ""}
                required
                />
                <label for='country'>Country</label>
                <input id='country' type='text' className='form-control mb-2' placeholder='Country'
                value={data ? data.country : ""}
                required
                />
                <label for='address'>Address</label>
                <input id='address' type='text' className='form-control mb-2' placeholder='address' 
                value={data ? data.address : ""}
                required
                />
                <label for='accnum'>Account Number</label>
                <input name='accnum' type='text' className="form-control" value={data ? data.accnum : ""}/>
                <label>Account Type</label>
                <select className='form-control mb-2' value={data ? data.accnt_type : ""}>
                    <option value='' selected>-</option>
                    <option value='Savings'>Savings</option>
                    <option value='Current'>Current</option>
                </select>
                
                <label>Select a security question!</label>
                <select className='form-control mb-2' name='sec_q' value={data ? data.sec_q : ""}>
                    <option value='' selected>-</option>
                    <option value='What is Your Nickname?'>What is Your Nickname?</option>
                    <option value="What is Your pet's name?">What is Your pet's name?</option>
                    <option value='What is Your School name?'>What is Your School name?</option>
                </select>
                <label for='sec_a'>Enter the answer to your security question</label>
                <input className='form-control mb-2' type='text' name='sec_a'
                value={data ? data.sec_a : ""}
                />
            </div>
            <Link to="/pdf-view"><button>Click me!</button></Link>
        </div>
    </div>
)
}

export default Profile;