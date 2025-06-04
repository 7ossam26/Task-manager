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
        priority: action.payload.priority || "medium",
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
            priority: action.payload.priority ?? t.priority,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      const stored = JSON.parse(localStorage.getItem("todos")) ?? [];
      return stored.map((t) => ({ ...t, priority: t.priority || "medium" }));
    }
    default: {
      throw new Error("Invalid action type" + action.type);
    }
  }
}
