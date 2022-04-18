import React from "react";
import Header from "../../component/private-page-header";
import Footer from "../../component/private-page-footer";
import Axios from "axios"; //allows us to make GET and POST any method requests from the browser.
import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [userInfo, setUserinfo] = useState([]);
  let navigate = useNavigate();

  
  React.useEffect(() => {  

    if("email" in localStorage && "password" in localStorage){
      Axios.post("http://localhost:5000/verifyUser",
        
      {
      
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
    

       
      })
        .then((res) => {  

          alert(res.response.data.message)

         
        }) 
        .catch ((err) => {
         
      
        
         
          alert(err.response.data.message)
          navigate('/internal-access');

  
        })
      
     }else{
       alert("You must log in first!")
       navigate('/internal-access');

     }

   

      Axios.post("http://localhost:5000/userInfo", 

      { 
        
        
       email:localStorage.getItem("email"),
       password:localStorage.getItem("password")
     
       }
      
      )
    
      
      .then((response) => {
        setUserinfo(response.data);

     
      })
      .catch((error) => {
        console.error(error)
      })
   

  })

  const [birthday, setBirthday] = useState(userInfo.birthday);
  const [gender, setGender] = useState(userInfo.gender);
  const [password, setPassword] = useState(userInfo.password);


  function updateUser(e){
     e.preventDefault()
      
    Axios.post("http://localhost:5000/updateUser", 

    { 
      
      
     email:localStorage.getItem("email"),
     password:password,
     gender:gender,
     birthday:birthday
   
     }
    
    )
  
    
    .then((response) => {
      alert("Successfully Updated")
     

   
    })
    .catch((error) => {
      console.error(error)
    })


  }

  


  return (
    <div >
      <Header />

      <div className="user-container">
        <div className="user-inner-element">
          <div className="user-title">Hi! {localStorage.getItem("firstName")}</div>
          <form action="#">
            <div className="user-details">
              <div className="personal-info-box">
                <span className="personal-details">Name</span>
                <input type="text" value={userInfo.firstName} readOnly  />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Surname</span>
                <input type="text" value={userInfo.lastName} readOnly   />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Birthday</span>
                <input type="date" defaultValue={userInfo.birthday} required onChange={(event) => {
                                  setBirthday(event.target.value);
                                }} />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Gender</span>
                <input type="text" defaultValue={userInfo.gender} required onChange={(event) => {
                                  setGender(event.target.value);
                                }} />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Email</span>
                <input type="text" defaultValue={userInfo.email} readOnly  />
              </div>
              <div className="personal-info-box">
                <span className="personal-details">Password</span>
                <input type="password" defaultValue={userInfo.password} onChange={(event) => {
                                  setPassword(event.target.value);
                                }} required />
              </div>
            </div>
            <div className="user-button">
              <input type="submit" onClick={updateUser} value="UPDATE" />
            </div>
          </form>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
}
