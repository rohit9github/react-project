import { useState } from "react";
import axios from "axios";


function Login() {

    let [userData, setUserData] = useState({})

    let getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserData({ ...userData, [name]: value })
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/users", userData)
            .then(() => {
                alert("data is added");
                setUserData({})
            })
            .catch(() => {
                console.log("error something is gone wrong");
            })
    }

    return (
        <>
            <h1>Login Form</h1>

            <form method="post" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="">UserName :- </label>
                <input type="text" name="username" value={userData.username?userData.username:""} placeholder="Enter Your Username" onChange={(e) => getInputValue(e)} /><br /><br />
                <label htmlFor="">Email :- </label>
                <input type="text" name="email" value={userData.email?userData.email:""} placeholder="Enter Your Email" onChange={(e) => getInputValue(e)} /><br /><br />
                <label htmlFor="">Password :- </label>
                <input type="text" name="pass" value={userData.pass?userData.pass:""} placeholder="Enter Your Password" onChange={(e) => getInputValue(e)} /><br /><br />
                <button type="submit">Login</button>
            </form>

        </>
    )
}

export default Login;