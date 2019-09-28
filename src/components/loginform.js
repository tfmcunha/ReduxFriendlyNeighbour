import React from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import useForm from '../hooks/useForm';


import Auth from '../modules/auth';

function LoginForm(props){
	const { handleChange, handleSubmit, user, formErrors } = useForm(submit)
	
	function submit(){
		props.setAuthentication(user)		
	}
	
	return (
  		<div className="p-4">
  			{Auth.isUserAuthenticated() &&
  				<Redirect to="/dashboard" />
  			}
      			<h3 className="text-center">LOGIN</h3>
      			<Form id="form" onSubmit={handleSubmit}>
      				<Form.Group>
      					<Form.Label>E-mail</Form.Label>
		      			<Form.Control type="text" name="email" onChange={handleChange} autoComplete="off" />
		      			{formErrors.email && <Form.Text className="text-danger">{formErrors.email}</Form.Text>}
					</Form.Group>		      			
		      		<Form.Group>
		      			<Form.Label>Password</Form.Label>
		      			<Form.Control type="password" name="password" onChange={handleChange} />
		      			{formErrors.password && <Form.Text className="text-danger">{formErrors.password}</Form.Text>}
		      		</Form.Group>
		      		{props.errors !== undefined &&
      					props.errors.map((error, index) => (
      						<Form.Group key={index}>
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
		auth: state.auth.authenticated,
		errors: state.auth.errors
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