import React from 'react'

const Alert = (props) => {

    const capitalise = (word) => {
        if(word==="danger"){
            word = "error";
        }
        const lowertext = word.toLowerCase();
        return lowertext.charAt(0).toUpperCase() + lowertext.slice(1);
    }

  return (
    <div style={{height: '50px'}}>{
    props.alert && <div className={`alert alert-${props.alert.stus} alert-dismissible fade show`} role="alert">
        <strong>{capitalise(props.alert.stus)}:</strong> {props.alert.msg}
    </div>
    }</div>
  )
}

export default Alert