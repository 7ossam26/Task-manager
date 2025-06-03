import { v4 as uid } from "uuid";

export default function TodoReducer(currentTodos, action) {
  switch (action.type) {
    case "add": {
      const newTodo = {
        id: uid(),
        title: action.payload.title, // I will pass to action
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      // just saving data in localstorage (todos)
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "delete": {
      const updatedTodos = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "update": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
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
