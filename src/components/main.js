import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from '../modules/auth';
import Footer from './footer';
import Splash from './splash';
import Dashboard from './dashboard';
import Help from './help';
import NotFound from './404notfound';

function Main({authenticated}){ 
	return (        
		<div className="mb-5"> 	
			<Switch>				
				<Route 
					exact path="/" 
					render={() => authenticated
						? <Redirect to="/dashboard" />
						: <Splash /> 
				} />

				<Route 
					path="/dashboard" 
					render={() => authenticated 
						? <Dashboard /> 
						: <Splash />
				} />    
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

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps)(Main)