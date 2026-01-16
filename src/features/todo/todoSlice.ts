import { createSlice ,nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type Todo = { id: string; text: string };
type TodosState = { todos: Todo[] };

const initialState: TodosState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {

    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = { id: nanoid(), text: action.payload };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
   updateTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const { id, text } = action.payload;
      const existingTodo = state.todos.find(todo => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    },

  },
});

export const { addTodo, removeTodo ,updateTodo} = todoSlice.actions;

export default todoSlice.reducer;
