import React, { useState } from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/auth';
import { Form, Button } from 'react-bootstrap';
import ErrorsHandler from './errorshandler';


function Register(props) {

	const [ newUser, setNewUser ] = useState({ first_name: "", last_name: "", email: "", password: "", govid: {} })
	const [ formErrors, setFormErrors ] = useState({});
	const [ apiErrors, setApiErrors ] = useState({});
  	
	function validateForm() {
		let formIsValid = true;
		const errors = { first_name: "", last_name: "", email: "", password: "", govid: "" }
		
		if (!newUser.first_name) {
		  	formIsValid = false;
		  	errors.first_name = "*Enter your first name!"		  		  	
		} 

		if (!newUser.last_name) {
		  	formIsValid = false;
		  	errors.last_name = "*Enter your last name!"		  	
		}

		if (!newUser.email) {
			formIsValid = false;
			errors.email = "*Please enter your email"						
		} 

		if (typeof newUser.email !== "undefined") {      
		  	var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		  	if (!pattern.test(newUser.email)) {
				formIsValid = false;
				errors.email = "*Please enter valid email."				
		  	}
		}

		if (!newUser.password) {
		  	formIsValid = false;
		   	errors.password = "*Please enter a password"			
		}

		if (!newUser.govid) {
		  	formIsValid = false;
		  	errors.govid = "*Must select a file"			
		} else {
		  	const types = ['application/pdf', 'image/jpeg', 'image/png'];
		  	if (types.every(type => newUser.govid.type !== type)) {
				formIsValid = false;
				errors.govid = "*Invalid file type"				
		  	}
		}

		setFormErrors(errors)		
		
		return formIsValid;
	}

	function handleChange(e){
		setNewUser({
			...newUser,
			[e.target.name]: e.target.value
		})
	}
  
	function handleRegister(e) {
		e.preventDefault();
		
		if (validateForm()) {
		  	const user = new FormData(); 
		  	for (var i in newUser) {
		  		user.append(`user[${i}]`, newUser[`${i}`])
			}
			props.setAuthentication(user,setApiErrors)   		
	  	}
	 }

		
	return (
		<div className="p-4">
			{Auth.isUserAuthenticated() &&
				<Redirect to="/dashboard" />
			}
		<h3 className="text-center">Create a new account</h3>
			<Form onSubmit={handleRegister}>		      		
			  	<Form.Group>
					<Form.Label>E-mail</Form.Label>
					<Form.Control type="email" name="email"value={newUser.email} onChange={handleChange} autoComplete="off"/>                
					<Form.Text className="text-danger">{formErrors.email}</Form.Text>
					<ErrorsHandler errors={apiErrors.email} field="Email" />
			  	</Form.Group> 
			  	<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" value={newUser.password} onChange={handleChange}/>		      		
					<Form.Text className="text-danger">{formErrors.password}</Form.Text>
			 	</Form.Group>     
			  	<Form.Group>
					<Form.Label>First name</Form.Label>
					<Form.Control type="text" name="first_name" value={newUser.first_name} onChange={handleChange} autoComplete="off"/>
					<Form.Text className="text-danger">{formErrors.first_name}</Form.Text>
			  	</Form.Group> 
			  	<Form.Group>
					<Form.Label>Last name</Form.Label>
					<Form.Control type="text" name="last_name" value={newUser.last_name} onChange={handleChange} autoComplete="off"/>
					<Form.Text className="text-danger">{formErrors.last_name}</Form.Text>
			  	</Form.Group> 
			  	<Form.Group> 
					<Form.Label>Upload government ID</Form.Label>
					<Form.Control type="file" name="govid" accept="application/pdf, image/png, image/jpeg" onChange={(e) => setNewUser({...newUser, govid: e.target.files[0]})}/>
					<Form.Text className="text-danger">{formErrors.govid}</Form.Text>
		  		</Form.Group> 
				<Button variant="primary" type="submit">Register</Button>
			</Form>  
		</div>					
	);
}


function mapStateToProps(state) {
  	return {
  		errors: state.errors
  	}
}

function mapDispatchToProps(dispatch) {
  	return {
  		setAuthentication: (user, setApiErrors) => {
			dispatch(async () => {
				const res = await fetch(`${API_ROOT}/users`, { 
		    	  	method: 'POST', 
		      		body: user 		      		
		    	})
		    	const data = await res.json()
		    	if(data.token) {
		    		dispatch({type: "SET_AUTHENTICATION", payload:data.token})	
		    	} else {
		    		setApiErrors(data.errors)
		    	}				
			}).catch(e => console.log(e))				
		}
  	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
