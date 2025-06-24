import React, { useState, useEffect } from 'react'

const Tasks = ({ onClose, onAddTo, editItem }) => {
    const [todo, setTodo] = useState("")

    useEffect(() => {
        if (editItem) {
            setTodo(editItem.todo)
        }
    }, [editItem])

    const handleAdd = () => {
        if (todo.trim() === "") return;
        onAddTo(todo)
        setTodo("")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className='w-full max-w-xl p-8 rounded-2xl bg-white shadow-2xl relative'>
                <div onClick={onClose} className="absolute top-2 right-5 cursor-pointer">
                    <img src="./tabler-x-icon.png" alt="Close" className="w-5 h-5" />
                </div>

                <div className='flex flex-col space-y-4 items-center'>
                    <input
                        className='border-2 rounded-lg w-full h-9 text-center'
                        type="text"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        placeholder='Add a new task'
                    />
                    <button onClick={handleAdd}
                        className='bg-blue-200 px-6 py-2 rounded-lg text-blue-700 font-semibold cursor-pointer'>
                        {editItem ? "Update Task" : "Save Task"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Tasks
