import axios from "axios";
import { useEffect, useState } from "react";


function ViewCompletedTask() {

    let [completedTasks, setCompletedTasks] = useState([]);

    let getCompletedTasks = () => {
        axios.get(`http://localhost:3000/tasks?completed=true`)
            .then((res) => {
                setCompletedTasks(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getCompletedTasks();
    }, []);

    console.log(completedTasks);

    return (
        <>
            <h1 className="text-center text-5xl font-medium mt-8">Completed Task</h1>
            <div className="max-w-7xl mx-auto">
                {completedTasks.map((v, index) => {
                    if (v.completed === true) {
                        return (
                            <div key={index} style={{  marginTop: "50px" }}>
                                <div className="text-white text-center m-2 px-6 rounded-xl py-3" style={{backgroundColor:"#41B06E" }}>
                                    <h2 className="text-xl font-medium text-start">Category : {v.category}</h2>
                                    <h3 className="text-2xl font-semibold text-start">Task : {v.task}</h3>
                                </div>
                            </div>
                        )
                    }

                })}
            </div>
        </>
    )
}

export default ViewCompletedTask;