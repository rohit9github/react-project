import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";


function AddTask() {

    let [addTask, setAddTask] = useState({})
    let [dd, setDd] = useState([]);
    let [id, setId] = useState(0);
    let [error, setError] = useState({})

    let isAuth = () => {
        let user = localStorage.getItem("Userdata")
        return user !== null;
    }

    let navigate = useNavigate()

    let getValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setAddTask({ ...addTask, [name]: value })
        if (name === "task") {
            if (value === "") {
                setError({ ...error, taskError: "Please Add Your Task" });
            }
            else {
                setError({ ...error, taskError: "" });
            }
        }
        else if (name === "category") {
            if (value === "") {
                setError({ ...error, categoryError: "Please Select Your Task Category" });
            }
            else {
                setError({ ...error, categoryError: "" });
            }
        }
    }

    let submitTask = async (e) => {
        e.preventDefault();
        if (addTask.task === undefined) {
            setError({ ...error, taskError: "Please Add Your Task" });
        }
        else if (addTask.category === undefined) {
            setError({ ...error, categoryError: "Please Select Your Task Category" });
        }
        else {
            if (id === 0) {
                if (await isAuth()) {
                    axios.post("http://localhost:3000/tasks", addTask)
                        .then(() => {
                            setAddTask({})
                            getTask();
                            toast.success("Task Is Added")
                            setError({})
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
            else {
                axios.put(`http://localhost:3000/tasks/${id}`, addTask)
                    .then(() => {
                        toast.success("Task Is Updated")
                        setAddTask({})
                        getTask();
                        setId(0);
                        setError({});
                    })
            }
        }
    }

    let getTask = () => {
        axios.get("http://localhost:3000/tasks")
            .then((res) => {
                const tasks = res.data.filter(task => !task.completed);

                const groupedTasks = tasks.reduce((acc, task) => {
                    let { category } = task;
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(task);

                    return acc;
                }, {});
                setDd(groupedTasks);
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
        Personal: "#FF8A08",
        Office: "#1679AB",
        Family: "#FFA62F",
        Friends: "#FF0000",
        Other: "#97BE5A"
    };

    const handleCheckboxChange = (task) => {
        const updatedTask = { ...task, completed: !task.completed };
        axios.put(`http://localhost:3000/tasks/${task.id}`, updatedTask)
            .then(() => {
                getTask();
                toast.success("Task Is Completed", {
                    position: "top-center"
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };

    let deleteTask = (id) => {
        axios.delete(`http://localhost:3000/tasks/${id}`)
            .then(() => {
                toast.success("Task Is Deleted");
                return getTask();
            })
    }

    let updateTask = (task) => {
        setAddTask(task)
        setId(task.id)
    }


    return (
        <>
            <div className="flex justify-center mt-10">
                <div className="px-10 rounded-2xl shadow-gray-300 shadow-xl">
                    <form onSubmit={(e) => submitTask(e)}>
                        <label className="mb-3 inline-block text-xl">Enter Your Task :- </label>
                        <input className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" type="text" name="task" value={addTask.task ? addTask.task : ""} placeholder="Enter Your Task" onChange={(e) => getValue(e)} /> <br /><br />
                        <span className="text-red-600">{error.taskError ? error.taskError : ""}</span><br />
                        <label className="mb-3 inline-block text-xl">Select Category :- </label>
                        <select className="border-2 w-full pe-28 ps-3 py-2 rounded-md outline-none border-slate-600" name="category" value={addTask.category ? addTask.category : ""} onChange={(e) => getValue(e)}>
                            <option value="">selecet</option>
                            <option value="Personal">Personal</option>
                            <option value="Office">Office</option>
                            <option value="Family">Family</option>
                            <option value="Friends">Friends</option>
                            <option value="Other">Other</option>
                        </select> <br /><br />
                        <span className="text-red-600">{error.categoryError ? error.categoryError : ""} </span><br />
                        <button type="submit" className="inline-block my-10 bg-blue-500 text-white rounded-md px-7 py-2 text-xl">{id === 0 ? "Add task" : "Update Task"}</button>
                    </form>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-7">
                {Object.keys(dd).map((category) => (
                    <div key={category} className="flex justify-center mt-12 flex-col">
                        {dd[category].map((task, index) => (
                            <div key={index} className="m-2 text-center rounded-xl px-5 py-3 text-white flex items-center justify-between" style={{ backgroundColor: task.completed ? "green" : categoryColors[category] }}>
                                <div className="">
                                    <h2 className="text-xl font-normal text-start">Category :- {category}</h2>
                                    <h3 className="text-2xl font-semibold text-start">Task: {task.task}</h3>
                                </div>
                                <div className="flex">
                                    <input type="checkbox" className="me-3 border-none w-5" checked={task.completed || false} onChange={() => handleCheckboxChange(task)} /> <br />
                                    <button type="button" onClick={() => deleteTask(task.id)} className="text-3xl me-3 " ><RiDeleteBin6Line /></button> <br />
                                    <button type="button" onClick={() => updateTask(task)} className="text-3xl me-3 "><BiEdit /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <ToastContainer />
        </>
    )
}
export default AddTask;