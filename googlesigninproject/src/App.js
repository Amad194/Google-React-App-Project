import "./App.css";
import React, { useEffect, useState } from 'react';
import { auth, provider, signInWithPopup, signOut } from './Firebase/firebase';

function App() {
  const [user, setUser] = useState(null);
  const [OTP, setOTP] = useState(null);
  const [expiresIn, setExpiresIn] = useState(30);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Clear previous timer
    if (timer) {
      clearInterval(timer);
    }

    if (OTP && expiresIn > 0) {
      const newTimer = setInterval(() => {
        setExpiresIn(prev => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(newTimer);
            setOTP(null);
            return 0;
          }
        });
      }, 1000);

      setTimer(newTimer);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [OTP]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
      setOTP(randomNumber);
      setExpiresIn(30); // Reset the expiration time whenever a new OTP is generated
    } catch (error) {
      alert("Error signing in with google");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setOTP(null); // Clear OTP on sign out
      setExpiresIn(30); // Reset the expiration time
      if (timer) {
        clearInterval(timer); // Clear the timer
      }
    } catch (error) {
      alert("Couldn't sign out");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <div>
            <p className='Header'>Welcome, {user.email}</p>
            {OTP && (
              <>
                <p>Your OTP is: {OTP}</p>
                <p>OTP expires in: {expiresIn} seconds</p>
              </>
            )}
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        ) : (
          <button onClick={handleSignIn}>Sign In with Google</button>
        )}
      </header>
    </div>
  );
}

export default App;
