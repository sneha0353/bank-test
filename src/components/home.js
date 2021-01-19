import React, { useEffect, useState } from "react"
import {useHistory} from "react-router-dom"
import Navbar from "./navbar"
import axios from "axios"

const Home = () => {
    const history = useHistory()
    const [data,setData] = useState('')
    const [accounts,setAccounts] = useState('')
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            history.push('/signup')
        }
        const getData = async() =>{
            try{
            const {data}=await axios.get('http://localhost:7000/api/profile', {
                headers: {
                authorization: localStorage.getItem('token')
                }
            })
            setData(data[0])
        }catch(err)
        {
            console.log(err)
        }
    }
    getData()
    const getAccounts = async() => {
        try{
            const {data} = await axios.get("http://localhost:7000/api/accounts",{
                headers:{
                    authorization:localStorage.getItem('token')
                }
            })
            setAccounts(data)
        }catch(err){
            console.log(err)
        }
    }
    getAccounts()
    },[])

    return(
        <div>
            <Navbar />
            <div className='container p-2 mt-2'>
            <h3 className='text-center mb-5 mt-4'>{data.firstname+" "+data.lastname} Accounts</h3>
                <div >
                    <div>
                    {accounts ? 
                        <div className='row'>
                        {accounts.map(item=>{
                            return(
                            <div className='col-6'>
                            <div className="card bg-light" style={{borderRadius:'20px'}}>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Account Number : {item.accnum}</h6>
                                <p style={{fontSize:'17px',marginTop:'20px'}}>Account Details :-</p>
                                <div className='border p-2' style={{borderRadius:'15px'}}>
                                <p >Balance : {item.balance}</p>
                                <p >Username : {item.username}</p>
                                </div>
                            </div>
                            </div>
                            </div>
                            )
                        })}
                        </div>
                        :
                        <div></div>
                    }
                    
                    </div>
               
                </div>
                    <div className="text-center mt-5 mb-4" style={{margin:"auto",width: "44.5%"}}>
                        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" style={{width:'500px'}}>
                            <div class="carousel-inner" >
                                <div class="carousel-item active">
                                <img style={{height:'420px',width:'auto',borderRadius:'40px'}} src="https://economictimes.indiatimes.com/thumb/msid-71160696,width-1200,height-900,resizemode-4,imgsize-169788/bank-getty.jpg?from=mdr" class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item">
                                <img style={{height:'420px',width:'auto',borderRadius:'40px'}} src="https://pngimg.com/uploads/piggy_bank/piggy_bank_PNG52.png" class="d-block w-100" alt="..." />
                                </div>
                                <div class="carousel-item">
                                <img style={{height:'420px',width:'auto',borderRadius:'40px'}} src="https://icon-library.com/images/bank-deposit-icon/bank-deposit-icon-10.jpg" class="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Home;