import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import Auth from '../modules/auth';

const initialState = {
	authenticated: Auth.isUserAuthenticated(),
	errors: [] 
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_AUTHENTICATION":
			Auth.authenticateToken(action.payload)			
			return {...state, authenticated: Auth.isUserAuthenticated() }
		case "SET_AUTHENTICATION_ERRORS":			
			return {...state, errors: action.payload }
		default:
			return state
	}
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store