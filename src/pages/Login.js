import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactJsAlert from "reactjs-alert";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    sessionStorage.removeItem('authToken');
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(process.env.REACT_APP_API_URL+'auth/login', { email, password })
      .then(res => {
        console.log(res);
        if (res.data.flag) {
          sessionStorage.setItem('authToken', res.data.token);
          navigate("/");
        } else {
          setStatus(true);
          setType('error');
          setTitle(res.data.msg);
        }
      })
      .catch(error => {
          setStatus(true);
          setType('error');
          setTitle(error.response.data.errors[0].msg);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="col-md-6">
        <div className="card shadow-lg border-0">
          <div className="card-body px-5">
            <div className="text-center mb-4">
              <h1 className="logo-text">Cooke</h1> {/* LOGO */}
            </div>
            <h3 className="card-title text-center mb-4">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary w-100 fw-semibold">SIGN IN</button>
            </form>
            <div className="text-center mt-3">
              <p>Don't have an account? <Link to="/register" className="text-primary">Register</Link></p>
            </div>
          </div>
        </div>
      </div>

      <ReactJsAlert
        status={status} 
        type={type}
        title={title}
        Close={() => setStatus()}
        autoCloseIn={5000}
      />
    </div>
  );
}

export default Login;