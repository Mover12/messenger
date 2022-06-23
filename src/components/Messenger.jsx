import { addDoc, collection, onSnapshot, Timestamp } from 'firebase/firestore'
import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase-config'
import $ from "jquery"

export default function HomePage(props) {
  const [Input, setInput] = useState("");
  const [UsersData, setUsersData] = useState()

  useEffect(() => {
    const getData = async () => await onSnapshot(collection(db, "messages"), (doc) => {
        setUsersData(doc.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
        })).sort((a, b) => a.createdAtTime - b.createdAtTime))
    })
    getData()
  }, [])

  useEffect(() => {
    $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight }, 0)
  }, [UsersData])

  function Send() {
    if (Input !== "" && Input.length <= 500){
      addDoc(collection(db, "messages"), {
          createdAtTime: Timestamp.now(),
          message: Input,
          name: auth?.currentUser?.displayName,
          photo: auth?.currentUser?.photoURL,
          uid: auth?.currentUser?.uid
        } 
      );
      setInput("");
    }
  }

  return (
    <div className="messenger">
      <div className="messages">
        {UsersData?.map(userData =>
        <div className="message" key={userData.id}>
            <img className="photo" src={userData.photo} alt={userData.photo}/><br/>
            <div className="name">{userData.name}</div>
            <div className="messageText">{userData.message}</div>
        </div>)}
      </div><br/>
      <div className="send">
        <input className="messageInput" placeholder="Введите текст сообщения..." onKeyPress={e => {if(e.key === "Enter") Send()} } value={Input} onChange={event => setInput(event.target.value)} />
        <button className="sendButton" onClick={Send}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path d="M15.379,19.1403 L12.108,12.5993 L19.467,5.2413 L15.379,19.1403 Z M4.86,8.6213 L18.76,4.5343 L11.401,11.8923 L4.86,8.6213 Z M3.359,8.0213 C2.923,8.1493 2.87,8.7443 3.276,8.9483 L11.128,12.8733 L15.053,20.7243 C15.256,21.1303 15.852,21.0773 15.98,20.6413 L20.98,3.6413 C21.091,3.2623 20.739,2.9093 20.359,3.0213 L3.359,8.0213 Z"/>
            </svg>
        </button>
      </div>
    </div>
  )
}