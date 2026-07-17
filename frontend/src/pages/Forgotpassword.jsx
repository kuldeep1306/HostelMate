// ForgotPassword removed — no email service without Firebase
// Redirects to login
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  useEffect(() => { navigate('/login'); }, [navigate]);
  return null;
};

export default ForgotPassword;
