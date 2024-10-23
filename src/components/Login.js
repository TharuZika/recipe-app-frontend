import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic
    // navigate("/");
    axios.post('http://localhost:5000/api/auth/login', {email, password})
      .then(res => {
        console.log(res);
        if(res.data.flag){
          navigate("/");
        }else{
          alert(res.data.msg);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-lg border-0 login-form">
          <div className="card-body px-5">
            {/* <img src={'https://img.freepik.com/free-vector/hand-drawn-cs-food-logo_23-2149385086.jpg?t=st=1729664812~exp=1729668412~hmac=ee8d3cf8eaf7fdc07b62a1595dab5fc598f23c0fb9ab2074c1de24856eb4d29e&w=740'} className="login-img mx-auto d-block"/> */}
            <h3 className="card-title">Login</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="w-100 btn btn-primary fw-semibold">SIGN IN</button>
            </form>
            <div>
            <div className="mt-3 text-center">
                <p>Don't have an account <Link className="text-dark" to="/register">Register now!</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;