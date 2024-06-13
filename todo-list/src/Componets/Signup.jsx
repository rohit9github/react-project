import { useState } from "react";
import { Link } from "react-router-dom";


function Signup() {

    let [userData, setUserData] = useState({})
    let [error, setError] = useState({})

    let getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserData({ ...userData, [name]: value })
        if (name === "username") {
            if (value === "") {
                setError({ ...error, nameError: "Username id Required" });
            }
            else{
                setError({...error,nameError:""})
            }
        }
        else if (name === "email") {
            if (value === "") {
                setError({...error,emailError:"Email id Required"});
            }
            else{
                setError({...error,emailError:""})
            }
        }
        else if (name === "pass") {
            if (value === "") {
                setError({...error,passwordError:"Password id Required"});
            }
            else{
                setError({...error,passwordError:""})
            }
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        if (userData.username === undefined) {
            setError({ ...error, nameError: "Username id Required" });
        }
        else if (userData.email === undefined) {
            setError({...error,emailError:"Email id Required"});
        }
        else if (userData.pass === undefined) {
            setError({...error,passwordError:"Password id Required"});
        }
        else {
            localStorage.setItem("Userdata", JSON.stringify(userData));
            setUserData({})
            setError({})
        }


    }

    return (
        <>

            <div className="flex justify-center items-center h-screen">
                <div className="px-10 rounded-2xl shadow-gray-300 shadow-xl">
                    <form method="post" className="mt-6" onSubmit={(e) => handleSubmit(e)}>
                        <h1 className="text-center text-3xl mb-10">Sign-Up Form</h1>
                        <label className="mb-3 inline-block text-xl">UserName :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="username" value={userData.username ? userData.username : ""} placeholder="Enter Your Username" onChange={(e) => getInputValue(e)} /><br /><br />
                        <span className="text-red-500">{error.nameError ? error.nameError : ""}</span> <br />
                        <label className="mb-3 inline-block text-xl">Email :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="email" value={userData.email ? userData.email : ""} placeholder="Enter Your Email" onChange={(e) => getInputValue(e)} /><br /><br />
                        <span className="text-red-500">{error.emailError? error.emailError : ""}</span> <br />
                        <label className="mb-3 inline-block text-xl">Password :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="pass" value={userData.pass ? userData.pass : ""} placeholder="Enter Your Password" onChange={(e) => getInputValue(e)} /><br /><br />
                        <span className="text-red-500">{error.passwordError? error.passwordError : ""}</span> <br />
                        <button type="submit" className="inline-block my-10 bg-blue-500 text-white rounded-md px-7 py-2 text-xl">Sign-Up</button>
                        <Link to="/login" className="inline-block my-10 ms-8 bg-blue-500 text-white rounded-md px-7 py-2 text-xl">Login</Link>
                    </form>
                </div>
            </div>



        </>
    )
}

export default Signup;