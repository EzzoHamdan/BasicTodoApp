import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [showFullTodoIndex, setShowFullTodoIndex] = useState<number | null>(null);

  const todoText = useRef<HTMLInputElement>(null);

  const backgroundVideo = "/background.mp4";

  useEffect(() => {
    const existingTodo = localStorage.getItem("todo");
    setTodo(existingTodo ? JSON.parse(existingTodo) : []);
  }, []);

  function addTodo(event: React.FormEvent) {
    event.preventDefault();
    if (todoText.current?.value && todoText.current.value.trim() !== "") {
      setError('');

      const newTodo = [...todo, todoText.current.value];
      setTodo(newTodo);
      localStorage.setItem("todo", JSON.stringify(newTodo));
      todoText.current.value = "";
    } else {
      setError('Please enter a valid todo!');
    }
  }

  function deleteTodo(index: number) {
    const toBeDeletedTodo = [...todo];
    toBeDeletedTodo.splice(index, 1);
    setTodo(toBeDeletedTodo);
    localStorage.setItem("todo", JSON.stringify(toBeDeletedTodo));
    if (todoText.current?.value) todoText.current.value = "";
  }

  function editTodo(index: number) {
    const toBeEditedTodo = [...todo];
    if (todoText.current?.value && todoText.current.value.trim() !== "") {
      setError('');
      toBeEditedTodo[index] = todoText.current.value;
      setTodo(toBeEditedTodo);
      localStorage.setItem("todo", JSON.stringify(toBeEditedTodo));
      todoText.current.value = "";
    } else {
      setError('Please enter a valid todo!');
    }
  }

  function ShowTodo(index: number) {
    if (showFullTodoIndex === index) {
      setShowFullTodoIndex(null);
    } else {
      setShowFullTodoIndex(index);
    }
    //setShowFullTodoIndex(index === showFullTodoIndex ? null : index);
  }

  function Header() {
    return (
      <div className="bg-gray-800 bg-opacity-50 text-white text-center p-4 absolute inset-x-0 top-0 z-10">
        <h6 className="text-sm ">
          I extend my heartfelt thoughts to everyone enduring hardships,
          especially to the communities in Palestine and Ukraine, and I stand in
          solidarity with their hope for peace and well-being. Your strength is
          admired.
        </h6>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="relative h-screen overflow-hidden">
        <video
          className="absolute scale-[1.05] object-cover inset-0 w-full h-full blur-sm z-0"
          src={backgroundVideo}
          autoPlay
          loop
          muted
        />

        <div className="flex justify-center items-center h-screen">
          <div className="mx-auto max-w-md p-6 bg-gray-800 rounded-lg text-justify shadow-lg relative">
            <ul className="space-y-2">
              {todo.map((todoItem, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2"
                >
                  <span className="text-white pr-3">
                    {showFullTodoIndex === index
                      ? todoItem
                      : todoItem.length > 25
                      ? todoItem.slice(0, 25) + "..."
                      : todoItem}
                  </span>
                  <div className="flex">
                  {todoItem.length > 25 && (
                      <button
                        className="mr-2 px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        onClick={() => ShowTodo(index)}
                      >
                        {showFullTodoIndex === index ? "-" : "+"}
                      </button>
                    )}
                    <button
                      className="mr-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      onClick={() => editTodo(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                    </button>

                  </div>
                </li>
              ))}
            </ul>

            <form className="mt-4 flex" onSubmit={addTodo}>
              <input
                className="flex-grow mr-2 border border-gray-700 px-4 py-2 rounded"
                ref={todoText}
                placeholder="Add or Edit Todos!"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Add Todo
              </button>
            </form>

            <div className="m-auto pt-5 text-center text-red-500">
              {error && <p>{error}</p>}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;