import { useState } from 'react';
import supabase from "./supabaseConfig";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = async () => {
    const newTodoData = {
      title: newTodo,
      IsCompleted:false
    };
    const { data, error } = await supabase.from('TodoList').insert([newTodoData]).single()
    if (error) {
      console.log('error in adding todo list');
      
    } else {
      setTodoList((prev)=>[...prev,data])
    }
    setNewTodo('');
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className='underline text-xl uppercase'>supabase</h1>
      <section className='mt-8'>
        <input type='text' className='rounded p-2 border-2' placeholder='Add new todo' />
        <button onClick={addTodo} className='py-2 px-4 text-white bg-blue-500'>
          Add Todo Item
        </button>
      </section>
    </div>
  );
}

export default App;
