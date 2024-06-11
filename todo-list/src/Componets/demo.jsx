import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function AddTask() {
    let [addTask, setAddTask] = useState({});
    let [incompleteTasks, setIncompleteTasks] = useState([]);
    let [completedTasks, setCompletedTasks] = useState([]);

    let isAuth = () => {
        return axios.get("http://localhost:3000/users")
            .then(response => response.data.length > 0)
            .catch(() => false);
    };

    let navigate = useNavigate();

    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAddTask({ ...addTask, [name]: value });
    };

    let submitTask = async (e) => {
        e.preventDefault();
        if (await isAuth()) {
            axios.post("http://localhost:3000/tasks", addTask)
                .then(() => {
                    alert("Task is Added");
                    setAddTask({});
                    getTask();
                })
                .catch(() => {
                    alert("Something is wrong");
                });
        } else {
            alert("Please first login or signup");
            navigate("/login");
        }
    };

    let getTask = () => {
        axios.get("http://localhost:3000/tasks")
            .then((res) => {
                const tasks = res.data;
                const incomplete = tasks.filter(task => !task.completed);
                const completed = tasks.filter(task => task.completed);
                setIncompleteTasks(incomplete);
                setCompletedTasks(completed);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getTask();
    }, []);

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
                        <select className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" name="category" value={addTask.category ? addTask.category : ""} onChange={(e) => getValue(e)}>
                            <option value="">Select</option>
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

            <Link to="/completed-tasks" className="inline-block my-10 bg-green-500 text-white rounded-md px-7 py-2 text-xl">View Completed Tasks</Link>

            {Object.keys(incompleteTasks).map((category) => (
                <div key={category} style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                    {incompleteTasks[category].map((task, index) => (
                        <div key={index} style={{
                            backgroundColor: categoryColors[category],
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
        </>
    );
}

export default AddTask;
