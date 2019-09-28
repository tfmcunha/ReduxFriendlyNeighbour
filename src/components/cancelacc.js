import React, { useState } from 'react';
import { connect } from 'react-redux';
import Auth from '../modules/auth';
import { Modal, Button } from 'react-bootstrap';
import { API_ROOT } from '../constants';


function CancelAcc({userId, deAuthenticate}) {
	
  const [ show, setShow ] = useState(false)  

	async function handleCancelation(e) {
    e.preventDefault();
    const res = await fetch(`${API_ROOT}/users/${userId}`, { 
        method: 'DELETE',
        headers: {          
          token: Auth.getToken(),
          'Authorization': `Token ${Auth.getToken()}`
        }
      })
    const data = await res.json()
    if (data.status === "ok") {      
      deAuthenticate()    
    }    
  }	

  return (
    <div className="py-3 border-top border-warning">         
      <Button variant="danger" onClick={() => setShow(true)}>
        Cancel Account
      </Button>

      <Modal size="sm" show={show} onHide={() => setShow(false)}>
        <div className="m-3 text-center">
          <h6>This action cannot be undone!!</h6>
          <Button variant="danger" onClick={handleCancelation}>Confirm</Button>  
        </div>
      </Modal>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    deAuthenticate: () => dispatch({type: "DEAUTHENTICATE"})
  }
}

export default connect(null, mapDispatchToProps)(CancelAcc);