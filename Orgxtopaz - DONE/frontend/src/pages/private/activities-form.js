import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Axios from "axios"; //allows us to make GET and POST any method requests from the browser.

import { useNavigate } from 'react-router-dom';

import Header from '../../component/private-page-header';
import Footer from '../../component/private-page-footer';

//set style to be use in Modal
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export default function Activity() {
	const navigate = useNavigate();
	//initialize empty activity
	const [activity, setActivity] = React.useState('');

	const [activityType, setActivityType] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [mintues, setMintues] = React.useState(0);
	const [hours, setHours] = React.useState(0);

	//drop down activities
	const [activities, setActivities] = React.useState([]);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);







	 
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
	
	   
	
	
	  })











	// will push a new activity user input to the activity
	function pushActivity() {
		if (activity !== '') {
			const inputAct = {
				activityTitle: activity,
			};

			fetch('http://localhost:5000/api/v1/activities', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(inputAct),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log(data.data);

					setActivities((oldArray) => [...oldArray, data.data]);
					setActivity('');
					handleClose();
				});

			//if there is no activity input, this will alert
		} else alert('activities field is empty');
	}

	async function submitHandler(event) {
		event.preventDefault();

		let allMins = hours * 60 + mintues;

		const creativity = {
			activity: activityType,
			description: description,
			duration: allMins,
			location: '',
		};

		const response = await fetch(
			'http://localhost:5000/api/v1/creativities?activityId=' + activityType,
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(creativity),
			}
		);

		const mainContent = await response.json();
		navigate('/dashboard');
	}





	function activityHandler(event) {
		console.log(event.target.value);
		setActivityType(event.target.value);
	}
	function descHandler(event) {
		setDescription(event.target.value);
	}

	function hoursHandler(event) {
		setHours(parseInt(event.target.value));
	}

	function minHandler(event) {
		setMintues(parseInt(event.target.value));
	}

	React.useEffect(() => {
		fetch('http://localhost:5000/api/v1/activities')
			.then((response) => response.json())
			.then((data) => {
				console.log(data.data);

				setActivities(data.data);
			});
	}, []);
	return (
		<div >
			<Header />

			<div className='form-container'>
				<div className='form-inner-element'>
					<div className='form-title'>Activity Form</div>
					<form onSubmit={submitHandler}>
						<div className='activity-details'>
							<div className='input-box'>
								<span className='details'>Activity Type</span>
								<select onChange={activityHandler}>
									<option disabled selected value>
										-- select activity --
									</option>
									{activities.map((act) => (
										<option value={act._id}>{act.activityTitle}</option>
									))}
								</select>
							</div>

							<div className='input-box'>
								<input
									type='button'
									id='addButton'
									value='Add New Activity'
									onClickCapture={handleOpen}
								/>
							</div>
							<div className='input-box'>
								<span className='details'>Description</span>
								<input
									onChange={descHandler}
									type='text'
									placeholder='Enter the description'
									required
									// onKeyPress={(event) => {
									// 	if (!/[a-z]/i.test(event.key)) {
									// 	  event.preventDefault();
									// 	}
									//   }}

								/>
							</div>
							<div className='input-box'>
								<span className='details'>Duration</span>
								<Box display='flex' justifyContent='space-between' gap='5px'>
									<input
										onChange={hoursHandler}
										type='number'
										placeholder='hours'
										required
									/>
									<input
										onChange={minHandler}
										type='number'
										placeholder='minutes'
										required
									/>
								</Box>
							</div>
							{/* <div className='input-box'>
								<span className='details'>Date</span>
								<input type='date' required />
							</div> */}
						</div>
						<div className='form-button'>
							<input type='reset' value='RESET' />
							<input type='submit' value='SUBMIT' />
						</div>
					</form>
				</div>
			</div>

			<Footer></Footer>

			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id='transition-modal-title' variant='h6' component='h2'>
							New Activity
						</Typography>
						<br />
						<br />
						<TextField
							fullWidth
							value={activity}
							variant='outlined'
							id='outlined-basic'
							label='Activity Name'
							onChange={(e) => setActivity(e.target.value)}
						/>
						<br />
						<br />
						<Button variant='outlined' onClick={pushActivity}>
							Add
						</Button>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
