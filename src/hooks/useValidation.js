import { useState } from 'react'

export default function useValidation() {
	const [ formErrors, setFormErrors ] = useState({})

	function validate(user) {
		setFormErrors({})
		console.log(errors)
		let errors = {}		
		let isValid = true

		for (var i  of Object.keys(user) ) {
			if ( !user.i ) {
				isValid = false;
				errors[`${i}`] = "*This field can't be empty!"
			}
		}
		     			
		var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		if (!pattern.test(user.email)) {				
			isValid = false;
			errors['email'] = "*Please enter valid email."	
		}		
		
		  	const types = ['application/pdf', 'image/jpeg', 'image/png'];
		  	if (types.every(type => user.govid.type !== type)) {
				isValid = false;
				errors["govid"] = "*Invalid file type"				
		  	}
		
		
		setFormErrors({...errors})

		return isValid
	}
	
	return {
		validate,
		formErrors
	}
}