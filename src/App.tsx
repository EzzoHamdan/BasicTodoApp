import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [todo, setTodo] = useState<string[]>([]);

  const todoText = useRef<HTMLInputElement>(null);

  useEffect(() => {
    
    const existingTodo = localStorage.getItem('todo');
    setTodo(existingTodo ? JSON.parse(existingTodo) : []);

  }, []);

  function addTodo (event: React.FormEvent) {

    event.preventDefault();
    if (todoText.current?.value) {
      const newTodo = [...todo, todoText.current.value];
      setTodo(newTodo);
      localStorage.setItem('todo', JSON.stringify(newTodo));
      todoText.current.value = '';

  }
}

  function deleteTodo (index: number) {

    const toBeDeletedTodo = [...todo];
    toBeDeletedTodo.splice(index, 1);
    setTodo(toBeDeletedTodo);
    localStorage.setItem('todo', JSON.stringify(toBeDeletedTodo));
    if(todoText.current?.value) todoText.current.value = '';

  }

  function editTodo (index: number) {
  
      const toBeEditedTodo = [...todo];
      if(todoText.current?.value) {
        toBeEditedTodo[index] = todoText.current.value;
        setTodo(toBeEditedTodo);
        localStorage.setItem('todo', JSON.stringify(toBeEditedTodo));
        todoText.current.value = '';
      }
    }
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="mx-auto max-w-md p-4 bg-gray-800 rounded-lg shadow-lg">
        <ul className="space-y-2">
          {todo.map((todo, index) => (
            <li key={todo} className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2">
              <span className="text-white">{todo}</span>
              <div className="flex">
                <button className="mr-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => editTodo(index)}>Edit</button>
                <button className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700" onClick={() => deleteTodo(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        <form className="mt-4 flex" onSubmit={addTodo}>
          <input className="flex-grow mr-2 border border-gray-700 px-4 py-2 rounded" ref={todoText} placeholder="Add or Edit Todos!" />
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Add Todo</button>
        </form>
      </div>
    </div>
  );

}

export default App;
