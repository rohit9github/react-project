import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";



function AddTask() {

    let [addTask, setAddTask] = useState({})
    let [data, setData] = useState([]);
    let [comTask, setComTask] = useState([])

    let isAuth = async () => {
        try {
            let response = await axios.get("http://localhost:3000/users");
            return response.data.length > 0;
        } catch {
            return false;
        }
    }

    let navigate = useNavigate()

    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAddTask({ ...addTask, [name]: value })
    }

    let submitTask = async (e) => {
        e.preventDefault();
        if (await isAuth()) {
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
                const tasks = res.data.filter(task => !task.completed);
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
        isAuth()
    }, [])

    const categoryColors = {
        Personal: "orange",
        Office: "blue",
        Family: "skyblue",
        Friends: "purple",
        Other: "grey"
    };

    const handleCheckboxChange = (task) => {
        const updatedTask = { ...task, completed: !task.completed };
        axios.put(`http://localhost:3000/tasks/${task.id}`, updatedTask)
            .then(() => {
                getTask();
            })
            .catch((err) => {
                console.log(err);
            });
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
                            backgroundColor: task.completed ? "green" : categoryColors[category],
                            width: "300px",
                            height: "150px",
                            margin: "10px",
                            color: "white",
                            textAlign: "center"
                        }}>
                            <h2>{category}</h2>
                            <h3>Task: {task.task}</h3>
                            <input
                                type="checkbox"
                                checked={task.completed || false}
                                onChange={() => handleCheckboxChange(task)}
                            />
                        </div>
                    ))}
                </div>
            ))}

            <h2 className="text-5xl text-center my-14">Completed Task</h2>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {comTask.map((v, i) => {
                    return (
                        <div key={i} style={{ backgroundColor: "green", width: "300px", height: "150px", margin: "10px", color: "white", textAlign: "center" }}>
                            <h2>{v.category}</h2>
                            <h3>Task: {v.task}</h3>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default AddTask;