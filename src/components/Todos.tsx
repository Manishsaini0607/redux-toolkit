import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { removeTodo } from "../features/todo/todoSlice";
import type { Todo } from "../features/todo/todoSlice";
import type { RootState } from "@reduxjs/toolkit/query";
 // ✅ correct import for store

type TodosProps = {
  setEditTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export default function Todos({ setEditTodo }: TodosProps) {
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className="mt-8 bg-gray-900/60 border border-gray-700 rounded-2xl shadow-2xl p-5 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-gray-200 mb-4 tracking-wide flex items-center gap-2">
        🗒️ Your Todos
      </h2>

      {todos.length === 0 ? (
        <p className="text-gray-500 text-center italic">No todos yet 💤</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo: Todo, index: number) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
              className="flex items-center justify-between bg-gray-800 hover:bg-gray-750 px-4 py-2 rounded-xl border border-gray-700/70 shadow-sm transition-all"
            >
              <span className="text-gray-200">{todo.text}</span>

              <div className="flex items-center gap-4">
                {/* Edit Button */}
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setEditTodo(todo)}
                  className="text-blue-400 hover:text-blue-300 transition"
                >
                  <Pencil size={18} />
                </motion.button>

                {/* Delete Button */}
                <motion.button
                  whileHover={{ scale: 1.2, rotate: -10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <Trash2 size={18} />
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}
