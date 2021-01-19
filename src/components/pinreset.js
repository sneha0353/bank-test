import React,{useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import Navbar from "./navbar"
import axios from "axios"

const Pinreset = () => {

    const [card_number,setCard_number] = useState('')
    const [valid,setValid] = useState('')
    const [oldpin,setOldpin] = useState('')
    const [newpin,setNewpin]=useState("")
    const [cpin,setCnewpin]=useState('')
    const [flag,setFlag] = useState('')

    const history = useHistory()

    localStorage.setItem("set",JSON.stringify(4))
    console.log(valid);

    useEffect(()=>{
        axios({
            method:'get',
            url:"http://localhost:7000/api/show-pin",
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(data=>{
            setFlag(data.data)
            console.log(data.data)
        })
    },[])

    const showpin = () => {
        axios({
            method:'get',
            url:"http://localhost:7000/api/show-pin",
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(data=>{
            setOldpin(data.data[0].pin)
            setFlag(data.data[0].flag)
        })
    }

    const otp = () => {
        // axios({
        //     method:'post',
        //     url:"http://localhost:7000/api/tester",
        //     headers:{
        //         "Content-Type":'application/json',
        //         Authorization:localStorage.getItem('token')
        //     }
        // }).then(res=>console.log(res))
        // .catch(err=>console.log(err))
        localStorage.setItem('card_num',JSON.stringify(card_number))
        localStorage.setItem('valid',JSON.stringify(valid))
        localStorage.setItem('oldpin',JSON.stringify(oldpin))
        localStorage.setItem('newpin',JSON.stringify(newpin))
        localStorage.setItem('cpin',JSON.stringify(cpin))
        // history.push('/checkotp')
    }
    
    const handleSubmit = () => {
        //localStorage.removeItem('status')
        localStorage.setItem('card_num',JSON.stringify(card_number))
        localStorage.setItem('valid',JSON.stringify(valid))
        localStorage.setItem('oldpin',JSON.stringify(oldpin))
        localStorage.setItem('newpin',JSON.stringify(newpin))
        localStorage.setItem('cpin',JSON.stringify(cpin))

       axios({
        method:'post',
        url:'http://localhost:7000/api/pingenerate',
        data:{
            card_number:JSON.parse(localStorage.getItem('card_num')),
            valid:JSON.parse(localStorage.getItem('valid')),
            oldpin:parseInt(JSON.parse(localStorage.getItem('oldpin'))),
            newpin:parseInt(JSON.parse(localStorage.getItem('newpin'))),
            cpin:parseInt(JSON.parse(localStorage.getItem('cpin')))
        },
        headers:{
            'Content-Type':'application/json',
            Authorization:localStorage.getItem('token')
        }
    }).then(function(response){
        console.log(response.data)
        localStorage.removeItem('card_num')
        localStorage.removeItem('valid')
        localStorage.removeItem('oldpin')
        localStorage.removeItem('newpin')
        localStorage.removeItem('cpin')
        history.push('/')
    }).catch(function(response){
        console.log(response.data)
        localStorage.removeItem('card_num')
        localStorage.removeItem('valid')
        localStorage.removeItem('oldpin')
        localStorage.removeItem('newpin')
        localStorage.removeItem('cpin')
        history.push('/')
    })
    }

    return(
        <div>
            <Navbar />

            <div className='container p-2 border mt-5' style={{borderRadius:'20px'}}>
            <div>
                {flag=='Pin cannot Be shown!' ? 
                    <div>
                    <button className='btn btn-success' disabled onClick={()=>showpin()}>Show Pin</button>
                    {oldpin ? 
                        <div>
                            Your pin is : {oldpin}
                        </div>
                        :
                        <div></div>
                    }
                    </div>    
                    :
                    <div>
                    <button className='btn btn-success' onClick={()=>showpin()}>Show Pin</button>
                    {oldpin ? 
                        <div>
                            Your pin is : {oldpin}
                        </div>
                        :
                        <div></div>
                    }
                    </div>
                }
            </div>
                

                <h3 className='mt-2 mb-4'>Activate Your Card!</h3>
                
                {localStorage.getItem('card_num') && localStorage.getItem('valid') ?
                <div>
                <label for='cnum'>Enter the Card Number</label> 
                <input className='form-control' type='number' name='cnum' placeholder="Card Number" value={JSON.parse(localStorage.getItem('card_num'))} />
                <label for='valid'>Valid Thru</label>
                <input className='form-control' type='date' name='valid' placeholder="Valid" value={JSON.parse(localStorage.getItem('valid'))} />
                <label for="old">Old Pin</label>
                <input className='form-control' type='number' name='old' placeholder="Old Pin" value={JSON.parse(localStorage.getItem('oldpin'))}/>
                <label for='new'>New Pin</label>
                <input className='form-control' type='number' name='new' placeholder="New Pin" value={JSON.parse(localStorage.getItem('newpin'))}/>
                <label for='confirm'>Confirm Pin</label>
                <input className='form-control' type='number' name='confirm' placeholder="Confirm Pin" value={JSON.parse(localStorage.getItem('cpin'))}/>
                </div>
                :
                <div>
                <label for='cnum'>Enter the Card Number</label>
                <input className='form-control' type='number' name='cnum' placeholder="Card Number" onChange={e=>setCard_number(e.target.value)} />
                <label for='valid'>Valid Thru</label>
                <input className='form-control' type='date' name='valid' placeholder="Valid" onChange={e=>setValid(e.target.value)} />
                <label for="old">Old Pin</label>
                <input className='form-control' type='number' name='old' placeholder="Old Pin" onChange={e=>setOldpin(e.target.value)}/>
                <label for='new'>New Pin</label>
                <input className='form-control' type='number' name='new' placeholder="New Pin" onChange={e=>setNewpin(e.target.value)}/>
                <label for='confirm'>Confirm Pin</label>
                <input className='form-control' type='number' name='confirm' placeholder="Confirm Pin" onChange={e=>setCnewpin(e.target.value)}/>
                </div>
                }
            
                {localStorage.getItem('card_num') ? 
                <>
                {flag=='Pin cannot Be shown!' ? 
                <button className='btn btn-info btn-sm mt-3' disabled onClick={()=>handleSubmit()}>Change Pin</button>
                :
                <button className='btn btn-info btn-sm mt-3' onClick={()=>handleSubmit()}>Change Pin</button>
                }
                </>
                :
                <>
                {flag=='Pin cannot Be shown!' ? 
                <button className='btn btn-info btn-sm mt-3' disabled onClick={()=>handleSubmit()}>Change Pin</button>
                :
                <button className='btn btn-info btn-sm mt-3' onClick={()=>handleSubmit()}>Change Pin</button>
                }
                </>
                }
                </div>

               
            </div>
    )
}

export default Pinreset;