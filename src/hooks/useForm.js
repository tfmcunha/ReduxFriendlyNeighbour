import { useState, useEffect } from 'react';
import useValidation from '../hooks/useValidation';

export default function useForm(callback) {
	
	const [ user, setUser ] = useState({})		
	
	const { validate, formErrors} = useValidation()	

	useEffect(() => {
		const form = document.getElementById('form')
		const fields = {}		

  		for ( var i of form.elements ) {
  			if ( i.type !== "submit" && i.type !== "file" ) {
  				fields[`${i.name}`] = ""
  			} else if (i.type === "file") {
  				fields[`${i.name}`] = {}
  			} 
  		}
  		setUser({...fields})
	}, [])
	
	function handleChange(e){
		if (e.target.name === "govid") {
			setUser({
				...user, 
				[e.target.name]: e.target.files[0]
			})
		} else {
			setUser({
				...user,
				[e.target.name]: e.target.value
			})
		}				
	}

	function handleSubmit(e) {
		console.log(user)
		e.preventDefault()				
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