import React, { useState } from 'react';
import './Login.css';
import GoogleLogo from './google-g.png';
import useGoogleAuth from './useGoogleAuth';

const Login = (props) => {
  const { setUser } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const googleAuth = useGoogleAuth();

  const handleAuthorizeClient = async () => {
    // Show consent screen and get googleUser if successful
    const googleUser = await googleAuth.signIn();

    // Pull access_token and scope from googleUser
    const authResponse = googleUser.getAuthResponse(true);

    // Send access token and scope to backend for processing
    const res = await fetch(`/auth/google?access_token=${authResponse.access_token}&scope=${authResponse.scope}`, {
      method: 'POST',
    });

    // Set user if we successfully logged in
    if (res.user) setUser(res.user);
  }

  return (
    <div>
      <div className="input-container">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Enter email..."
        />
      </div>

      <div className="input-container">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Enter password..."
          type="password"
        />
      </div>
      
      <button>
        Sign in
      </button>

      <div className="divider">
        <div />
        <span className="text">Or</span>
        <div />
      </div>

      <button className="google" onClick={handleAuthorizeClient}>
        <img src={GoogleLogo} />
        Sign in with Google
      </button>
    </div>
  )
}

export default Login;
