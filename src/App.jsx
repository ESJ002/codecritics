import Home from "./Views/Home/Home";
import Login from "./Views/Login/Login";
import "./App.css";
import { useState } from "react";
import { getUserFromLocalStorage } from "./utils/auth_service";
import Header from "./components/Header/Header";
import Reviews from "./Views/Reviews/Reviews";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

function App() {
    const [user, setUser] = useState(getUserFromLocalStorage());
    const [colour, setColour] = useState('green')

    function onLogin(user) {
        setUser(getUserFromLocalStorage());
    }

    function onLogout(user) {
      setUser(null);
      localStorage.removeItem('token')
  }

    return <> {!user ? <Login onLogin={onLogin} colour={colour}/> :
  
    <Router>

    <Header colour={colour} onLogout={onLogout} user={user}/>
    <Routes>
    <Route path="/"
    element={ <Home user={user} colour={colour} setColour={setColour}/> }>
         </Route>
    <Route path={`/reviews/${user.id}`}
    element={<Reviews user={user} colour={colour} setColour={setColour}/> }>
         </Route>
    </Routes>
    
    
    </Router> } </>;
}

export default App;