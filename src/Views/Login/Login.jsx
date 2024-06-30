import { useState } from "react";
import * as AuthApi from "../../utils/auth_api.js";
export default function Login({ onLogin, colour }) {
    const [formData, setFormData] = useState({ email: "", password: "" });
    let incorrectMessage = ""
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            let token = await AuthApi.login(formData);
            localStorage.setItem("token", token);
            onLogin(formData);
        } catch(err) {
            console.log(err);
            incorrectMessage = "WRONG"
        }
    }

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <section className={`${colour} login`}>
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

                <button className={colour}>LOG IN</button>
            </form>
            <p>{incorrectMessage}</p>
        </section>
    );
}
