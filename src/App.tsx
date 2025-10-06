import { useState } from "react";
import "./App.css";
import AddTodo from "./components/addTodo";
import Todos from "./components/todos";
import type { Todo } from "./features/todo/todoSlice";

function App() {
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  return (
    <div className="h-full w-full text-white flex flex-col items-center py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-wide text-blue-400 drop-shadow-md">
          Todo App 📝
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Organize your day — one task at a time.
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-lg bg-gray-900/70 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-700 p-6">
        <AddTodo editTodo={editTodo} setEditTodo={setEditTodo} />
        <Todos setEditTodo={setEditTodo} />
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-600 text-xs">
        Made with ❤️ by <span className="text-blue-400">manish</span>
      </footer>
    </div>
  );
}

export default App;
