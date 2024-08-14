import React, { useState } from "react";
import axios from "axios";
import { useDispatch  } from "react-redux";
import { valid } from "../store/bookSlice";



function loginForm({ toggleModal }) {
    const dispatch = useDispatch();
  
  function adminValidate() {
    dispatch(valid())
  }

  const mainURL = "http://localhost:4001/admin"
   const [modal, setModal] = useState(false);

   const loginToggle = () => {
     setModal(!modal);
   }

   const [name, setName ] = useState("");
   const [email, setEmail ] = useState("");
   const [password, setPassword ] = useState("");
   const [error, setError] = useState("")

   let signData= {
     name : name,
     email: email,
     password: password
   }
   let loginData= {
    email : email,
    password: password
   }
    async function login (e){
      e.preventDefault()
       console.log(loginData);  
       // API call here to check login credentials
       try {
        const response = await axios.post(`${mainURL}/login`, loginData,{withCredentials: true});
         console.log("response",response.data);
         adminValidate()
        
         toggleModal()
        
       } catch (error) {
        console.error("There was an error:", error.response? error.response.data : error.message);
        setError(error.response? error.response.data.message : error.message);
        
       }
       
    }
    async function signIn(e){
      e.preventDefault()
      console.log(signData); 
      try {
        const response = await axios.post(`${mainURL}/create`, signData)
        console.log(response.data); 
        toggleModal()     
      } catch (error) {

        console.error("There was an error:", error.response ? error.response.data : error.message);
        setError(error.response? error.response.data.message : error.message);  
      }
    }

  return (
    <div>
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <div className="modal-header d-flex justify-content-between mb-5">
          <h5 className="modal-title">Admin {modal? "Sign-UP": "Login"} </h5>
          <button type="button" className="sml-btn" onClick={toggleModal}>
            <span aria-hidden="true" style={{ fontSize: "40px" }}>
              &times;{" "}
            </span>
          </button>
        </div>
        <div className="modal-body">
            <h3 className="text-danger text-center">{error}</h3>
          <form onSubmit={modal ? signIn : login}>
            {
                modal && 
                <div className="form-group">
                <label htmlFor="email" className="mb-2">Full Name</label>
                <input type="text" className="form-control" required onChange={(e) => {setName(e.target.value), setError("")}} id="email" />
              </div>
            }
            <div className="form-group">
              <label htmlFor="email" className="mb-2">Email address:</label>
              <input type="email" className="form-control" required onChange={(e) => {setEmail(e.target.value), setError("")} } id="email" />
            </div>
            <div className="form-group" >
              <label htmlFor="pwd" className="mb-2">Password:</label> 
              <input type="password" className="form-control" required onChange={(e) => {setPassword(e.target.value), setError("")}} id="pwd" />
            </div>
            <div className="d-flex justify-content-end gap-4">
                {
                    <button type="submit" className={`btn ${modal ?'btn-info': "btn-primary" }`}>
                      {modal ? "Sign-up" : "Login"}
                    </button>
                }
              <button className="btn btn-danger"> Cancel</button>
            </div>
            <span><p>{modal? "":"Don't"} Have an account  <a className="text-primary" onClick={loginToggle} >{modal ?"login": "sign-up "} here</a></p></span>
          </form>
        </div>
      </div>
    </div>
  );
}

export default loginForm;
