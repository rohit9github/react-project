import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {

    let [userData, setUserData] = useState({})
    let [error, setError] = useState({})

    let decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    
    
    let getInputValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUserData({ ...userData, [name]: value })
        if (name === "username") {
            if (value === "") {
                setError({ ...error, nameError: "Username id Required" });
            }
            else if(value.length <2){
                setError({...error,nameError :"Username is too Short "})
            }
            else{
                setError({...error,nameError:""})
            }
        }
        else if (name === "email") {
            if (value === "") {
                setError({...error,emailError:"Email id Required"});
            }
            else if(!value.match(mailformat)){
                setError({...error,emailError:"Please Enter Valid Email"})
            }
            else{
                setError({...error,emailError:""})
            }
        }
        else if (name === "pass") {
            if (value === "") {
                setError({...error,passwordError:"Password id Required"});
            }
            else if(!value.match(decimal)){
                setError({...error ,passwordError :"8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"})
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
        else if(userData.username.length<2){
            setError({...error,nameError:"Username is too Short"})
        }
        else if (userData.email === undefined) {
            setError({...error,emailError:"Email id Required"});
        }
        else if(!userData.email.match(mailformat)){
            setError({...error,emailError:"Please Enter Valid Email"})
        }
        else if (userData.pass === undefined) {
            setError({...error,passwordError:"Password id Required"});
        }
        else if(!userData.pass.match(decimal)){
            setError({...error,passwordError:"8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"})
        }
        else {
            localStorage.setItem("Userdata", JSON.stringify(userData));
            setUserData({})
            setError({})
            toast.success("Sign-Up Successfully",{
                position: "top-center",
            })
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
                        <span className="text-red-600">{error.nameError ? error.nameError : ""}</span> <br />
                        <label className="mb-3 inline-block text-xl">Email :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="email" value={userData.email ? userData.email : ""} placeholder="Enter Your Email" onChange={(e) => getInputValue(e)} /><br /><br />
                        <span className="text-red-600">{error.emailError? error.emailError : ""}</span> <br />
                        <label className="mb-3 inline-block text-xl">Password :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="pass" value={userData.pass ? userData.pass : ""} placeholder="Enter Your Password" onChange={(e) => getInputValue(e)} /><br /><br />
                        <span className="text-red-600">{error.passwordError? error.passwordError : ""}</span> <br />
                        <button type="submit" className="inline-block my-10 bg-blue-500 text-white rounded-md px-7 py-2 text-xl">Sign-Up</button>
                        <Link to="/login" className="inline-block my-5 ms-8 bg-blue-500 text-white rounded-md px-7 py-2 text-xl">Login</Link>
                    </form>
                </div>
            </div>

<ToastContainer/>

        </>
    )
}

export default Signup;