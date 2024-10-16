import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBinLine } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null); // New state to track the item being edited
  const [showfinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const savetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = () => {
    setshowFinished(!showfinished)
  }

  const handleEdit = (id) => {
    let editingTodo = todos.find(item => item.id === id);
    setTodo(editingTodo.todo); // Set the text of the todo to the input field
    setEditingId(id); // Set the ID of the todo being edited
  };

  const handleDelete = (e, id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
    savetoLS();
  }

  const handleAdd = () => {
    if (editingId) {
      // If we're editing, update the existing todo
      const updatedTodos = todos.map(item =>
        item.id === editingId ? { ...item, todo } : item
      );
      setTodos(updatedTodos);
      setEditingId(null); // Clear the editing state after saving the changes
    } else {
      // If not editing, create a new todo
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo(""); // Clear the input field
    savetoLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    savetoLS();
  }


  return (
    <>
      <Navbar />
      <div className="container bg-lime-200 mx-auto max-w-screen-md my-5 p-5 rounded-xl min-h-[80vh]">
        <div className="addtodo">
          <h2 className='font-bold text-xl'>Add a ToDo</h2>
          <div>
            <input placeholder='Add a Task' onChange={handleChange} value={todo} className='w-3/4 py-1 px-3 rounded-lg' type='text' />
            <button onClick={handleAdd} disabled={todo.length < 4} className='bg-lime-600 text-white disabled:bg-lime-200 disabled:text-lime-200 hover:bg-lime-800 rounded-md m-4 px-2 py-0.5 font-bold'>Save</button>
          </div>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showfinished} /> Show Finished
        <h2 className='font-bold text-xl'>Your ToDos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-3'>No ToDos to Display</div>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className=' todo flex w-auto justify-between'>
              <div className='flex gap-5 py-2'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className='buttons flex h-full'>
                <button onClick={(e) => { handleEdit(item.id) }} className='bg-lime-600 text-white hover:bg-lime-800 rounded-md m-1 px-2 py-0.5 font-bold'><GrEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-lime-600 text-white hover:bg-lime-800 rounded-md m-1 px-2 py-0.5 font-bold'><RiDeleteBinLine /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
