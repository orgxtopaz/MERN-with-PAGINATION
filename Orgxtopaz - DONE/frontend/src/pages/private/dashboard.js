import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Axios from "axios"; //allows us to make GET and POST any method requests from the browser.
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery"
import DataTable from 'datatables.net';
import Header from "../../component/private-page-header";
import Footer from "../../component/private-page-footer";
import {useEffect,useState} from "react";

//set style for Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);

  const [allCreativities, setAllCreativities] = React.useState([]);
  const [activitiesCount, setActivitiesCount] = React.useState(0);
  const [todays, setTodays] = React.useState(0);
  const [minutesDuration, setMinutesDuration] = React.useState("");
  const handleClose = () =>{

    setOpen(true);
    window.location.reload()

  } 

  
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



    fetch("http://localhost:5000/api/v1/creativities")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.data.length);

        setAllCreativities(data.data);
       localStorage.setItem("datas",JSON.stringify(data.data));

  
 

        let allDuration = 0;

        for(let ctr = 0 ; ctr<data.data.length ; ctr++){

         allDuration+= data.data[ctr].duration

        }
        setMinutesDuration(allDuration)


      });

    fetch("http://localhost:5000/api/v1/activities")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        let allActivities = data.data;

        let today = new Date();
        let todayDate = today.getDate();

        const todaysActivites = allActivities.filter((act) => {
          let actDate = new Date(act.createdAt);
          if (todayDate === actDate.getDate()) {
            return act;
          }
        });

        setTodays(todaysActivites.length);

        setActivitiesCount(data.count);
      });
  }, []);

  const [location, setLocation] = React.useState("");


  ///////// UPDATE SPECIFIC ACTIVITY
  const updateNow = (e) =>{
    
    if(location==""){
      alert("No updates Applied")
    }else{
      Axios.post("http://localhost:5000/updateActivity", 

      { 
        
        
       location:location,
       activityId :e
     
       }
      
      )
    
     
      .then((response) => {
        alert("Activity Successfully Updated")
        window.location.reload()
       
  
     
      })
      .catch((error) => {
        console.error(error)
      })
    }  

  

  }



   
 
///////// DELETE SPECIFIC ACTIVITY
  const deleteNow = (e) =>{
    
 
      Axios.post(`http://localhost:5000/deleteActivity/${e}`, 

      
      )
  
      .then((response) => {
        alert("Activity Successfully Deleted")
        window.location.reload()
       
  
     
      })
      .catch((error) => {
        console.error(error)
      })
   

  

  }

  const [users,setUsers] = useState([]);

  
  useEffect(() => {
    setTimeout(() => {
     
      $('#dataTable').DataTable().destroy();
      
      // setUsers(localStorage.getItem("datas"));

   
      let format = (JSON.parse(localStorage.getItem("datas")));
      console.log(format)
       setUsers(format)
    },3000);
  },[]);

  useEffect(() => {
    $('#dataTable').DataTable();
},[users]);


  return (
    <div >
      <Header />

      <div class="main-content">
        <main>
          <div class="cards">
            <div class="card-single">
              <div>
                <span>Today's activities</span>
                <h1>{todays}</h1>
              </div>
              <div>
                <span class="las la-running"></span>
              </div>
            </div>
            <div class="card-single">
              <div>
                <span>Types of activities recorded</span>
                <h1>{activitiesCount}</h1>
              </div>
              <div>
                <span class="las la-tasks"></span>
              </div>
            </div>
            <div class="card-single">
              <div>
                <span>Total duration recorded</span>
                <h1> {(minutesDuration / 60).toFixed(2) } hours
</h1>
              </div>
              <div>
                <span class="las la-stopwatch"></span>
              </div>
            </div>
            <div class="card-single">
              <div>
                <span>Total activities recorded</span>
                <h1>{allCreativities.length}</h1>
              </div>
              <div>
                <span class="las la-bookmark"></span>
              </div>
            </div>
          </div>

          <div class="recent-grid">
            <div class="activitie-table">
              <div class="card">
                <div class="card-header">
                  <h2>Recent activities</h2>

                  {/* <Button variant="outlined">
                    Next page <span class="las la-arrow-right"></span>
                  </Button> */}
                </div>
                <div class="card-body">
                  <div class="table-responsive">
    
                    <table width="100%" id="dataTable">
                      <thead>
                        <tr>
                          <td>Date</td>
                          <td>Activity types</td>
                          <td>Description</td>
                          <td>Duration</td>
                          <td>Location</td>
                          <td>Action</td>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((cty) => {
                          return (
                            <tr>
                              <td>{cty.date}</td>
                              <td>{cty.activity.activityTitle}</td>
                              <td>{cty.description}</td>
                              <td>{(cty.duration / 60).toFixed(2)} hours</td>
                              <td>{cty.location} </td>
                              <td>
                                <Button variant="outlined" data-toggle="modal"
                                    data-target={`#` + cty.description.replace(/ /g, "")} >
                                  More Info.
                                </Button>
                              </td>

                                                      
                        <div
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        id={cty.description.replace(/ /g, "")}
                        className="modal fade"
                        hidden={open}

                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{ timeout: 500 }}
                        >
                      
                          <Box sx={style}>
                            <Typography id="transition-modal-title" variant="h6" component="h2">
                              Update Activity
                              <i className="fa fa-close" onClick={handleClose} style={{fontSize:"1.2em" , float:"right",cursor:"pointer"}}></i>

                            </Typography>

                            <br />
                            <br />

                            <TextField
                              fullWidth
                              id="outlined-basic"
                              label="Date"
                              variant="outlined"
                              value={cty.date}
                              readOnly
                          
                            />
                            <br />
                            <br />
                            <div className="input-box" >
                              <select>
                                <option disabled selected value={cty.date}
                              readOnly>
                                  {cty.activity.activityTitle}
                                </option>
                           
                              </select>
                            </div>
                            <br />

                            <TextField
                              fullWidth
                              id="outlined-basic"
                              label="Description"
                              variant="outlined"
                              value={cty.description}
                             
                            />
                            <br />
                            <br />
                            <TextField
                              fullWidth
                              id="outlined-basic"
                              label="Duration"
                              variant="outlined"
                              value={(cty.duration / 60).toFixed(2) +" Hours" } 
                          
                            />
                            <br />
                            <br />
                            <TextField
                              fullWidth
                              id="outlined-basic"
                              label="Location"
                              variant="outlined"
                              defaultValue={cty.location}
                              onChange={(event) => {
                                setLocation(event.target.value);
                              }}
                            
                            
                            />

                            <br />
                            <br />
                            <Box display="flex" justifyContent="space-between">
                              <Button variant="outlined"  onClick={(event) => {
                                deleteNow(cty._id)}}>
                                Delete
                              </Button>
                              <Button variant="outlined"   onClick={(event) => {
                                updateNow(cty._id);
                              }} >
                                Update
                              </Button>
                            </Box>
                          </Box>
                         
                        </div>

                            </tr>

                          );
                        })}
                      </tbody>
                    </table>




                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        
      </div>



      <Footer></Footer>
    </div>
  );
}
$(document).ready(function() {
  setTimeout(() => {
    $('#myTable').DataTable();

  },3000);

});