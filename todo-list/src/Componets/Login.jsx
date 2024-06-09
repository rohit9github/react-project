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

            <div className="flex justify-center items-center h-screen">
                <div className="px-10 rounded-2xl shadow-gray-300 shadow-xl">
                    <form method="post" className="mt-6" onSubmit={(e) => handleSubmit(e)}>
                        <h1 className="text-center text-3xl mb-10">Login Form</h1>
                        <label className="mb-3 inline-block text-xl">UserName :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="username" value={userData.username ? userData.username : ""} placeholder="Enter Your Username" onChange={(e) => getInputValue(e)} /><br /><br />
                        <label className="mb-3 inline-block text-xl">Email :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="email" value={userData.email ? userData.email : ""} placeholder="Enter Your Email" onChange={(e) => getInputValue(e)} /><br /><br />
                        <label className="mb-3 inline-block text-xl">Password :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="pass" value={userData.pass ? userData.pass : ""} placeholder="Enter Your Password" onChange={(e) => getInputValue(e)} /><br /><br />
                        <button type="submit" className="inline-block my-10 bg-blue-500 text-white rounded-md px-7 py-2 text-xl">Login</button>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Login;