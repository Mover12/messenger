import React from 'react'
import { signInWithPopup} from "firebase/auth";
import { auth, provider } from '../firebase-config';

export default function LoginPage() {
  function SignIn() {
    signInWithPopup(auth, provider);
  }

  return (
    <div>
      <h1>Hello! Let's log in!</h1>
      <button className="buttonSignIn" onClick={SignIn}>Google Log In</button>
    </div>
  )
}
