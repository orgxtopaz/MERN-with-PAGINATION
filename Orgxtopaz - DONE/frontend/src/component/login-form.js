import React, { useEffect, useState } from "react";
import { checkValidation } from "./form-validator";
import Axios from "axios"; //allows us to make GET and POST any method requests from the browser.
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLogin }) {
  let navigate = useNavigate();

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

  const handleSubmit = (e) => {

      e.preventDefault();

        
      //CHECKIING IF EMAIL EXIST
  
  
      Axios.post("http://localhost:5000/login",
        
      {
      
        email: inputValues.email,
    
        password: inputValues.password
   
       
      })
        .then((res) => {  

          localStorage.setItem("email",res.data.email)
          localStorage.setItem("password",res.data.password)
          localStorage.setItem("firstName",res.data.firstName)
          localStorage.setItem("lastName",res.data.lastName)
          localStorage.setItem("gender",res.data.gender)
          localStorage.setItem("birthday",res.data.birthday)
          localStorage.setItem("token",res.data.token)
   
          alert("Successfully Login ")
      
          navigate('/dashboard');
        }) 
        .catch ((err) => {
         
      
         alert(err.response.data.message)
         
          navigate('/internal-access');
        
     
    
 
       
        })



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
    <form action="#" className="login" onSubmit={handleSubmit}>
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
      <div className="field btn">
        <div className="btn-layer"></div>
        <input
          type="submit"
          value="Login"
          onClick={() => {
            setIsClicked(true);
          }}
        />
      </div>
      <div className="signup-link" onClick={() => setIsLogin(false)}>
        Not a member? <a>Sign Up now</a>
      </div>
    </form>
  );
}
