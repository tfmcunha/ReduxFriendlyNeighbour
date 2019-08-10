import { createStore } from 'redux'

const initialState = {

}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "label_1":
			return state
		default:
			return state
	}
}

const store = createStore(reducer)

export default store