import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
//import store from '../redux/store';
import Auth from '../modules/auth';
import Footer from './footer';
import Splash from './splash';
import Dashboard from './dashboard';
import Help from './help';
import NotFound from './404notfound';

export default function Main(){ 
	return (        
		<div className="mb-5"> 	
			<Switch>
				<Route 
					exact path="/" 
					render={() => Auth.isUserAuthenticated()
						? <Redirect to="/dashboard" />
						: <Splash /> 
				} />

				<Route 
					path="/dashboard" 
					render={() => <Dashboard /> } 
				/>      

				<Route 
					path="/help"
					component={Help}
				/>

				<Route component={NotFound} />
			</Switch>	
			
			<Footer />
		</div>
	);
	
}