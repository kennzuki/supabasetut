import { useState } from 'react';
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
      <ul className="flex gap-3">
        {todoList.map((todo) => (
          <li>
            <p> {todo.title}</p>
            <button className='py-2 px-4 text-white bg-green-500'>
              
            </button>
            <button className='py-2 px-4 text-white bg-red-500' > Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
