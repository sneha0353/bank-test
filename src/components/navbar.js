import React,{useEffect,useState} from "react"

const Navbar = () => {

  const [isadmin,setIsAdmin] = useState(false)

  useEffect(()=>{
    fetch("http://localhost:7000/api/is-admin",{
      method:"post",
      headers:{
        Authorization:localStorage.getItem('token')
      }
    }).then(res=>res.json())
    .then(response => {
      if(response.err){
        setIsAdmin(false)
      }else{
        setIsAdmin(true)
      }
    })
  },[]);

    return(
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-success">
    <a class="navbar-brand" href="#">Big Bank</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="/profile">Profile</a>
        </li>
        <li class="nav-item active">
        <a class="nav-link" href="/loan">Loan</a>
      </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Actions
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/deposit">Deposit</a>
            <a class="dropdown-item" href="/deposit-history">Deposit History</a>
            <a class="dropdown-item" href="/withdraw">Withdrawal</a>
            <a class="dropdown-item" href="/withdraw-history">Withdraw History</a>
            <a class="dropdown-item" href="/transfer">Money Tranfer</a>
            <a class="dropdown-item" href="/transfer-history">Transfer History</a>
            <a class="dropdown-item" href="/activatecard">Activate Your Card</a>
            <a class="dropdown-item" href="/showpin">Pin Reset</a>
            {isadmin ? 
              <a class="dropdown-item" href="/customerList">Customer List</a>
              :
              <div></div>
            }
            
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <a href='/' class="btn btn-outline-dark my-2 my-sm-0" onClick={()=>{
          localStorage.clear()
          fetch("http://localhost:7000/api/signout")
            .then(res=>res.json())
            .then(data=>{
              console.log(data)
            }).catch(err=>{
              console.log(err)
            })
        }}>Logout</a>
      </form>
    </div>
  </nav>
    </div>
    )
}

export default Navbar;