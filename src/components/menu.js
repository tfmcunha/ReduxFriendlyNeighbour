import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { API_ROOT } from '../constants';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Auth from '../modules/auth';
import '../css/menu.css';

export default function Menu({username}) {

	const [ redirect, setRedirect ] = useState(false)
	
	async function handleLogout() {
		const res = await fetch(`${API_ROOT}/logout`, {
			method: 'delete',
			headers: {
				'Authorization': `Token ${Auth.getToken()}`
			}
		})
		
		if (res.status === 200) {
			console.log(res)
			Auth.deauthenticateUser();
			setRedirect(true)	
		} else {
			console.log(res.status)
		}
	}

	return (    		
 		<Fragment>
 			{redirect && <Redirect to="/" />}
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