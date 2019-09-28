import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants';
import Auth from '../modules/auth';
import { Form, Button } from 'react-bootstrap';

function NewRequest(props){

	const [ newRequest, setNewRequest ] = useState({})
	const [ errors, setErrors ] = useState({})

	useEffect(() => {
		setNewRequest({
			...newRequest, 
			user_id: props.user_id, 
			lat: props.newRequestLocation.lat, 
			lng: props.newRequestLocation.lng
		})
	}, [])		

	function handleChange(e) {				
		setNewRequest({
			...newRequest,
			[e.target.name]: e.target.value
		})
	}

	function validateForm() {	    
	    let errors = {};
	    let formIsValid = true;

	    if (!newRequest.title) {
	      formIsValid = false;
	      errors.title = "*Enter a title!";
	    }

	    if (!newRequest.body) {
	      formIsValid = false;
	      errors.body = "*Enter a description (300 characters max)!";
	    } else {
	    	if(newRequest.body.length > 300) {
		    	formIsValid = false;
		      	errors.body = "*Description can't have more than 300 characters!";	
		    }
	    }	    

	    if (!newRequest.req_type) {
	      formIsValid = false;
	      errors.req_type = "*Choose a help type!";
	    } 	    

	    setErrors(errors)	      

	    return formIsValid;

	}

	async function handleNewRequest(e) {
		e.preventDefault();
		if(validateForm()) {
			const request = JSON.stringify(newRequest);
			const res = await fetch(`${API_ROOT}/requests`, { 
	        	method: 'POST', 
	        	body: request, 
	        	headers: {	        
		      		token: Auth.getToken(),
		        	'Authorization': `Token ${Auth.getToken()}`,
		        	'Content-Type': 'application/json'
		      	}        	
	      	})
	      	const data = await res.json()	
	      	if (data.status === "ok") {
	      		props.close();	      	
	      	} else {
	      		console.log(data)
	      	}	      	
	    }
	}
			
	return(
		<div className="p-4">
			<div className="text-center">Add new help request</div>
			<Form onSubmit={handleNewRequest}>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control type="text" name="title"  onChange={handleChange} autoComplete="off"/>
					<Form.Text className="text-danger">{errors.title}</Form.Text>
				</Form.Group>
				<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control as="textarea" rows="3" name="body" onChange={handleChange} autoComplete="off"/>
					<Form.Text className="text-danger">{errors.body}</Form.Text>
				</Form.Group>
				<Form.Group>
					<Form.Label>Request Type:</Form.Label>
					<Form.Check type="radio" label="Task" name="req_type" value="Task" onChange={handleChange} />
					<Form.Check type="radio" label="Materials" name="req_type" value="Materials" onChange={handleChange} />
					<Form.Text className="text-danger">{errors.req_type}</Form.Text>
				</Form.Group>					
				<Button variant="primary" type="submit">Send</Button>
				<Button variant="secondary" onClick={props.close}>Close</Button>
			</Form>
		</div>
	);	
}

function mapStateToProps(state){
	return {
		user_id: state.main.user.id
	}
}

export default connect(mapStateToProps)(NewRequest);