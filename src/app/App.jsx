import "../styles/App.css";
// libraries
import { useState } from "react";
import { v4 as uid } from "uuid";
// import { Routes, Route } from "react-router-dom";

// components
import TodoList from "../components/TodoList.jsx";
import { TodosContext } from "./Contexts/TodosContext.jsx";
// MUI Material
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  typography: {
    fontFamily: ["vietnam"],
  },
  palette: {
    primary: {
      main: red[500],
    },
  },
});
const initialTodos = [
  {
    id: uid(),
    title: "task 1",
    details: "Task 1 description",
    isCompleted: false,
  },
  {
    id: uid(),
    title: "task 2",
    details: "Task 2 description",
    isCompleted: false,
  },
];
function App() {
  const [todos, setTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App flex justify-center items-center h-screen "
        style={{ background: "#191b1f" }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
