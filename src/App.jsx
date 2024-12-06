import { useState,useEffect } from 'react';
import supabase from './supabaseConfig';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => { 
    const { data, error } = await supabase.from('TodoList').select('*');
    if (error) {
      console.log('error in fetching todo list', error);
    } else {
      setTodoList(data);
    }
  }

  const addTodo = async () => {
    const newTodoData = {
      title: newTodo,
      is_completed: false,
    };
    const { data, error } = await supabase
      .from('TodoList')
      .insert([newTodoData])
      .single();
    if (error) {
      console.log('error in adding todo list', error);
    } else {
      setTodoList((prev) => [...prev, data]);
      setNewTodo('');
    }
  };

  const completeTodoTask = async (id,is_completed) => {
    const { data, error } = await supabase.from('TodoList').update({ is_completed: !is_completed }).eq('id', id)
    
    if (error) {
      console.log('error in adding todo list', error);
    } else {
      const updatedTodo = todoList.map((todo) =>
      todo.id===id?{...todo,is_completed:!is_completed}:todo
      )

      setTodoList(updatedTodo)
    }
  }

  return (
    <div className='flex flex-col items-center gap-6 mt-20'>
      <h1 className='underline text-xl uppercase'>supabase</h1>
      <section className='mt-8'>
        <input
          type='text'
          className='rounded p-2 border-2'
          placeholder='Add new todo'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo} className='py-2 px-4 text-white bg-blue-500'>
          Add Todo Item
        </button>
       
      </section>
      <ul className="flex flex-col gap-3 mt-6 items-start">
        {todoList.map((todo) => (
          <li key={todo.id} className="grid grid-cols-4">
            <p className="">{todo.id}</p>
            <p className="mr-4"> {todo.title}</p>
            <button onClick={()=>completeTodoTask(todo.id,todo.is_completed)} className='py-2 px-4 text-white bg-green-500 rounded mr-2'>
              {todo.is_completed?'undo':"completed"}
            </button>
            <button className='py-2 px-4 text-white bg-red-500 rounded' > Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
