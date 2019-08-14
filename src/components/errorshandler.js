import React from 'react';

function ErrorsHandler(props){    
    return (
        <div>      
     	    {props.errors !== undefined &&
                props.errors.map((error, index) => (
                    <div className="text-danger" key={index}>{`*${props.field} ${error}`}</div>
                ))            
      	    }
        </div>
    );  
}

export default ErrorsHandler;
