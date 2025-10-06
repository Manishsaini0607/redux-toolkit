import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo, type Todo } from "../features/todo/todoSlice";

type AddTodoProps = {
  editTodo: Todo | null;
  setEditTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export default function AddTodo({ editTodo, setEditTodo }: AddTodoProps) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  useEffect(() => {
    if (editTodo) setText(editTodo.text);
  }, [editTodo]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editTodo) {
      dispatch(updateTodo({ id: editTodo.id, text }));
      setEditTodo(null);
    } else {
      dispatch(addTodo(text));
    }
    setText("");
  };

  return (
    <motion.form
      onSubmit={submitHandler}
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3 justify-center mb-6"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your todo..."
        className="w-64 px-4 py-2 bg-gray-800/80 text-gray-100 border border-gray-700 rounded-xl 
                   focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500 shadow-inner transition-all"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        type="submit"
        className={`px-4 py-2 rounded-xl font-medium text-sm shadow-md transition-all ${
          editTodo
            ? "bg-yellow-500 hover:bg-yellow-400 text-gray-900"
            : "bg-blue-600 hover:bg-blue-500 text-white"
        }`}
      >
        {editTodo ? "Update ✏️" : "Add ➕"}
      </motion.button>
    </motion.form>
  );
}
