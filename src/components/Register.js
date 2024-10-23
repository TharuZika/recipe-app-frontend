import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [repass, setRepass] = useState('');
    const [password, setPassword] = useState('');
    const [invalidmsg, setInvalidmsg] = useState(''); 
    const [isinvalid, setIsinvalid] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle authentication logic
    if(password !== repass){  // Use strict comparison (===)
        console.log('Password did not match');
        setIsinvalid('is-invalid');
        setInvalidmsg('Password did not matching!')
    }else{
        alert('Login successful');
        setIsinvalid('');
        setInvalidmsg('')
    }
    console.log({ email, password, repass });
  };

  const checkPass = (e) => {
    setRepass(e);
    if(password !== e){  // Use strict comparison (===)
        setIsinvalid('is-invalid');
        setInvalidmsg('Password did not matching!')
    }else{
        setIsinvalid('');
        setInvalidmsg('')
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-lg border-0 login-form">
          <div className="card-body px-5">
            <h3 className="card-title">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="repassword" className="form-label">Repeat Password</label>
                <input type="password" className={`form-control ${isinvalid}`} id="repassword" value={repass} onChange={(e) => checkPass(e.target.value)} />
                <span className='text-danger'>{invalidmsg}</span> 
              </div>
              <button type="submit" className="w-100 btn btn-primary fw-semibold">SIGN UP</button>
            </form>
            <div className="mt-3 text-center">
              <p>Already have an account? <Link className="text-dark" to="/login">Login here!</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;
