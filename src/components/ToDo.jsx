import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCalendarCheck } from "react-icons/fa";
import { logout } from "../redux/authSlice";
import { fetchWeather } from "../redux/weatherSlice"; // Import weather action
import { addTodo, setFilter, setSort, selectFilteredSortedTodos } from "../redux/todoSlice";
import ToDolist from "./ToDolist";

const ToDo = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredSortedTodos); // Removed pagination selector
  const { filter, sort } = useSelector((state) => state.todo);
  const { temp, city, icon, status } = useSelector((state) => state.weather); // Get weather data
  const [priority, setPriority] = useState("Low");
  const inputRef = useRef();

  // Fetch weather when component mounts
  useEffect(() => {
    dispatch(fetchWeather());
  }, [dispatch]);

  const add = () => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) return;

    const newToDo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
      priority: priority,
    };

    dispatch(addTodo(newToDo));
    inputRef.current.value = "";
  };

  return (
    <div className="bg-white place-self-center w-10/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      {/* Header with Weather & Logout */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaCalendarCheck size={32} />
          <h1 className="text-3xl font-bold text-neutral-800">To Do List</h1>
        </div>

        {/* Weather Section */}
        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <p className="text-gray-500 text-sm">Fetching weather...</p>
          ) : status === "failed" ? (
            <p className="text-red-500 text-sm">Weather Unavailable</p>
          ) : (
            <>
              <img src={icon} alt="weather" className="w-8 h-8" />
              <p className="text-gray-700">{city} {temp}°C</p>
            </>
          )}
        </div>

        <button onClick={() => dispatch(logout())} className="text-red-500 font-semibold cursor-pointer">
          Logout
        </button>
      </div>

    {/* Input */}
<div className="flex flex-wrap items-center bg-neutral-100 rounded-full mt-10 w-full">
  <input
    type="text"
    placeholder="Add your task"
    className="bg-transparent border-0 outline-none flex-1 h-14 pl-4 placeholder:text-neutral-600 min-w-0"
    ref={inputRef}
  />
  <select
    className="bg-neutral-800 text-white h-14 px-4 text-lg font-semibold cursor-pointer flex-shrink-0 max-w-xs"
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
  <button
    className="bg-neutral-800 text-white h-14 px-4 rounded-r-full text-lg font-semibold cursor-pointer flex-shrink-0 max-w-xs"
    onClick={add}
  >
    Add +
  </button>
</div>


      {/* Filters and Sorting */}
      <div className="flex justify-between my-3">
        <select
          className="border bg-neutral-900 text-white w-20 rounded-2xl p-2 ml-2"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>

        <select
          className="border bg-neutral-900 text-white w-24 rounded-2xl p-2 mr-2"
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="Priority">Priority</option>
        </select>
      </div>

      {/* To-Do List */}
      {todos.map((todo) => (
        <ToDolist key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default ToDo;
