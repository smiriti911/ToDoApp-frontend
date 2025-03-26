import React from "react";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeTodo, toggleComplete } from "../redux/todoSlice";

const ToDolist = ({ text, priority, isComplete, id }) => {
  const dispatch = useDispatch();

  const priorityColors = {
    High: "bg-red-400 text-white", 
    Medium: "bg-yellow-400 text-white",
    Low: "bg-green-400 text-white",
  };

  return (
    <div className="flex items-center justify-between my-2 p-3 rounded-lg">
      {/* Left Section: Checkbox & Task */}
      <div
        className="flex items-center cursor-pointer gap-3 flex-1"
        onClick={() => {
          console.log("Toggling complete for ID:", id); // ✅ Debugging
          dispatch(toggleComplete(id)); 
        }}
      >
        {isComplete ? (
          <FaCheckCircle size={23} className="text-neutral-800" />
        ) : (
          <FaRegCircle size={23} className="text-neutral-800" />
        )}
        <p className={`text-lg ${isComplete ? "line-through text-gray-500" : ""}`}>
          {text}
        </p>
      </div>

      {/* Right Section: Priority & Delete */}
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${priorityColors[priority]}`}>
          {priority}
        </span>
        <MdDelete 
          size={23} 
          className="cursor-pointer hover:text-red-500" 
          onClick={() => {
            console.log("Removing ID:", id); // ✅ Debugging
            dispatch(removeTodo(id));
          }} 
        />
      </div>
    </div>
  );
};

export default ToDolist;
