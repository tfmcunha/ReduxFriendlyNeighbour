import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Row, Col, Modal } from 'react-bootstrap';
import Auth from '../modules/auth';
import Menu from './menu';
import RequestMap from './map';
import RequestsList from './requestslist';
import RequestDetail from './requestdetail';
import Request from './request';
import Profile from './profile';
import NewRequest from './newrequest';
import NotFound from './404notfound';
import '../css/dashboard.css';

function Dashboard(props){
	
	const [showModal, setShowModal] = useState(false)
	const [newRequestLocation, setNewRequestLocation] = useState({})

	useEffect(() => {
		props.getLocation(); 
		props.fetchProfile();		
	}, [])

	useEffect(() => {		
		props.fetchRequests(props.currentLocation);
	}, [])

	
	function onMapDrag(newCenter) {			
		props.fetchRequests(newCenter)		
	}
//CALLED WHEN CLICKING A REQUEST FROM THE LIST OR FROM MARKER	
	// 

	// }
//CALLED FROM PROFILE WHEN CHOOSING OWN REQUEST OR REQUEST WHERE USER IS VOLUNTEER
	// function handleOwnRequest(request) {
	// 	let currentRequest = request;		
	// 	this.setState({
	// 		currentRequest
	// 	})	
	// }

	function handleNewRequest(lat, lng) {
		const coords = {lat: lat, lng: lng}
		setNewRequestLocation(coords)
		setShowModal(true)			
	}

	return (
		<Fragment>
			{!(Auth.isUserAuthenticated()) &&
				<Redirect to="/" />
			}

			<Menu username={props.user.first_name}/>     

			<Switch>
				<Route 
				exact path="/dashboard" 
					render={() => 
						<Fragment>
							<Row>
								<Col md={9}>
									<div className="map-container">
										<RequestMap 
											onMapDrag={onMapDrag} 
											currentLocation={props.currentLocation} 
											handleNewRequest={handleNewRequest} 
											requests={props.requests}
											//handleRequest={handleRequest} 
										/>
									</div>
								</Col>
								<Col md={3}>
									<div className="my-2">
										<RequestsList />
									</div>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="m-2 p-2">
										<RequestDetail />    
									</div>
								</Col>
							</Row>
						</Fragment>
					} 
				/> 

				<Route 
					exact path={"/dashboard/request"}
					render={() => 					
						<Request 
							user_id={props.user.id} 
							request={props.currentRequest} 
						/>      					      				
					}
				/>   

				<Route 
					exact path="/dashboard/profile"
					render={() => 					
						<Profile 
							user={props.user} 
							//handleOwnRequest={this.handleOwnRequest} 
							//handleAuth={this.props.handleAuth}
						/>      					      				
					}
				/> 

				<Route component={NotFound} />

			</Switch>

			<Modal size="lg" show={showModal} onHide={() => setShowModal(false)}> 
				<NewRequest newRequestLocation={newRequestLocation} close={() => setShowModal(false)} />				
			</Modal>


		</Fragment>
	);	
}

function mapStateToProps(state) {
	return {
		currentLocation: state.currentLocation,
		user: state.user,
		requests: state.requests,
		currentRequest: state.currentRequest,	
		newLocation: state.newLocation
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getLocation: () => {
			if (navigator && navigator.geolocation) {
	            navigator.geolocation.getCurrentPosition((pos) => {
	                const coords = pos.coords;
	                dispatch({type: "SET_LOCATION", payload: coords})
	            })
	        }
		},

		fetchProfile: () => {
			dispatch( async ()=> {
				const res = await fetch(`${API_ROOT}/profile`, { 
					method: 'GET',
					headers: {	        
						token: Auth.getToken(),
						'Authorization': `Token ${Auth.getToken()}`
					}
				})
				const data = await res.json()
				
				if (data.user !== undefined ) {
					dispatch({type: "SET_USER", payload:data.user})
				}
			}).catch(error => console.log('An error occured ', error))	
		},

		fetchRequests: (coords) => {
			dispatch( async ()=> {
				const res = await fetch(`${API_ROOT}/requests`, { 
					method: 'GET',
					headers: {	        
						token: Auth.getToken(),
						'Authorization': `Token ${Auth.getToken()}`,
						"lat":coords.lat,
						"lng":coords.lng
					}
				})
				const data = await res.json()

				dispatch({type: "SET_REQUESTS", payload:data})
				
			}).catch(error => console.log('An error occured ', error))						
		}		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);