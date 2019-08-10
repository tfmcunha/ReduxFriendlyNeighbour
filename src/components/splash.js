import React, { useState } from 'react';
import { Row, Col, Button, Modal, Image } from 'react-bootstrap';
import Count from './count';
import LoginForm from './loginform';
import Register from './register';
import '../css/splash.css';

export default function Splash(){

	const [ showLogin, setShowLogin ] = useState(false);
	const [ showRegister, setShowRegister ] = useState(false);	

	return (
		<div className="cover">				
			<Row>
				<Col lg={6} className="d-none d-lg-block">
					<div className="d-flex justify-content-center align-items-center vh-100">
						<div className="m-5 box">
							<h1 className="display-4 p-4 text-center">
								JOIN YOUR NEIGHBOURS IN A NETWORK OF MUTUAL AID!
							</h1>
							
							<Count />
							
						</div>
					</div>
				</Col>
				<Col lg={6}>
					<div className="d-flex justify-content-center align-items-center vh-100">
						<div className="p-2 box">
							<div className="m-2 brand text-center"> Friendly Neighbour </div>
							<Image className="d-block" src ="./handyman.png" fluid/>
							<div className="d-flex justify-content-center">
								<Button variant="primary" className="m-2" onClick={() => setShowLogin(true)}>
									Login
								</Button>

								<Button variant="primary" className="m-2" onClick={() =>setShowRegister(true)}>
									Register
								</Button>
							</div>
							<Modal size="sm" show={showLogin} onHide={() => setShowLogin(false)}>
								<LoginForm />					
							</Modal>

							<Modal size="lg" show={showRegister} onHide={() => setShowRegister(false)}>
								<Register />
							</Modal>

						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
}