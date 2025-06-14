import "../styles/App.css";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// Todo colors icons
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// Todo libraries
import { useContext, useState } from "react";
import { TodosContext } from "../app/Contexts/TodosContext.jsx";

export default function Todo({ todo, deleteShow, updateShow }) {
  const { todos, setTodos } = useContext(TodosContext);

  const dueDateObj = todo.dueDate ? new Date(todo.dueDate) : null;
  const now = new Date();
  const isOverdue =
    dueDateObj && !todo.isCompleted && dueDateObj.getTime() < now.getTime();
  const isDueSoon =
    dueDateObj &&
    !todo.isCompleted &&
    dueDateObj.getTime() >= now.getTime() &&
    dueDateObj.getTime() - now.getTime() <= 24 * 60 * 60 * 1000;

  // event handlers
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        // Return a new object with the toggled isCompleted status
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    deleteShow(todo);
  }
  function handleUpdateClick() {
    updateShow(todo);
  }

  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: "10px",
          border: isOverdue
            ? "2px solid #e53935"
            : isDueSoon
            ? "2px solid #ffb300"
            : "none",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5" sx={{ textAlign: "left" }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
              {dueDateObj && (
                <Typography variant="body2" sx={{ textAlign: "left" }}>
                  Due: {dueDateObj.toLocaleString()}
                </Typography>
              )}
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                Priority: {todo.priority}
              </Typography>
            </Grid>
            <Grid
              size={4}
              sx={{ textAlign: "right" }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="Check"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a",
                }}
              >
                <CheckIcon />
              </IconButton>

              <IconButton
                className="iconButton"
                aria-label="Edit"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa",
                }}
                onClick={handleUpdateClick}
              >
                <EditIcon />
              </IconButton>

              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
