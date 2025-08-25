import React, { useEffect, useState } from "react";

const App = () => {
  //for all task
  const [Tasks, setTasks] = useState(() => {
    //load the save task
    const raw = localStorage.getItem("Tasks");
    if (!raw) return [];
    const save = JSON.parse(raw);
    try {
      return Array.isArray(save) ? save : [];
    } catch (error) {
      console.log(`error message is : ${error}`);
      return [];
    }
  });
  const [empty, setEmpty] = useState(false);
  //to get the task from input fild
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const getTask = form.todo.value.trim();
    if (getTask === "") {
      setEmpty(true);
      return;
    }
    const newTask = {
      TaskItem: getTask,
      checked: false,
      id: new Date(),
    };
    setTasks((prevTask) => {
      const tasksArray = Array.isArray(prevTask) ? prevTask : [];
      return [...tasksArray, newTask];
    });
    setEmpty(false);
    form.todo.value = "";
    console.log(newTask);
  };
  //for save task when new task add and edit and delete
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(Tasks));
  }, [Tasks]);

  //for checkbox and check length
  const [checkedLength, setCheckedLength] = useState(0);
  const handleChecked = (index) => {
    const check = Tasks.map((task, i) => {
      return i === index ? { ...task, checked: !task.checked } : task;
    });
    setTasks(check);
  };
  useEffect(() => {
    const tasksLength = Tasks.length;
    const checked = Tasks.filter((task) => task.checked === true).length;
    if (tasksLength > 0 && tasksLength === checked) {
      return alert("Good job man");
    }
    setCheckedLength(checked);
  }, [Tasks]);
  //for delete task
  const handleDelete = (index) => {
    const Delete = Tasks.filter((task, i) => i !== index);
    setTasks(Delete);
  };
  //for edit button
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(Tasks[index].TaskItem);
  };

 const handleSave=(index)=>{
    const updateTask=Tasks.map((task,i)=> i===index ? {...task,TaskItem:editText}:task)
    setTasks(updateTask);
    setEditIndex(null)
    setEditText('')
 }
 const handleCancel=()=>{
  setEditIndex(null)
  setEditText('')
 }

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
          <button
            type="submit"
            className=" btn hover:btn-primary  rounded-3xl py-3 w-2/5"
          >
            add job
          </button>
        </form>
        <div className="pl-8">
          <h1> total task:{Tasks.length} </h1>
          <h1>completed task:{checkedLength} </h1>
        </div>
        {empty ? (
          <h1 className="text-center text-xl text-red-700">
            write something in the input
          </h1>
        ) : (
          ""
        )}
      </div>
      {/*show the task item8*/}
      <div className="flex flex-col gap-3 my-8 max-w-[550px] w-full px-4">
        {Tasks?.map((task, i) => (
          <div
            key={i}
            className="card w-full bg-amber-300 mx-auto rounded-2xl shadow-md"
          >
            <div className="card-body flex flex-col md:flex-row md:flex-wrap items-center justify-between gap-3">
              <h1>Task added time: {task.id.toLocaleString()} </h1>
              {/* Left side (checkbox + text) */}
              <div className="flex flex-row items-center gap-2 w-full md:flex-1 min-w-0">
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => handleChecked(i)}
                />
                {
                  editIndex ===i ? (
                  <input
                  value={editText}
                  onChange={(e)=>setEditText(e.target.value)}
                  />

                  ):  (<h1 className="bg-amber-100 px-2 py-1 rounded-md break-words truncate w-full">
                  {task?.TaskItem}
                </h1>)
                }
              
              </div>

              {/* Right side (buttons) */}
              <div className="flex flex-row gap-2 w-full md:w-auto justify-end flex-shrink-0">
                {editIndex === i ? (
                  <div className="flex justify-between">
                    <button
                      className="btn btn-primary rounded-3xl"
                      onClick={() => handleSave(i)}
                    >
                      save
                    </button>
                    <button
                      className="btn btn-warning rounded-3xl "
                      onClick={handleCancel}
                    >
                      clancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary rounded-full px-4"
                    onClick={() => handleEdit(i)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="btn btn-error px-4"
                  onClick={() => handleDelete(i)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
