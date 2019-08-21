import React, { Fragment, useState, useEffect} from 'react';
import ActionCable from 'actioncable';
import { API_ROOT, API_WS_ROOT } from '../constants';

export default function Count() {
	
	const [ count, setCount ] = useState("") 

	useEffect(() => {
		async function fetchCount() {
			const res = await fetch(`${API_ROOT}/count`)
			const data = await res.json()
			setCount(data)	
		}
		fetchCount()		
		
		const cable = ActionCable.createConsumer(`${API_WS_ROOT}`);
		
		let sub = cable.subscriptions.create(
      		{ channel: 'RequestCountChannel' },
		    { received: (response) => { handleReceived(response) } }
    	);
		return () => {
			cable.subscriptions.remove(sub)
		}
	}, [])

	function handleReceived(response) {
		setCount(response)
	}
	
	return(
		<Fragment>				
   			<div className="text-center m-2">
   				<h3>Unfulfilled help requests</h3>
   				<h1>{count}</h1>
   			</div>
		</Fragment>
	);	
}