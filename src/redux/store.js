import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import Auth from '../modules/auth';

const initialState = {
	currentLocation: {},
	user: {},
	requests: [],
	currentRequest: {},	
	newLocation: {
		lat: "",
		lng: ""
	}
}

const authInitState = {	
	authenticated: Auth.isUserAuthenticated(),
	errors: [],
}

const authReducer = (state = authInitState, action ) => {
	switch (action.type) {
		case "SET_AUTHENTICATION":
			Auth.authenticateToken(action.payload)			
			return {...state, authenticated: Auth.isUserAuthenticated() }
		case "SET_AUTHENTICATION_ERRORS":			
			return {...state, errors: action.payload }
		case "DEAUTHENTICATE":
			Auth.deauthenticateUser()
			return {...state, authenticated: false }
		default:
			return {...state, authenticated: Auth.isUserAuthenticated() }
	}
}

const mainReducer = (state = initialState, action) => {
	const checkAuth = Auth.isUserAuthenticated()
	if (checkAuth) {
		switch (action.type) {		
			case "SET_LOCATION":
				return {...state, currentLocation: {lat: action.payload.latitude, lng: action.payload.longitude}}
			case "SET_USER":
				return {...state, user: {...action.payload}}
			case "SET_REQUESTS":
				return {...state, requests: [...action.payload]}
			case "SET_CURRENT_REQUEST":
				return {...state, currentRequest: {...action.payload}}
			default:
				return state
		}
	} else {
		return {...state}
	}
}

const reducer = combineReducers({auth: authReducer, main: mainReducer})

const store = createStore(reducer, applyMiddleware(thunk))

export default store