import React, { Component, Fragment } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

function RequestMap({google, handleRequest, handleNewRequest, onMapDrag, currentLocation, requests}){

	function onMapClick(unused1,unused2,e) {		
		handleNewRequest(e.latLng.lat(), e.latLng.lng());
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
		onMapDrag(newCenter)
	}


		return (
			<Fragment>

				<Map 
					google= {google}           
					initialCenter={currentLocation}
					center={currentLocation}
					zoom={15}
					zoomControl={false}
					scrollwheel={false}
					onClick={onMapClick}
					onDragend={mapDragged}
				>

		          	{requests.map(request => (
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

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GM_API_KEY)
})(RequestMap)
