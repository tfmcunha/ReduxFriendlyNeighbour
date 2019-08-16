import { useState } from 'react'

export default function useValidation() {
		const [ formErrors, setFormErrors ] = useState({})

	function validate(user) {
		let errors = {}		
		let isValid = true

		if (!user.email) {			
			isValid = false;
			errors['email'] = "*Please enter your email"
		} 

		if (typeof user.email !== "undefined") {      			
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			if (!pattern.test(user.email)) {				
				isValid = false;
				errors['email'] = "*Please enter valid email."	
			}
		}

		if (!user.password) {			
			isValid = false;
			errors['password'] = "*Please enter your password"
		}
		
		setFormErrors({...errors})

		return isValid
	}
	
	return {
		validate,
		formErrors
	}
}