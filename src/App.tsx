import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [showFullTodoIndex, setShowFullTodoIndex] = useState<number | null>(
    null
  );

  const todoText = useRef<HTMLInputElement>(null);

  const backgroundVideo = "/background.mp4";

  const handleButtonClick = (url: string) => {
    window.location.href = url;
  };

  useEffect(() => {
    const existingTodo = localStorage.getItem("todo");
    setTodo(existingTodo ? JSON.parse(existingTodo) : []);
  }, []);

  function addTodo(event: React.FormEvent) {
    event.preventDefault();
    if (todoText.current?.value && todoText.current.value.trim() !== "") {
      setError("");

      const newTodo = [...todo, todoText.current.value];
      setTodo(newTodo);
      localStorage.setItem("todo", JSON.stringify(newTodo));
      todoText.current.value = "";
    } else {
      setError("Please enter a valid todo!");
    }
  }

  function deleteTodo(index: number, event: React.FormEvent) {
    event.preventDefault(); 

    const toBeDeletedTodo = [...todo];
    toBeDeletedTodo.splice(index, 1);
    setTodo(toBeDeletedTodo);
    localStorage.setItem("todo", JSON.stringify(toBeDeletedTodo));
    if (todoText.current?.value) todoText.current.value = "";
  }

  function editTodo(index: number, event: React.FormEvent) {
    event.preventDefault(); 
    const toBeEditedTodo = [...todo];
    if (todoText.current?.value && todoText.current.value.trim() !== "") {
      setError("");
      toBeEditedTodo[index] = todoText.current.value;
      setTodo(toBeEditedTodo);
      localStorage.setItem("todo", JSON.stringify(toBeEditedTodo));
      todoText.current.value = "";
    } else {
      setError("Please enter a valid todo!");
    }
  }

  function ShowTodo(index: number, event: React.FormEvent) {
    event.preventDefault(); 

    if (showFullTodoIndex === index) {
      setShowFullTodoIndex(null);
    } else {
      setShowFullTodoIndex(index);
    }
    //setShowFullTodoIndex(index === showFullTodoIndex ? null : index);
  }

  function Footer() {
    return (
<footer className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-sm text-center w-full flex justify-between items-center py-2 px-5">
<div className="flex justify-center items-center gap-5"><div className="social-button">
    <button className="relative w-12 h-12 rounded-full group" onClick={() => handleButtonClick('https://github.com/ezzoHamdan/')}>
      <div
        className="floater w-full h-full absolute top-0 left-0 bg-black rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
      ></div>
      <div
        className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-black rounded-full"
      >
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="group-hover:fill-[#171543] fill-white duration-300"
            d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.17 6.839 9.481.5.092.683-.217.683-.481 0-.237-.009-.866-.013-1.699-2.782.603-3.37-1.338-3.37-1.338-.454-1.15-1.11-1.458-1.11-1.458-.906-.619.069-.606.069-.606 1.002.071 1.527 1.03 1.527 1.03.89 1.529 2.34 1.087 2.911.831.091-.645.348-1.087.634-1.338-2.22-.252-4.555-1.11-4.555-4.94 0-1.09.39-1.986 1.028-2.682-.103-.252-.446-1.268.098-2.642 0 0 .837-.268 2.75 1.024a9.563 9.563 0 012.496-.335 9.58 9.58 0 012.496.335c1.913-1.292 2.75-1.024 2.75-1.024.544 1.374.202 2.39.1 2.642.64.696 1.027 1.592 1.027 2.682 0 3.839-2.338 4.685-4.567 4.933.358.309.678.916.678 1.847 0 1.334-.012 2.412-.012 2.74 0 .267.18.577.688.481A12.01 12.01 0 0022 12c0-5.523-4.477-10-10-10z"
            fill="#FFFFFF"
          ></path>
        </svg>
      </div>
    </button>
  </div></div>
<div className="flex justify-center items-center gap-5"><div className="social-button">
    <button className="relative w-12 h-12 rounded-full group" onClick={() => handleButtonClick('https://www.linkedin.com/in/ezzhamdan/')}>
      <div
        className="floater w-full h-full absolute top-0 left-0 bg-blue-500 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
      ></div>
      <div
        className="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-blue-500 rounded-full"
      >
        <svg
          height="24"
          width="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="group-hover:fill-[#171543] fill-white duration-300"
            d="M20,2H4C2.9,2,2,2.9,2,4v16c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V4C22,2.9,21.1,2,20,2z M8.5,19H6V10h2.5V19z M7.3,9 h-0.1C6.4,9,6,8.6,6,8.1V7.9c0-0.5,0.4-0.9,0.9-0.9h0.1C7.6,7,8,7.4,8,7.9v0.1C8,8.6,7.6,9,7.3,9z M19,19h-2.5v-4.9 c0-1.2-0.4-2-1.4-2c-0.8,0-1.3,0.6-1.5,1.2h-0.1V19H10V10h2.3v1.3h0C12.7,10.7,14,9.9,15.5,9.9c2.1,0,3.5,1.4,3.5,3.8V19z"
            fill="#FFFFFF"
          ></path>
        </svg>
      </div>
    </button>
  </div></div>


</footer>

    );
  }
  function BackgroundVideo() {
    return (
      <video
        className="absolute scale-[1.05] object-cover inset-0 w-full h-full blur-sm z-0"
        src={backgroundVideo}
        autoPlay
        loop
        muted
      />
    )
  }

  function DisplayTodo() {
    return (
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
                  onClick={(event) => ShowTodo(index, event)}
                >
                  {showFullTodoIndex === index ? "-" : "+"}
                </button>
              )}
              <button
                className="mr-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={(event) => editTodo(index, event)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={(event) => deleteTodo(index, event)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  function UserTodoSubmission() {

    return (
      <><form className="mt-4 flex" onSubmit={addTodo}>
        <input
          className="flex-grow mr-2 border border-gray-700 px-4 py-2 rounded"
          ref={todoText}
          placeholder="Add or Edit Todos!" />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Todo
        </button>
      </form><div className="m-auto pt-5 text-center text-red-500">
          {error && <p>{error}</p>}
        </div></>
    );

  }

  return (
    <>
    
      <div className="relative h-screen overflow-hidden">

        {BackgroundVideo()}

        <div className="flex justify-center items-center h-screen">
          <div className="mx-auto max-w-md p-6 bg-gray-800 rounded-lg text-justify shadow-lg relative">
            
            <DisplayTodo />

            <UserTodoSubmission />
            

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
