import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Signup() {

    let [signUpdata, setSignUpdata] = useState({});
    let [user, setUser] = useState([])
    let navigate = useNavigate()

    let handleValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSignUpdata({ ...signUpdata, [name]: value });
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        
        let getUser =JSON.parse( localStorage.getItem("Userdata"));
        if (getUser.email === signUpdata.email && getUser.email === signUpdata.email) {
            alert("login Successfully")
            navigate("/")
        }
        else {
            alert("Invalid Details")
        }

    }

    return (
        <>

            <div className="flex justify-center items-center h-screen">
                <div className="px-10 rounded-2xl shadow-gray-300 shadow-xl">
                    <form method="post" onSubmit={(e) => handleSubmit(e)}>
                        <h1 className="text-center text-3xl mb-10">Sign-Up Form</h1>
                        <label className="mb-3 inline-block text-xl">Email :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="email" placeholder="Enter Your Email" onChange={(e) => handleValue(e)} /> <br /><br />
                        <label className="mb-3 inline-block text-xl">Password :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="pass" placeholder="Enter Your Password" onChange={(e) => handleValue(e)} /> <br /><br />
                        <button type="submit" className="inline-block my-10 bg-blue-500 text-white rounded-md px-7 py-2 text-xl">Sign-Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;