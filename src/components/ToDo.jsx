import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaCalendarCheck } from "react-icons/fa";
import { logout } from "../redux/authSlice";
import { fetchWeather } from "../redux/weatherSlice";
import { addTodo, setFilter, setSort, selectFilteredSortedTodos } from "../redux/todoSlice";
import ToDolist from "./ToDolist";

const ToDo = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredSortedTodos);
  const { filter, sort } = useSelector((state) => state.todo);
  const { temp, city, icon, status } = useSelector((state) => state.weather);
  const [priority, setPriority] = useState("Low");
  const inputRef = useRef();

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
    <div className="bg-white w-full max-w-md mx-auto flex flex-col p-5 min-h-[550px] rounded-xl shadow-md ">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FaCalendarCheck size={28} />
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800">To Do</h1>
        </div>

        {/* Weather Section */}
        <div className="flex items-center gap-2 text-sm">
          {status === "loading" ? (
            <p className="text-gray-500">Fetching weather...</p>
          ) : status === "failed" ? (
            <p className="text-red-500">Weather Unavailable</p>
          ) : (
            <>
              <img src={icon} alt="weather" className="w-6 h-6 sm:w-8 sm:h-8" />
              <p className="text-gray-700">{city} {temp}°C</p>
            </>
          )}
        </div>

        <button onClick={() => dispatch(logout())} className="text-red-500 font-semibold text-sm sm:text-base">
          Logout
        </button>
      </div>

      {/* Input Section */}
      <div className="flex flex-wrap items-center bg-neutral-100 rounded-full mt-6 w-full">
        <input
          type="text"
          placeholder="Add your task"
          className="bg-transparent border-0 outline-none flex-1 h-10 pl-3 placeholder:text-neutral-600 min-w-0 text-sm"
          ref={inputRef}
        />
        <select
          className="bg-neutral-800 text-white h-10 w-20 text-xs sm:text-sm font-semibold cursor-pointer flex-shrink-0 rounded-l-md"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button
          className="bg-neutral-800 text-white h-10 w-20 text-xs sm:text-sm font-semibold cursor-pointer flex-shrink-0 rounded-r-full"
          onClick={add}
        >
          Add +
        </button>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap justify-between my-3 gap-2">
        <select
          className="border bg-neutral-900 text-white w-24 sm:w-28 rounded-2xl p-2 text-xs sm:text-sm"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>

        <select
          className="border bg-neutral-900 text-white w-28 sm:w-32 rounded-2xl p-2 text-xs sm:text-sm"
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
