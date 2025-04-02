import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let history = useHistory();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        const myRequest = new Request(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const response = await fetch(myRequest);
          const json = await response.json();
          console.log(json);
          if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("success", "Logged in Successfully");
            history.push("/");
          }
          else {
            props.showAlert("danger", "Invalid Credentials");
          }
    }

    const onChange = (e)=> {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div className='container mb-3 notebookform'>
            <h2 className='mb-3 text-center'>Login to continue Notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} aria-describedby="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
