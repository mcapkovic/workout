import React from "react";

function TextBox(props){
    return <input {...props} autocomplete='off' className='textbox' />
}

export default TextBox;