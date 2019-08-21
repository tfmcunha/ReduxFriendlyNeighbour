import React, { useEffect, useState, Fragment } from 'react';
import { API_ROOT } from '../constants';
import { Link } from 'react-router-dom';
import Auth from '../modules/auth';
import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import { FaBackward } from "react-icons/fa";
import CancelAcc from './cancelacc';


function Profile(props) {
	
	const [ ownedRequests, setOwnedRequests ] = useState([])
	const [isVolunteer, setIsVolunteer] = useState([])
	const [user, setUser] = useState({})
	const [errors, setErrors] = useState({})
	
	useEffect(() => {
		fetchOwnedRequests().catch(error => console.log('An error occured ', error.message))
	}, [])	

	async function fetchOwnedRequests(){
		const res = fetch(`${API_ROOT}/owner`, { 
			method: 'GET',
			headers: {	        
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`			
			}	
		})
		const data = res.json()
		
		setOwnedRequests(data.requests)
		setIsVolunteer(data.isVolunteer)				
	}

	function handleChange(e) {		
		setUser({
			...user,
			[e.target.name]: e.target.value		
		})			
	}	

	async function handleRegister(e) {
		const res = fetch(`${API_ROOT}/users/${props.user.id}`,{
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json', 	       
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`			
			},
			body: JSON.stringify(user)
		})
		const data = res.json()		
	}

	
	return (
		<Fragment>
			<Row>
				<Col>
					<div className="p-2"><h6><Link to="/dashboard"><FaBackward /> Dashboard</Link></h6></div>
				</Col>
			</Row>
			<Row>
				<Col md={4}>
					<div className="mt-2 border-top border-warning pb-3">
						<h3 className="text-center">Edit your details</h3>
						<Form onSubmit={handleRegister}>		      		
							<Form.Group>
								<Form.Label>E-mail</Form.Label>
								<Form.Control type="email" defaultValue={props.user.email} disabled/>				
							</Form.Group> 

							<Form.Group>
								<Form.Label>First name</Form.Label>
								<Form.Control type="text" defaultValue={props.user.first_name} name="first_name" onChange={handleChange}/>
								<Form.Text className="text-danger">{errors.first_name}</Form.Text>
							</Form.Group> 

							<Form.Group>
								<Form.Label>Last name</Form.Label>
								<Form.Control type="text" name="last_name" defaultValue={props.user.last_name} onChange={handleChange}/>
								<Form.Text className="text-danger">{errors.last_name}</Form.Text>
							</Form.Group>   

							<Button variant="primary" type="submit">Save</Button>
						</Form>							
					</div>
					<CancelAcc handleAuth={props.handleAuth}/>
				</Col>

				<Col md={4}>
					<div className="mt-2 border-top border-warning">
						<h3 className="text-center">I need help:</h3>
						<ListGroup variant="flush" className="text-center">
						{ownedRequests !== undefined &&
							ownedRequests.map(request => (
							<ListGroup.Item key={request.id}><Link to={"/dashboard/request"} onClick={(e) => props.handleOwnRequest(request)}>{request.title}</Link></ListGroup.Item>
						))}
						</ListGroup>
					</div>
				</Col>

				<Col md={4}>
					<div className="mt-2 border-top border-warning">
						<h3 className="text-center">Im helping:</h3>
						<ListGroup variant="flush" className="text-center">
						{isVolunteer !== undefined &&
							isVolunteer.map(request => (							
							<ListGroup.Item key={request.id}><Link to={"/dashboard/request"} onClick={(e) => props.handleOwnRequest(request)} >{request.title}</Link></ListGroup.Item>
						))}
						</ListGroup>
					</div>
				</Col>

			</Row>
		</Fragment>
	);
	
}

export default Profile;