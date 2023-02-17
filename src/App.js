import { database } from "./database/tasks";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import Login from "./components/Login";
import { authenticateUser } from "./database/users";
import pen from './pen.png'

function TaskDetail({task}) {
  return (
    <div className="border-2 border-slate-300">
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
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [taskDialogueVisibility, settaskDialogueVisibility] = useState(false);
  const taskTitleRef = useRef(null);

  useEffect(() => {
    if(taskTitleRef.current!==null) {
      console.log(taskTitleRef.current)
      console.log("inside effect")
      taskTitleRef.current.focus();
    }
  }, [taskDialogueVisibility])

  function handleAuthentication(authenticationStatus) {
    setLoginSuccess(authenticationStatus);
  }

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
    settaskDialogueVisibility(false);
  }

  function handleFormSubmit(event){
    event.preventDefault();
    createTask(taskTitle, taskDescription)
    clearForm();
  }

  function openTaskDialogue() {
    if(taskDialogueVisibility === false) {
      settaskDialogueVisibility(true);
     
    }
  }

  return (
    <div className="min-h-full relative lg:ml-32 lg:mr-32  lg:bg-red-400">
      {loginSuccess ? 
        (
          <div className="p-2">
            {!taskDialogueVisibility && (
              <div className="flex flex-row justify-end pointer m-4">
                <img src={pen} onClick={() => openTaskDialogue()} className="w-8 cursor-pointer" title="Write a new task"/>
              </div>
            )}
            {taskDialogueVisibility && (
              <form className="transition duration-150 ease-linear flex flex-col mb-6" onSubmit={handleFormSubmit}>
              <span className="text-sm font-medium text-slate-700">Task Title</span>
              <input ref={taskTitleRef} className="border-2 mb-2 p-2 focus:outline-none" required value={taskTitle} onChange={(event) => setTaskTitle(event.target.value)} type="text" title="Task Name"/>
              <span className="text-sm font-medium text-slate-700">Task Description</span>
              <textarea className="border-2 mb-4 p-2 focus:outline-none" required value={taskDescription} onChange={(event) => setTaskDescription(event.target.value)} rows="12" cols="25" />
              <button className="border-2 w-fit p-2.5 ">Create Task</button>
            </form>
            )}
            <section className="mb-8">
              {database.length===0 && <h3 className="text-lg">No Pending Tasks</h3>}
              {database.length>0 && (
                <>
                  <p className="mb-4">Tasks To Do</p>
                  <div className="overflow-auto overflow-x-hidden border-2 ">
                    
                    {
                      database.map(task => {
                        return <TaskDetail key={task.id} task={task}/>
                      })
                    }
                  </div>
                </>
                
              )}
            </section>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <Login userAuthentication={authenticateUser} userAuthenticationSuccess={handleAuthentication}/>
          </div>
        )
      }
      
      
    </div>
  );
}


export default App;
