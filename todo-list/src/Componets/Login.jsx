import { useState } from "react";
import { useNavigate } from "react-router-dom";



function Login() {

    let [loginData, setLoginData] = useState({});
    let [error, setError] = useState({});
    let navigate = useNavigate();


    let handleValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLoginData({ ...loginData, [name]: value });
        if(name === "email"){
            if(value === ""){
                setError({...error,emailError:"Email is Required"});
            }
            else{
                setError({...error,emailError:""});
            }
        }
        else if(name === "pass"){
            if(value === ""){
                setError({...error,passError:"Password is Required"});
            }
            else{
                setError({...error,passError:""});
            }
        }
    }

    let handleSubmit = (e) => {
        e.preventDefault();

        let getUser = JSON.parse(localStorage.getItem("Userdata"));
        if (loginData.email === undefined){
            setError({...error,emailError:"Email is Required"});
        }
        
        else if(loginData.pass === undefined){
            setError({...error,passError:"Password is Required"});
        }
        else{
            if (getUser.email === loginData.email && getUser.pass === loginData.pass) {
                alert("login Successfully")
                navigate("/")
            }
            else {
                if(getUser.email !== loginData.email && getUser.pass !== loginData.pass){
                    alert("Please first Sign-up")
                }
                else if(getUser.email !== loginData.email){
                    setError({...error,emailError:"Email is Incorrect"});
                }
                else if(getUser.pass !== loginData.pass){
                    setError({...error,passError :"Password is Incorrect"})
                } 
            }
        }
    }

    return (
        <>

            <div className="flex justify-center items-center h-screen">
                <div className="px-10 rounded-2xl shadow-gray-300 shadow-xl">
                    <form method="post" onSubmit={(e) => handleSubmit(e)}>
                        <h1 className="text-center text-3xl mb-10">Login Form</h1>
                        <label className="mb-3 inline-block text-xl">Email :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="email" placeholder="Enter Your Email" onChange={(e) => handleValue(e)} /> <br /><br />
                        <span className="text-red-500">{error.emailError?error.emailError :""}</span><br />
                        <label className="mb-3 inline-block text-xl">Password :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="pass" placeholder="Enter Your Password" onChange={(e) => handleValue(e)} /> <br /><br />
                        <span className="text-red-500">{error.passError ? error.passError:""}</span><br />
                        <button type="submit" className="inline-block my-10 bg-blue-500 text-white rounded-md px-7 py-2 text-xl">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;