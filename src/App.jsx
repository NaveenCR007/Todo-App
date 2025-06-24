import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Tasks from './components/Tasks'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [showTask, setTask] = useState(false)
  const [todo, setTodo] = useState([])
  const [editItem, setEditItem] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load from localStorage
  useEffect(() => {
    const todosFromLS = localStorage.getItem("todos");
    console.log(todosFromLS);

    if (todosFromLS) {
      setTodo(JSON.parse(todosFromLS));
    }

    setIsLoading(false)
  }, []);


  // Save to localStorage on todo change
  useEffect(() => {
    if(!isLoading) { // only saves if the last todo is added to local storage properly
      localStorage.setItem("todos", JSON.stringify(todo));
    }
  }, [todo, isLoading]);


  const handleAdd = (newTodo) => {
    if (editItem) {
      const updatedTodos = todo.map(item =>
        item.id === editItem.id ? { ...item, todo: newTodo } : item
      );
      setTodo(updatedTodos);
      setEditItem(null);
    } else {
      setTodo([...todo, { id: uuidv4(), todo: newTodo }]);
    }
    setTask(false);
  };


  const handleDelete = (id) => {
    let newTodo = todo.filter(item => item.id !== id)
    setTodo(newTodo)
  }
  
  const handleEdit = (id) => {
    const taskToEdit = todo.find(item => item.id === id)
    setEditItem(taskToEdit)
    setTask(true)
  }

  const today = new Date();
  const formattedDate = `${today.toLocaleDateString('en-US', {
    weekday: 'long',
  })}, ${today.getDate()} ${today.toLocaleDateString('en-US', {
    month: 'long',
  })}`;

  return (
    <>
      <Navbar />
      <div className="tasks max-w-5xl h-130 my-3 rounded-2xl mx-auto shadow-2xl bg-white">
        <div className="top text-lg text-black flex justify-around font-medium items-center h-20 border-b-2 border-gray-500">
          <div className='cursor-pointer'>Messages</div>
          <div className='cursor-pointer'>Today's Task</div>
          <div className='cursor-pointer'>Completed Tasks</div>
        </div>

        <div className="main mt-5">
          <div className="addtask flex justify-between">
            <div className="date mx-6">
              <h1 className='font-bold text-3xl'>Today's Task</h1>
              <p className='font-medium text-gray-500 text-xl'>{formattedDate}</p>
            </div>
            <div onClick={() => { setTask(true); setEditItem(null); }} className="newtask text-center font-semibold text-xl pt-2.5 my-2 rounded-2xl mx-3 w-45 h-13 bg-blue-100 hover:bg-blue-200 transition-all text-blue-700 cursor-pointer">
              New Task
            </div>
          </div>
        </div>

        <div className="task-container h-96 overflow-y-auto">
          {todo.length === 0 && <div className="w-70 m-auto bg-[url('/images/sleep.webp')] h-70 bg-center bg-contain"></div>}

          {todo.map((item) => (
            <div key={item.id} className="real-task flex justify-between items-center my-2 rounded-lg shadow-2xl bg-blue-200 h-15 max-w-4xl m-auto">
              <div className="desc mx-10">{item.todo}</div>
              <div className="task-icons flex mx-10 gap-2">
                <div onClick={() => handleDelete(item.id)} className="done w-8 h-8 hover:bg-gray-200 rounded-full cursor-pointer">
                  <img className='w-6 h-6 mx-auto my-1' src="/images/wired-outline-37-approve-checked-simple-hover-wobble.gif" alt="" />
                </div>
                <div onClick={() => handleEdit(item.id)} className="edit w-8 h-8 hover:bg-gray-200 rounded-full cursor-pointer">
                  <img className='w-6 h-6 mx-auto my-1' src="/images/wired-outline-35-edit-hover-circle (1).gif" alt="" />
                </div>
                <div onClick={() => handleDelete(item.id)} className="delete w-8 h-8 hover:bg-gray-200 rounded-full cursor-pointer">
                  <img className='w-6 h-6 mx-auto my-1' src="/images/wired-outline-185-trash-bin-hover-empty.gif" alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {showTask && <Tasks onClose={() => setTask(false)} onAddTo={handleAdd} editItem={editItem} />}
      </div>
    </>
  )
}

export default App
