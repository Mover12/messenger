import React, { } from 'react'
import Messenger from "./Messenger";
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'

export default function HomePage(props) {

  return (
    <div>
      <Messenger/>
      <button className="buttonSignOut" onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  )
}
