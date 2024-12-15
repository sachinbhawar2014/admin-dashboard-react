import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./login.module.css";
const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = btoa(`${username}:${password}`);
            const response = await axios.get("https://example.com/protected-route", {
                headers: {
                    Authorization: `Basic ${token}`,
                },
            });

            if (response.status === 200) {
                localStorage.setItem("authToken", token);
                toast.success("Login Successful!");
                navigate("/dashboard");
            }
        } catch (error) {
            toast.error("Invalid credentials!");
        }
    };

    return (
        <div className={styles.loginFormContainer}>
            <form className={styles.form} onSubmit={handleLogin}>
                <h1>Login</h1>
                <div>
                    <input
                        className={styles.inputBox}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="username"
                    />
                </div>
                <div>
                    <input
                        className={styles.inputBox}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        required
                    />
                </div>
                {/* <div>
                    <label>
                        <input type="checkbox"></input>
                        Remember Me
                    </label>
                </div> */}
                <button className={styles.loginBtn} type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
