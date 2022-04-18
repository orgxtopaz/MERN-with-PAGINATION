import React, { useEffect, useState } from "react";
import { checkValidation } from "./form-validator";
import Axios from "axios"; //allows us to make GET and POST any method requests from the browser.
import { useNavigate } from 'react-router-dom';


export default function Signup() {

  const [isClicked, setIsClicked] = useState(false);
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validation, setValidation] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  }

  useEffect(() => {
    const errors = checkValidation(isClicked, inputValues, validation);
    if (errors) setValidation(errors);
  }, [inputValues, isClicked]);

let navigate = useNavigate();
  const handleSubmit = (e) => {

      e.preventDefault();

      if(inputValues.password==inputValues.confirmPassword){
        
      //CHECKIING IF EMAIL EXIST
  
  
      Axios.post("http://localhost:5000/register",
        
      {
      
        firstName: inputValues.firstName,
        lastName: inputValues.lastName,
        email: inputValues.email,
        password: inputValues.password
   
       
      })
        .then((res) => {  

   
          alert("Successfully Signed up")
          window.location.reload()
          navigate('/internal-access');
        }) 
        .catch ((err) => {
         
          if(err.response.data[27]=='1'){
        
         
            alert("Email Already Exist!")
        
          }
    
 
       
        })

      }else{


         alert("Password does not match confirmation password")
    
   
        }





  };

  React.useEffect(() => {  
   
    if("email" in localStorage && "password" in localStorage){
      Axios.post("http://localhost:5000/verifyUser",
        
      {
      
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
    
       
      })
        .then((res) => {  

          navigate('/dashboard');


         
        }) 
        .catch ((err) => {
         
      
        
         
          navigate('/internal-access');

  
        })
      
     }else{
       navigate('/internal-access');

     }


  }, []);
  return (
    <form  className="signup" onSubmit={handleSubmit}>
      <div className="field">
        {validation.firstName && <p>{validation.firstName}</p>}
        <input
          placeholder="First Name"
          type="text"
          name="firstName"
          onChange={(e) => handleChange(e)}
          value={inputValues.firstName}
          required
        />
      </div>
      <div className="field">
        {validation.lastName && <p>{validation.lastName}</p>}
        <input
          placeholder="Last Name"
          type="text"
          name="lastName"
          onChange={(e) => handleChange(e)}
          value={inputValues.lastName}
          required
        />
      </div>
      <div className="field">
        {validation.email && <p>{validation.email}</p>}
        <input
          placeholder="Email Address"
          type="email"
          name="email"
          onChange={(e) => handleChange(e)}
          value={inputValues.email}
          required
        />
      </div>
      <div className="field">
        {validation.password && <p>{validation.password}</p>}
        <input
          placeholder="Password"
          type="password"
          name="password"
          onChange={(e) => handleChange(e)}
          value={inputValues.password}
          required
        />
      </div>
      <div className="field">
        <input
          placeholder="Confirm password"
          type="password"
          name="confirmPassword"
          onChange={(e) => handleChange(e)}
          value={inputValues.confirmPassword}
          required
        />
      </div>
      <div className="field btn">
        <div className="btn-layer"></div>
        <input
          type="submit"
          value="Signup"
          onClick={() => {
            setIsClicked(true);
          }}
        />
      </div>
    </form>
  );
}
