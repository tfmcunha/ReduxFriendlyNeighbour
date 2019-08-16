import React, { Fragment, useEffect } from 'react';
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

function Dashboard(){
	
		/*this.state = {
			currentLocation: {},
			user: {},
			requests: [],
			currentRequest: {},	
			newLocation: {},
			show: false,
			alert: false
		}		*/
		
	

	useEffect(() => {
		getLocation(); 
		fetchProfile();	
	}, [])

	function fetchProfile() {
		fetch(`${API_ROOT}/profile`, { 
			method: 'GET',
			headers: {	        
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`
			}
		})
		.then(res => res.json())
		.then(json => {
			if (json.user !== undefined ) {
				this.setState({
					user: json.user
				});
			} else {
				Auth.deauthenticateUser();
				const { handleAuth } = this.props;  
				handleAuth(); 
			}
		})	
	}

	function fetchRequests() {	
		const lat = this.state.currentLocation.lat;
		const lng = this.state.currentLocation.lng;
		fetch(`${API_ROOT}/requests`, { 
			method: 'GET',
			headers: {	        
				token: Auth.getToken(),
				'Authorization': `Token ${Auth.getToken()}`,
				"lat":lat, 
				"lng":lng				
			}	
		})
		.then(res => res.json())
		.then(json => {
			
				this.setState({
					requests: json
				});						
			
		})
		.catch(error => console.log('An error occured ', error))			
	}

	function onMapDrag(newCenter) {			
		this.setState({
			currentLocation: newCenter
		}, () => this.fetchRequests()
		)
	}

	function getLocation() {		
		if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const coords = pos.coords;
                this.setState({                	
	                    currentLocation: {
	                        lat: coords.latitude,
	                        lng: coords.longitude
	                    }	                
                }, () => this.fetchRequests())
            })
        }
	}
//CALLED WHEN CLICKING A REQUEST FROM THE LIST OR FROM MARKER	
	function handleRequest(request_id) {
		let currentRequest = this.state.requests.find(request => request.id === request_id)	
		this.setState({
			currentRequest
		})	

	}
//CALLED FROM PROFILE WHEN CHOOSING OWN REQUEST OR REQUEST WHERE USER IS VOLUNTEER
	function handleOwnRequest(request) {
		let currentRequest = request;		
		this.setState({
			currentRequest
		})	
	}

	function handleNewRequest(lat, lng) {
		const coords = {lat: lat, lng: lng}
		this.setState({ 
			show: true,
			newLocation: coords
		});
	}

	function handleClose() {
		this.setState({show:false})
	}

	return (
		<Fragment>
			{!(Auth.isUserAuthenticated()) &&
				<Redirect to="/" />
			}

			<Menu user={this.state.user}/>     

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
											currentLocation={this.state.currentLocation} 
											handleNewRequest={handleNewRequest} 
											requests={this.state.requests}
											handleRequest={handleRequest} 
										/>
									</div>
								</Col>
								<Col md={3}>
									<div className="my-2">
										<RequestsList 
											requests={this.state.requests} 
											handleRequest={this.handleRequest} 
										/>
									</div>
								</Col>
							</Row>
							<Row>
								<Col>
									<div className="m-2 p-2">
										<RequestDetail 
											user_id={this.state.user.id} 
											request={this.state.currentRequest} 
										/>    
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
							user_id={this.state.user.id} 
							request={this.state.currentRequest} 
						/>      					      				
					}
				/>   

				<Route 
					exact path="/dashboard/profile"
					render={() => 					
						<Profile 
							user={this.state.user} 
							handleOwnRequest={this.handleOwnRequest} 
							handleAuth={this.props.handleAuth}
						/>      					      				
					}
				/> 

				<Route component={NotFound} />

			</Switch>

			<Modal size="lg" show={this.state.show} onHide={this.handleClose}> 
				<NewRequest user_id={this.state.user.id} newLocation={this.state.newLocation} close={this.handleClose} />
			</Modal>


		</Fragment>
	);	
}

export default connect()(Dashboard);
