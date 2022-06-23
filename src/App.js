import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import './css/App.css';
import { auth} from "./firebase-config";

function App() {
  const navigation = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) return navigation("/home");
      else return navigation("/login");
    })
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;