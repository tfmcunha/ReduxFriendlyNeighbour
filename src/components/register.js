import React, { useState } from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants';
import { Redirect } from 'react-router-dom';
import Auth from '../modules/auth';
import { Form, Button } from 'react-bootstrap';
import ErrorsHandler from './errorshandler';
import useForm from '../hooks/useForm';


function Register(props) {

	const { handleChange, handleSubmit, user, formErrors } = useForm(submit)
	const [ apiErrors, setApiErrors ] = useState({});
  
	function submit(){
		const newUser = new FormData(); 
		for (var i in user) {
			newUser.append(`user[${i}]`, user[`${i}`])
		}
		props.setAuthentication(newUser,setApiErrors)
	}
		
	return (
		<div className="p-4">
			{Auth.isUserAuthenticated() &&
				<Redirect to="/dashboard" />
			}
		<h3 className="text-center">Create a new account</h3>
			<Form id="form" onSubmit={handleSubmit}>		      		
			  	<Form.Group>
					<Form.Label>E-mail</Form.Label>
					<Form.Control type="email" name="email" onChange={handleChange} autoComplete="off"/>                
					<Form.Text className="text-danger">{formErrors.email}</Form.Text>
					<ErrorsHandler errors={apiErrors.email} field="Email" />
			  	</Form.Group> 
			  	<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="new_password" onChange={handleChange}/>		      		
					<Form.Text className="text-danger">{formErrors.new_password}</Form.Text>
			 	</Form.Group>     
			  	<Form.Group>
					<Form.Label>First name</Form.Label>
					<Form.Control type="text" name="first_name" onChange={handleChange} autoComplete="off"/>
					<Form.Text className="text-danger">{formErrors.first_name}</Form.Text>
			  	</Form.Group> 
			  	<Form.Group>
					<Form.Label>Last name</Form.Label>
					<Form.Control type="text" name="last_name" onChange={handleChange} autoComplete="off"/>
					<Form.Text className="text-danger">{formErrors.last_name}</Form.Text>
			  	</Form.Group> 
			  	<Form.Group> 
					<Form.Label>Upload government ID</Form.Label>
					<Form.Control type="file" name="govid" accept="application/pdf, image/png, image/jpeg" onChange={handleChange}/>
					<Form.Text className="text-danger">{formErrors.govid}</Form.Text>
		  		</Form.Group> 
				<Button variant="primary" type="submit">Register</Button>
			</Form>  
		</div>					
	);
}


function mapStateToProps(state) {
  	return {
  		errors: state.auth.errors
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
