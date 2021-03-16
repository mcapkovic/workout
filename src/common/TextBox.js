import React from "react";

function TextBox(props){
    return <input {...props} autoComplete='off' className='textbox' />
}

export default TextBox;