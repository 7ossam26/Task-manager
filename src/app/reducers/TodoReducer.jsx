import { v4 as uid } from "uuid";

export default function TodoReducer(state = [], action) {
  switch (action.type) {
    case "add": {
      const newTodo = {
        id: uid(),
        title: action.payload.title, // I will pass to action
        details: "",
        dueDate: action.payload.dueDate,
        isCompleted: false,
      };
      const updatedTodos = [...state, newTodo];
      // just saving data in localstorage (todos)
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "delete": {
      const updatedTodos = state.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "update": {
      const updatedTodos = state.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
            dueDate: action.payload.dueDate,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      return JSON.parse(localStorage.getItem("todos")) ?? [];
    }
    default: {
      throw new Error("Invalid action type" + action.type);
    }
  }
}
