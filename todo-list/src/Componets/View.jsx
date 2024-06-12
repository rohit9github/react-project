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

    const categoryColors = {
        Personal: "orange",
        Office: "blue",
        Family: "skyblue",
        Friends: "purple",
        Other: "grey"
    };

    return (
        <>
            <h1>View</h1>
            <div className="flex justify-center">
                {completedTasks.map((v, index) => {
                    if (v.completed === true) {
                        return (
                            <div key={index} style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                                <div className="bg-green-500" style={{

                                    width: "300px",
                                    height: "150px",
                                    margin: "10px",
                                    color: "white",
                                    textAlign: "center"
                                }}>
                                    <h2>Category : {v.category}</h2>
                                    <h3>Task : {v.task}</h3>
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