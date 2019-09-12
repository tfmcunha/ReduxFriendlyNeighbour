import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

function RequestMap(props){

	function onMapClick(unused1,unused2,e) {		
		props.handleNewRequest(e.latLng.lat(), e.latLng.lng());
	}

	function setMarkerColor(type){	
		let icon = "";	
  		if (type === "Materials" ) {
  			icon = "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  		} else {
  			icon = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  		}
  		return icon
	}

	function mapDragged(unused, map) {
		let newCenter = {lat:"", lng:""};
		newCenter["lat"] = map.getCenter().lat();
		newCenter["lng"] = map.getCenter().lng();
		props.onMapDrag(newCenter)
	}

	function handleRequest(request_id) {		
		let currentRequest = props.requests.find(request => request.id === request_id)
		props.setCurrentRequest(currentRequest)			
	}

	return (
		<Fragment>

			<Map 
				google= {props.google}           
				initialCenter={props.currentLocation}
				center={props.currentLocation}
				zoom={15}
				zoomControl={false}
				scrollwheel={false}
				onClick={onMapClick}
				onDragend={mapDragged}
			>

	          	{props.requests.map(request => (
	              	<Marker
	                    key={request.id}
	                    name={request.title}
	                    position={{lat: request.lat, lng: request.lng}}
	                    icon={setMarkerColor(request.req_type)}
	                    onClick={(e) => handleRequest(request.id)} 
	               	/>		          	
	          		))
	          	}     
	        </Map> 
	    </Fragment>		    
    );	
}

function mapStateToProps(state){
	return {
		requests: state.requests,		
		currentLocation: state.currentLocation
	}
}

function mapDispatchToProps(dispatch){
	return{
		setCurrentRequest: (request) => {	 		
	 		dispatch({type: "SET_CURRENT_REQUEST", payload: request})		
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GM_API_KEY)
})(RequestMap))
