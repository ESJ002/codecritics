import Home from "./Views/Home/Home";
import Login from "./Views/Login/Login";
import "./App.css";
import { useState } from "react";
import { getUserFromLocalStorage } from "./utils/auth_service";
import Reviews from "./Views/Your Reviews/Reviews";

function App() {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [currentPage, setCurrentPage] = useState('home')
    const [colour, setColour] = useState('green')

    function onLogin(user) {
        setUser(user);
    }

    function onLogout(user) {
      setUser(null);
      localStorage.removeItem('token')
  }

    return <> {user ? 
    
    <Home onLogout={onLogout} user={user} setCurrentPage={setCurrentPage} colour={colour} setColour={setColour}/> : <Login onLogin={onLogin} />} </>;
}

export default App;