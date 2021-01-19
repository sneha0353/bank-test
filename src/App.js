import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router,Route} from "react-router-dom"

import Signup from "./components/signup"
import Login from './components/login';
import Register from "./components/register"
import Home from "./components/home"
import Test from './components/test';
import Activate from './components/activation';
import Deposit from './components/deposit';
import Withdraw from "./components/withdrawal"
import CheckOtp from './components/checkotp';
import Transfer from './components/transfer';
import ActivateCard from './components/activatecard';
import Profile from "./components/profile"
import Pinreset from "./components/pinreset"
import History from "./components/history"
import customerList from "./components/customerList"
import PDFView from "./components/pdfView"
import depositHistory from "./components/depositHistory"
import TransferHistory from "./components/transferHistory"
import Loan from "./components/loan"

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/test' component={Test} />
      <Route exact path='/activate/:token' component={Activate} />
      <Route exact path='/deposit' component={Deposit} />
      <Route exact path='/withdraw' component={Withdraw} />
      <Route exact path='/checkotp' component={CheckOtp} />
      <Route exact path='/transfer' component={Transfer} />
      <Route exact path="/activatecard" component={ActivateCard} />
      <Route exact path="/showpin" component={Pinreset} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/withdraw-history" component={History} />
      <Route exact path="/deposit-history" component={depositHistory} />
      <Route exact path="/transfer-history" component={TransferHistory} />
      <Route exact path="/customerList" component={customerList}/>
      <Route exact path="/pdf-view" component={PDFView}/>
      <Route exact path="/loan" component={Loan}/>
    </Router>
  );
}

export default App;
