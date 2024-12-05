import { useState } from 'react'


function App() {

const[todoList,setTodoList] =useState([])
  const [newTodo, setNewTodo] = useState('')
  
  return (
    
      <div>
      <h1 className="underline text-xl uppercase">supabase</h1>
      <section className="mt-8">
        <input type="text" className="rounded p-2" placeholder="Add new todo" />
        <button className="py-2 px-4 text-white bg-blue-500">Add Todo Item</button>
      </section>
    </div>
  )
}

export default App
