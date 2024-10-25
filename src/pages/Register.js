import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactJsAlert from 'reactjs-alert';
import mainLogo from '../assets/images/main-logo.png';

function Register() {
    const [email, setEmail] = useState('');
    const [repass, setRepass] = useState('');
    const [password, setPassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const [invalidmsg, setInvalidmsg] = useState(''); 
    const [isinvalid, setIsinvalid] = useState(''); 
    const [regStatus, setRegStatus] = useState(false);

    const [alertStatus, setAlertStatus] = useState(false);
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !== repass){
        console.log('Password did not match');
        setIsinvalid('is-invalid');
        setInvalidmsg('Password did not matching!')
    }else{
        setIsinvalid('');
        setInvalidmsg('')

        axios.post(process.env.REACT_APP_API_URL+'auth/register', {firstname, lastname, email, phonenumber, password})
        .then(res => {
          console.log(res);
          if(res.data.flag){
            setAlertStatus(true);
            setRegStatus(true);
            setType('success');
            setTitle("Successfully created an account, Now login");
          }else{
            setAlertStatus(true);
            setType('error');
            setTitle(res.data.msg);
            setRegStatus(false);
          }
        })
        .catch(error => {
          setAlertStatus(true);
          setType('error');
          setTitle(error.response.data.errors[0].msg);
      });
    }
    console.log({ firstname, lastname, email, password, repass });
  };

  const checkPass = (e) => {
    setRepass(e);
    if(password !== e){
        setIsinvalid('is-invalid');
        setInvalidmsg('Password did not matching!')
    }else{
        setIsinvalid('');
        setInvalidmsg('');
    }
  };

  function closeAlert(){
    if(regStatus){
      setAlertStatus(false);
      navigate("/login");
    }else{
      setAlertStatus(false);
    }
    
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '90vh' }}>
      <div className="col-md-6">
        <div className="card px-5 shadow-lg border-0">
          <div className="card-body px-5">
            <div className="text-center mb-4">
            <img alt="COOK" src={mainLogo} className="img-fluid" style={{ width: '150px' }} />
            </div>
            <h3 className="card-title text-center mb-4">Register</h3>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstname" className="form-label">First name</label>
                  <input type="text" className="form-control" id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastname" className="form-label">Last name</label>
                  <input type="text" className="form-control" id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="phonenumber" className="form-label">Phone number</label>
                <input type="text" className="form-control" id="phonenumber" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="repassword" className="form-label">Confirm Password</label>
                <input type="password" className={`form-control ${isinvalid}`} id="repassword" value={repass} onChange={(e) => checkPass(e.target.value)} />
                <div className="text-danger">{invalidmsg}</div>
              </div>
              <div className="row my-2">
                <div className='col-md-5'>
                <button type="submit" className="btn btn-danger w-100 fw-semibold">Create Account</button>
                </div>
                <div className="text-center mt-1 col">
                <p>Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
              </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ReactJsAlert
        status={alertStatus} 
        type={type}
        title={title}
        Close={() => closeAlert()}
      />
    </div>
  );
}

export default Register;
