import { useState } from "react";
import * as AuthApi from "../../utils/auth_api.js";
import { Link } from "react-router-dom";


export default function Login({ onLogin, colour }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [incorrectMessage, setIncorrectMessage] = useState('')
    const [createNewUserForm, setCreateNewUserForm] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let token = await AuthApi.login(formData);
            localStorage.setItem("token", token);
            onLogin(formData);
        } catch(err) {
            console.log(err);
            setIncorrectMessage("Incorrect Email or Password")
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleCreateClick() {
        setCreateNewUserForm(true)
    }

    async function handleCreate(e) {
        e.preventDefault()
        try {
        let newUser = await AuthApi.create(formData)
            localStorage.setItem("token", newUser);
            onLogin(formData);
        } catch(err) {
            console.log(err);
            setIncorrectMessage("Incorrect Email or Password")
        }
    }

    return (
        <section className={`${colour} login`}>
            <img src="/src/assets/Logo/cc_logo.png" alt="" className="login-logo"/>
            { !createNewUserForm ? 

            <div>
            <h1>LOG IN</h1>
            <form onSubmit={handleSubmit}>
                <label className={colour}>EMAIL</label>
                <br />
                <input name="email" type="text" onChange={handleChange} className={colour}/>
                <br />
                <label>PASSWORD</label>
                <br />
                <input
                    name="password"
                    type="password"
                    onChange={handleChange}
                    className={colour}
                />
                <br />

                <button className={`${colour} ${colour}-button`}>LOG IN</button> <br />
                <button className={`${colour} ${colour}-button`} onClick={handleCreateClick}>NEW USER</button>
            </form>
            </div>
        
           : 
           <div>
           <h1>CREATE NEW USER</h1>
           <form onSubmit={handleCreate}>
               <label className={colour}>EMAIL</label>
               <br />
               <input name="email" type="text" onChange={handleChange} className={colour}/>
               <br />
               <label>PASSWORD</label>
               <br />
               <input
                   name="password"
                   type="text"
                   onChange={handleChange}
                   className={colour}
               />
               <br />

               <button className={`${colour} ${colour}-button`} onClick={handleCreateClick}>CREATE USER</button>
           </form>
           </div>
    }
        </section>
    );
}
