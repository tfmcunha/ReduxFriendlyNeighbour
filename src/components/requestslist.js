import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

function RequestsList(props) {	

	function handleRequest(request_id) {		
		let currentRequest = props.requests.find(request => request.id === request_id)
		props.setCurrentRequest(currentRequest)			
	}

	return(
		<div className="p-3 detailbox text-center">
			<h3>Requests</h3>
				<ListGroup>
	      		{props.requests !== undefined &&
	      			props.requests.length !== 0 ?
		      			props.requests.map(request => 
		      				<ListGroup.Item className="text-truncate" action key={request.id} onClick={(e) => handleRequest(request.id)}>{request.title}</ListGroup.Item>			      			 
		    	  		) 
		    	  		: <h6>No requests available in this area. <br />Drag map to find</h6>
	    	  	}
	      		</ListGroup>
		</div>
	);	
}

function mapStateToProps(state){
	return {
		requests: state.requests,		
	}
}

function mapDispatchToProps(dispatch){
	return {
		setCurrentRequest: (request) => {	 		
	 		dispatch({type: "SET_CURRENT_REQUEST", payload: request})		
		}		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestsList)