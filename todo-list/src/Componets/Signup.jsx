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
        let finData = user.find((v)=>{
            return v.email === signUpdata.email && v.pass ===  signUpdata.pass;
            })
            if (finData) {
            alert("login Successfully")
            navigate("/")
        }
        else {
            alert("Invalid Details")
        }

    }


    let getData = () => {
        axios.get("http://localhost:3000/users")
            .then((res) => {
                setUser(res.data)
            })
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <h1>Sign-Up Form</h1>

            <form method="post" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="">Email :- </label>
                <input type="text" name="email" placeholder="Enter Your Email" onChange={(e) => handleValue(e)} /> <br /><br />
                <label htmlFor="">Password :- </label>
                <input type="text" name="pass" placeholder="Enter Your Password" onChange={(e) => handleValue(e)} /> <br /><br />
                <button type="submit">Sign-Up</button>
            </form>
        </>
    )
}

export default Signup;