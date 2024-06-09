import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";



function AddTask() {

    let [addTask, setAddTask] = useState({})
    let [data, setData] = useState([]);
    let isAuth = () => {
        return axios.get("http://localhost:3000/users", {
            users: []
        })
    }

    let navigate = useNavigate()

    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAddTask({ ...addTask, [name]: value })
    }

    let submitTask = (e) => {
        e.preventDefault();
        if (isAuth() === true) {

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
        else {
            alert("please fisrt login or signup")
            navigate("/login")
        }

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
            <div className="flex justify-center mt-10">
            <div className="px-10 rounded-2xl shadow-gray-300 shadow-xl">
                <form onSubmit={(e) => submitTask(e)}>
                    <label className="mb-3 inline-block text-xl">Enter Your Task :- </label>
                    <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="task" value={addTask.task ? addTask.task : ""} placeholder="Enter Your Task" onChange={(e) => getValue(e)} /> <br /><br />
                    <label className="mb-3 inline-block text-xl">Select Category :- </label>
                    <select className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" name="category" value={addTask.category ? addTask.category : ""} id="" onChange={(e) => getValue(e)}>
                        <option value="">selecet</option>
                        <option value="Personal">Personal</option>
                        <option value="Office">Office</option>
                        <option value="Family">Family</option>
                        <option value="Friends">Friends</option>
                        <option value="Other">Other</option>
                    </select> <br /><br />
                    <button type="submit" className="inline-block my-10 bg-blue-500 text-white rounded-md px-7 py-2 text-xl">Add Task</button>
                </form>
            </div>
            </div>

            {Object.keys(data).map((category) => (
                <div key={category} style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                    {data[category].map((task, index) => (



                        <div key={index} style={{
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