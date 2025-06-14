// libraries
import "../styles/App.css";
import { useState, useContext, useEffect, useMemo, useReducer } from "react";
import { TodosContext } from "../app/Contexts/TodosContext.jsx";
// MUI Material
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import Grid from "@mui/material/Grid2";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
// components
import Todo from "./Todo.jsx";
import TodoReducer from "../app/reducers/TodoReducer.jsx";

export default function TodoList() {
  const [todos, dispatch] = useReducer(TodoReducer, []);

  const [dialogTodo, setDialogTodo] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [dueDateInput, setDueDateInput] = useState("");
  const [priorityInput, setPriorityInput] = useState("medium");
  const [todosType, setTodosType] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  //filtration
  let toBeRendered = todos;
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);
  if (todosType === "completed") {
    toBeRendered = completedTodos;
  } else if (todosType === "not-completed") {
    toBeRendered = notCompletedTodos;
  }

  if (priorityFilter !== "all") {
    toBeRendered = toBeRendered.filter((t) => t.priority === priorityFilter);
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function changeTodosType(e) {
    setTodosType(e.target.value);
  }

  function changePriorityFilter(e) {
    setPriorityFilter(e.target.value);
  }

  //  handlers
  function handleAddClick() {
    dispatch({
      type: "add",
      payload: {
        title: titleInput,
        dueDate: dueDateInput,
        priority: priorityInput,
      },
    });
    setTitleInput("");
    setDueDateInput("");
    setPriorityInput("medium");
  }

  // Delete handlers
  function DeletePopShow(todo) {
    setDialogTodo(todo);
    setShowDeletePopup(true);
  }
  function handleDeleteCloseShow() {
    setShowDeletePopup(false);
    setDialogTodo(null); // Clear dialogTodo when closing
  }
  function handleDeleteConfirm() {
    dispatch({ type: "delete", payload: dialogTodo });
    setShowDeletePopup(false);
  }

  // Update handlers
  function UpdatePopShow(todo) {
    setDialogTodo({ ...todo }); // Create a copy of the todo
    setShowUpdatePopup(true);
  }
  function handleUpdateClose() {
    setShowUpdatePopup(false);
    setDialogTodo(null); // Clear dialogTodo when closing
  }
  function handleUpdateConfirm() {
    dispatch({ type: "update", payload: dialogTodo });
    setShowUpdatePopup(false);
  }

  const todosJsx = toBeRendered.map((t) => (
    <Todo
      key={t.id}
      todo={t}
      deleteShow={DeletePopShow}
      updateShow={UpdatePopShow}
    />
  ));

  return (
    <>
      {/*Edit PopUp*/}
      <Dialog
        open={showUpdatePopup}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit Task</DialogTitle>
        <DialogContent>
          {/*title input*/}
          <TextField
            autoFocus
            required
            margin="dense"
            id="Title"
            name="Title"
            label="Task Title"
            fullWidth
            variant="standard"
            value={dialogTodo?.title || ""} // Safe access with fallback
            onChange={(e) => {
              setDialogTodo((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
          {/*description input*/}
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="description"
            fullWidth
            variant="standard"
            value={dialogTodo?.details || ""} // Safe access with fallback
            onChange={(e) => {
              setDialogTodo((prev) => ({ ...prev, details: e.target.value }));
            }}
          />
          {/*due date input*/}
          <TextField
            margin="dense"
            id="dueDate"
            name="dueDate"
            label="Due Date"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="standard"
            value={dialogTodo?.dueDate || ""}
            onChange={(e) => {
              setDialogTodo((prev) => ({ ...prev, dueDate: e.target.value }));
            }}
          />
          {/*priority input*/}
          <TextField
            select
            margin="dense"
            id="priority"
            name="priority"
            label="Priority"
            fullWidth
            variant="standard"
            value={dialogTodo?.priority || "medium"}
            onChange={(e) => {
              setDialogTodo((prev) => ({ ...prev, priority: e.target.value }));
            }}
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>close</Button>
          <Button
            autoFocus
            style={{ color: "green" }}
            onClick={handleUpdateConfirm}
          >
            confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/*Delete PopUp*/}
      <Dialog
        open={showDeletePopup}
        onClose={handleDeleteCloseShow}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          do you sure to delete ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            you can&apos;t be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCloseShow}>close</Button>
          <Button
            autoFocus
            style={{ color: "red" }}
            onClick={handleDeleteConfirm}
          >
            yes
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="md">
        <Card
          sx={{ minWidth: 275 }}
          style={{ maxHeight: "95vh", overflow: "auto" }}
        >
          <CardContent>
            <Typography
              variant="h2"
              style={{ fontWeight: "bold" }}
              sx={{ textAlign: "center" }}
            >
              TodoList
            </Typography>
            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <ToggleButtonGroup
                exclusive
                style={{ marginTop: "10px" }}
                value={todosType}
                onChange={changeTodosType}
                color="primary"
              >
                <ToggleButton value={"all"} style={{ fontWeight: "500" }}>
                  all
                </ToggleButton>

                <ToggleButton
                  value={"not-completed"}
                  style={{ fontWeight: "500" }}
                >
                  not finished
                </ToggleButton>
                <ToggleButton value={"completed"} style={{ fontWeight: "500" }}>
                  finished
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
              }}
            >
              <ToggleButtonGroup
                exclusive
                style={{ marginTop: "10px" }}
                value={priorityFilter}
                onChange={changePriorityFilter}
                color="primary"
              >
                <ToggleButton value={"all"} style={{ fontWeight: "500" }}>
                  all priorities
                </ToggleButton>
                <ToggleButton value={"high"} style={{ fontWeight: "500" }}>
                  high
                </ToggleButton>
                <ToggleButton value={"medium"} style={{ fontWeight: "500" }}>
                  medium
                </ToggleButton>
                <ToggleButton value={"low"} style={{ fontWeight: "500" }}>
                  low
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/*todos*/}
            {todosJsx}
            {/*/todos/*/}

            {/* inputs*/}
            <Grid container spacing={2} style={{ marginTop: "10px" }}>
              <Grid size={4} className="">
                <TextField
                  id="outlined-basic"
                  label="Task Title"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                />
              </Grid>
              <Grid size={4} className="">
                <TextField
                  id="due-date"
                  label="Due Date"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  style={{ width: "100%" }}
                  value={dueDateInput}
                  onChange={(e) => setDueDateInput(e.target.value)}
                />
              </Grid>
              <Grid size={2} className="">
                <TextField
                  select
                  id="priority-new"
                  label="Priority"
                  variant="outlined"
                  style={{ width: "100%" }}
                  value={priorityInput}
                  onChange={(e) => setPriorityInput(e.target.value)}
                >
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="low">Low</MenuItem>
                </TextField>
              </Grid>
              <Grid size={2} className="">
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={() => {
                    handleAddClick();
                  }}
                  disabled={titleInput === ""}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
            {/*  /inputs/*/}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
