import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_ROOT } from '../constants';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Auth from '../modules/auth';
import '../css/menu.css';

function Menu({username, deAuthenticate}) {

	async function handleLogout() {
		const res = await fetch(`${API_ROOT}/logout`, {
			method: 'delete',
			headers: {
				'Authorization': `Token ${Auth.getToken()}`
			}
		})
		
		if (res.status === 200) {
			deAuthenticate();
		} else {
			console.log(res.status)
		}
	}

	return (    		
 		<Fragment>
     		<Navbar bg="light" expand="sm" className="menu" >
	     		<Navbar.Brand className="brand p-2" href="/">Friendly Neighbour</Navbar.Brand>		     		
	     		<Navbar.Toggle aria-controls="basic-navbar-nav" />
	     		<Navbar.Collapse id="basic-navbar-nav">
		     		<Nav className="ml-auto">				     		
			     		<NavDropdown title={`Hello, ${username}`} id="basic-nav-dropdown">
				     		<NavDropdown.Item href="/dashboard/profile">Profile</NavDropdown.Item>
				     		<NavDropdown.Divider />
				     		<NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
			     		</NavDropdown>
		     		</Nav>
	     		</Navbar.Collapse>
     		</Navbar>

  		</Fragment>
	);  	
}

function mapDispatchToProps(dispatch){
	return {
		deAuthenticate: () => dispatch({type: "DEAUTHENTICATE"})
	}
}

export default connect(null,mapDispatchToProps)(Menu)