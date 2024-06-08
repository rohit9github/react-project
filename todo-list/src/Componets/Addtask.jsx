import { useEffect, useState } from "react";
import axios from "axios"



function AddTask() {

    let [addTask, setAddTask] = useState({})
    let [data, setData] = useState([]);

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

    let getTask = () => {
        axios.get("http://localhost:3000/tasks")
            .then((res) => {
                const tasks = res.data;
                const groupedTasks = tasks.reduce((acc, task) => {
                    const { category } = task;
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(task);
                    return acc;
                }, {});
                setData(groupedTasks);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getTask();
    }, [])

    const categoryColors = {
        Personal: "orange",
        Office: "blue",
        Family: "green",
        Friends: "purple",
        Other: "grey"
    };

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

            {Object.keys(data).map((category) => (
                <div key={category} style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                    {data[category].map((task, index) => (

                       
                           
                                <div key={index}  style={{
                                    backgroundColor: categoryColors[category],
                                    width: "300px",
                                    height: "150px",
                                    margin: "10px",
                                    color: "white",
                                }}>
                                    <h2>{category}</h2>
                                    <h3>Task: {task.task}</h3>
                                </div>
                            
                       




                    ))}
                </div>
            ))}
        </>
    )
}
export default AddTask;