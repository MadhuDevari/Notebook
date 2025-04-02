import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
    let history = useHistory();

    const handleSubmit = async (e)=> {
        e.preventDefault();
        const {name, email, password } = credentials;
        const myRequest = new Request(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password})
          });
          const response = await fetch(myRequest);
          const json = await response.json();
          console.log(json);
          if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history.push("/");
            props.showAlert("success", "Account Created Successfully");
          }
          else {
            props.showAlert("danger", "Email already exists");
          }
    }

    const onChange = (e)=> {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div className='container mb-3 notebookform px-2'>
            <h2 className='mb-3 text-center'>Create an account to use Notebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
