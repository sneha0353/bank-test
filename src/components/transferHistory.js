import React,{useEffect,useState} from "react";
import { toast,ToastContainer } from "react-toastify";
import Navbar from "./navbar";

const TransferHistory = () => {
    const [thistory,setThistory] = useState();
    const [flag,setFlag] = useState(false);

    const [startDate,setStartDate] = useState(); 
    const [endDate,setEndDate] = useState(); 
    const [dateHistory,setDateHistory] = useState();

    const WithrawDate = () => {
        fetch("http://localhost:7000/api/gettransferdate",{
            method:"post",
            headers:{
                "Content-type":"application/json",
                Authorization:localStorage.getItem('token')
            },
            body:JSON.stringify({
                startdate:startDate,
                enddate:endDate
            })
        }).then(res => res.json())
        .then(rs => {
            if(rs.err){
                return toast(rs.err,{type:"error"})
            }
            setDateHistory(rs)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        fetch("http://localhost:7000/api/gettransferhistory",{
            method:'get',
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }).then(res => res.json())
        .then(result => {
            setThistory(result.result)
            console.log(result.result)
        })
        .catch(err => {
            console.log(err)
        })
    },[]);

    return(
        <div>
            <Navbar />
            <ToastContainer />
            <div>
                <div className="row">
                    <div className="col-6">
                        <h2 className="text-info mt-2">Transfer History</h2>
                        {thistory ?
                            <div>
                                {flag ? 
                                    <div>
                                        {thistory.map((item)=>{
                                            return(
                                                <div class="card m-2" style={{width: "100%",borderRadius:'20px'}}>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Account User : <span className="text-danger">{item.user}</span></h5>
                                                        <h5 class="card-title">Acc. Num : <span className="text-danger">{item.accnum}</span></h5>
                                                        <h5 class="card-title">Amount Transferred : <span className="text-danger">{item.tamount}</span></h5>
                                                        <h5 class="card-title">Transfer Date : <span className="text-danger">{item.date.slice(0,10)}</span></h5>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    :
                                    <div>
                                        {thistory.slice(0,5).map((item)=>{
                                            return(
                                                <div class="card m-2" style={{width: "100%",borderRadius:'20px'}}>
                                                    <div class="card-body">
                                                        <h5 class="card-title">Account User : <span className="text-danger">{item.user}</span></h5>
                                                        <h5 class="card-title">Acc. Num : <span className="text-danger">{item.accnum}</span></h5>
                                                        <h5 class="card-title">Amount Transferred : <span className="text-danger">{item.tamount}</span></h5>
                                                        <h5 class="card-title">Transfer Date : <span className="text-danger">{item.date.slice(0,10)}</span></h5>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                            </div> 
                            :
                            <div></div>
                            }
                            {flag ? 
                                <div><p className="text-danger">All History till now!</p></div>
                                :
                                <button className="btn btn-outline-info btn-sm ml-2" onClick={()=>setFlag(true)}>Show All</button>
                            }
                              
                    </div>
                    <div className="col-6 ">
                        <h2 className="text-info mt-2">Deposit History By Date</h2>
                        <label for="startdate">Start Date</label>
                        <input name="startdate" className="form-control" type='date' value={startDate} onChange={e=>setStartDate(e.target.value)} />
                        <label for="enddate">End Date</label>
                        <input name="enddate" className="form-control" type='date' value={endDate} onChange={e=>setEndDate(e.target.value)} />
                        <button className="btn btn-outline-dark btn-sm mt-2" onClick={()=>WithrawDate()}>Check</button>
                        {dateHistory ? 
                            <div>
                                {dateHistory.map(pp=>{
                                    return(
                                    <div class="card m-2" style={{width: "100%",borderRadius:'20px'}}>
                                        <div class="card-body">
                                            <h5 class="card-title">Account User : <span className="text-danger">{pp.user}</span></h5>
                                            <h5 class="card-title">Acc. Num : <span className="text-danger">{pp.accnum}</span></h5>
                                            <h5 class="card-title">Amount Deposit : <span className="text-danger">{pp.wamount}</span></h5>
                                            <h5 class="card-title">Deposit Date : <span className="text-danger">{pp.date.slice(0,10)}</span></h5>
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
            </div>
        </div>
    )
}

export default TransferHistory;