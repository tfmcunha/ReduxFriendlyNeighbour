import React from 'react';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import Main from './components/main';
import './App.css';

export default function App() {
  	return (        
    	<Container>        
    		<Provider store={store}>
      			<Main />
       		</Provider>
 	   	</Container>
    );  	
}