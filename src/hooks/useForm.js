import { useState } from 'react';
import useValidation from '../hooks/useValidation';

export default function useForm(callback) {

	const [ user, setUser ] = useState({ email: "", password: ""})
	const { validate, formErrors} = useValidation()	
	
	function handleChange(e){
		setUser({
			...user,
			[e.target.name]: e.target.value
		})
	}

	function handleSubmit(e) {
		e.preventDefault()
		console.log(validate(user))
		if (validate(user)) {
			callback()	       	
		}		
	}	

	return {
		handleChange,
		handleSubmit,
		user,		
		formErrors
	}	
}