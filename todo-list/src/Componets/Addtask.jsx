import { useEffect, useState } from "react";
import axios from "axios"



function AddTask() {

    let [addTask, setAddTask] = useState({})
    let [data,setData] =  useState([]);

    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAddTask({ ...addTask, [name]: value })
    }

    let submitTask = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/tasks", addTask)
            .then(() => {
                alert("task Is Added")
                
                setAddTask({})
                getTask();
            })
            .catch(() => {
                alert("something is wrong");
            })
    }

    let getTask = ()=>{
        axios.get("http://localhost:3000/tasks")
           .then((res) => {
                console.log(res.data);
                setData(res.data)
            })
           .catch((err) => {
                console.log(err);
            })
    }

    useEffect(()=>{
        getTask();
    },[])

    return (
        <>
            <form onSubmit={(e) => submitTask(e)}>
                <label htmlFor="">Enter Your Task :- </label>
                <input type="text" name="task" value={addTask.task ? addTask.task : ""} placeholder="Enter Your Task" onChange={(e) => getValue(e)} /> <br /><br />
                <label htmlFor="">Select Category :- </label>
                <select name="category" value={addTask.category ? addTask.category : ""} id="" onChange={(e) => getValue(e)}>
                    <option value="">selecet</option>
                    <option value="Personal">Personal</option>
                    <option value="Office">Office</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                    <option value="Other">Other</option>
                </select> <br /><br />
                <button type="submit">Add Task</button>
            </form>

            {data.filter((a,b)=>{
                if(a.category === "Personal"){
                    return a
                }
            })
            .map((v,i)=>{
                return(
                    <>
                        <div>
                            <h2>Task :- {v.task}</h2>
                            <h2>Category :- {v.category}</h2>
                        </div>
                        <div></div>
                    </>
                )
            })}
        </>
    )
}
export default AddTask;