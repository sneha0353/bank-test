import React from "react"
import Navbar from "./navbar"
import Customer from "./customer"
const customerList=()=>{
    return(
        <div>
        <Navbar/>
        <div className="row">
                <Customer/>
            </div>
        </div>
    )
}

export default customerList