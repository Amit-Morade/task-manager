import { database } from "./database/tasks";
import "./App.css";
import { useState } from "react";

function TaskDetail({task}) {
  return (
    <div className="flex border-2 border-slate-300">
      {/* <div className="max-w-md p-2">
        <div className="font-semibold text-slate-900">{task.title}</div>
        <div className="">
          <p style={{overflow: 'hidden'}}>
            {task.description}
          </p>
        </div>
      </div> */}
      <div className="w-full p-2">
        <div className="font-semibold text-slate-900 border-b-2 pb-2">{task.title}</div>
        <p className="w-full mt-2 text-ellipsis overflow-hidden ...">{task.description}</p>
      </div>
      
    </div>
    
  )
}


function App() {

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  function clearForm(){
    setTaskTitle("");
    setTaskDescription("");
  }

  function createTask(title, description) {
    let taskId = database.length+1;
    database.push({
      id: taskId,
      title,
      description
    })

    console.log(database)
  }

  function handleFormSubmit(event){
    event.preventDefault();
    createTask(taskTitle, taskDescription)
    clearForm();
  }

  return (
    <div className="App w-screen">
      <div className="p-2">
        <form className="flex flex-col mb-6 md:w-1/2" onSubmit={handleFormSubmit}>
          <span >Task Title</span>
          <input className="border-2 mb-2 p-2" required value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} type="text" title="Task Name"/>
          <span>Task Description</span>
          <textarea className="border-2 mb-4 p-2" required value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} rows="12" cols="25" />
          <button className="border-2 w-fit p-2.5 ">Create Task</button>
        </form>
        <section className="md:w-1/2">
          <div>
            {
              database.map(task => {
                return <TaskDetail key={task.id} task={task}/>
              })
            }
          </div>
        </section>
      </div>
      
    </div>
  );
}

export default App;
