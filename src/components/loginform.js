import React, { useState } from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import Auth from '../modules/auth';

function LoginForm(props){

	const [ user, setUser ] = useState({ email: "", password: ""})
	const [ formErrors, setFormErrors ] = useState({});

	function validateForm() {
		let formIsValid = true
		const errors = {email: "", password:""}

		if (!user.email) {			
			formIsValid = false;
			errors['email'] = "*Please enter your email"
		} 

		if (typeof user.email !== "undefined") {      			
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (!pattern.test(user.email)) {				
				formIsValid = false;
				errors['email'] = "*Please enter valid email."	
			}
		}

		if (!user.password) {			
			formIsValid = false;
			errors['password'] = "*Please enter your password"
		}

		setFormErrors(errors)
		return formIsValid;
	}

	function handleChange(e){
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	function handleLogin(e) {
		e.preventDefault()
		if ( validateForm() ) {		    
		    props.setAuthentication(user)		    
		}	       
	}	
	
	return (
  		<div className="p-4">
  			{Auth.isUserAuthenticated() &&
  				<Redirect to="/dashboard" />
  			}
      			<h3 className="text-center">LOGIN</h3>
      			<Form onSubmit={handleLogin}>
      				<Form.Group>
      					<Form.Label>E-mail</Form.Label>
		      			<Form.Control type="text" name="email" value={user.email} onChange={handleChange} autoComplete="off"/>
		      			<Form.Text className="text-danger">{formErrors.email}</Form.Text>
					</Form.Group>		      			
		      		<Form.Group>
		      			<Form.Label>Password</Form.Label>
		      			<Form.Control type="password" name="password" value={user.password} onChange={handleChange} />
		      			<Form.Text className="text-danger">{formErrors.password}</Form.Text>
		      		</Form.Group>
		      		{props.errors !== undefined &&
      					props.errors.map(error => (
      						<Form.Group>
      							<Form.Text className="text-danger">*{error.detail}</Form.Text>
      						</Form.Group>
      				))
      				}
		      		<Button variant="primary" type="submit" >OK</Button>		      		
      			</Form>      			
  		</div>      				
	);  			
}

function mapStateToProps(state) {
	return{
		auth: state.authenticated,
		errors: state.errors
	}		
}

function mapDispatchToProps(dispatch) {
	return {
		setAuthentication: (user) => {
			dispatch(async () => {
				const res = await fetch(`${API_ROOT}/login`, { 
		    	  	method: 'POST', 
		      		body: JSON.stringify(user), 
		      		headers: {
		      		  	'Content-Type': 'application/json'
		      		}
		    	})
		    	const data = await res.json()
		    	if(data.token) {
		    		dispatch({type: "SET_AUTHENTICATION", payload:data.token})	
		    	} else {
		    		dispatch({type: "SET_AUTHENTICATION_ERRORS", payload:data.errors})			
		    	}				
			}).catch(e => console.log(e))				
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm)