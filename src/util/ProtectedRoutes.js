import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactJsAlert from 'reactjs-alert';

const ProtectedRoute = ({ element }) => {
  const token = sessionStorage.getItem('authToken');
  const navigate = useNavigate();

  const [status, setStatus] = useState(false);
  const [type, setType] = useState('error');
  const [title, setTitle] = useState('Please log in to access this page');

  useEffect(() => {
    if (!token) {
      setStatus(true);
      setType('error');
      setTitle('Please log in to access this page');
      setTimeout(() => {
        setStatus(false); 
        navigate('/login'); 
      }, 2500); 
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <ReactJsAlert
        status={status}
        type={type}
        title={title}
        Close={() => setStatus(false)}
      />
    );
  }

  return element;
};

export default ProtectedRoute;
