import axios from "axios";
import { useEffect, useState } from "react";


function About() {

    let [completedTasks, setCompletedTasks] = useState([]);

    let getCompletedTasks = () => {
        axios.get("http://localhost:3000/tasks?completed=true")
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
            <div className="flex">
            {completedTasks.map((task, index) => (
                <div key={index} style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                    <div style={{
                        backgroundColor: "green",
                        width: "300px",
                        height: "150px",
                        margin: "10px",
                        color: "white",
                        textAlign: "center"
                    }}>
                        <h2>{task.category}</h2>
                        <h3>Task: {task.task}</h3>
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}

export default About;