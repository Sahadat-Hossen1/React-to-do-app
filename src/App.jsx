import React, { useEffect, useState } from "react";

const App = () => {
  //for all task
  const [Tasks, setTasks] = useState(() => {
    //load the save task
    return JSON.parse(localStorage.getItem("Tasks")) || [];
  });
  const [empty, setEmpty] = useState(false);
  //to get the task from input fild
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const getTask = form.todo.value.trim();
    if (getTask === ""){
      setEmpty(true);
       return
      }
    const newTask = {
      TaskItem: getTask,
      checked: false,
      id: new Date(),
    };
    setTasks([...Tasks, newTask]);
    setEmpty(false);
    form.todo.value=''
    console.log(newTask);
  };
  //for save task when new task add and edit and delete
  useEffect(()=>{
    localStorage.setItem("Tasks",JSON.stringify(Tasks))
  },[Tasks])
  
  


  return (
    <div className="max-w-[600px] mx-auto mt-4 px-2 rounded-2xl">
      {/* for title and form section */}
      <div className=" bg-amber-400 rounded-4xl py-2 ">
        <h1 className="text-center py-4 text-3xl">ToDo-List</h1>
        <form
          onSubmit={handleSubmit}
          className="border rounded-3xl mb-3 flex justify-between  w-[80%] mx-auto "
        >
          <input
            type="text"
            placeholder="add todo"
            name="todo"
            className="focus:outline-none focus:rounded-3xl pl-2 w-3/5"
          />
          <button type="submit" className=" btn hover:btn-primary  rounded-3xl py-3 w-2/5">
            add job
          </button>
        </form>
        {
           empty ? <h1 className="text-center text-xl text-red-700">write something in the input</h1>:""
        }
      </div>

    </div>
  );
};
export default App;
