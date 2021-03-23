import "./todos.scss";
import * as React from "react";
import { Button } from "react-bootstrap";
import {
  getAllItems,
  getTodoItems,
  getTodaysItems,
  toggleItem,
  deleteItem,
  showNewModal,
  showTodoModal
} from "../../redux/todos/todosSlice";
import { connect } from "react-redux";
import NewTodoModal from "./NewTodoModal";
import ViewTodoModal from "./ViewTodoModal";
import EditTodoModal from "./EditTodoModal";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
  return {
    tab: state.todos.tab,
    todos: state.todos.todos,
    showNew: state.todos.showNew,
    titleInput: state.todos.titleInput,
    descriptionInput: state.todos.descriptionInput,
    deadlineInput: state.todos.deadlineInput,
    showTodo: state.todos.showTodo,
    todoId: state.todos.todoId,
    todoTitle: state.todos.todoTitle,
    todoDescription: state.todos.todoDescription,
    todoDone: state.todos.todoDone,
    todoDeadline: state.todos.todoDeadline,
    showEdit: state.todos.showEdit
  };
};

const mapDispatch = {
  getAllItems,
  getTodoItems,
  getTodaysItems,
  toggleItem,
  deleteItem,
  showNewModal,
  showTodoModal
};

function Todos(props) {
  useEffect(() => {
    props.getAllItems();
  }, []);

  return (
    <div>
      <span className="btn-group m-2" role="group" aria-label="Basic example">
        <button
          type="button"
          className={
            props.tab === "all" ? "btn btn-primary" : "btn btn-outline-primary"
          }
          onClick={props.getAllItems}
        >
          All
        </button>
        <button
          type="button"
          className={
            props.tab === "todo" ? "btn btn-primary" : "btn btn-outline-primary"
          }
          onClick={props.getTodoItems}
        >
          To-Do
        </button>
        <button
          type="button"
          className={
            props.tab === "today"
              ? "btn btn-primary"
              : "btn btn-outline-primary"
          }
          onClick={props.getTodaysItems}
        >
          Today
        </button>
      </span>
      <Button onClick={props.showNewModal} variant="success">
        Add
      </Button>

      <ViewTodoModal />
      <NewTodoModal />
      <EditTodoModal />

      {props.todos.map(todo => (
        <div className="card m-2" key={todo.id}>
          <div className="card-body">
            <input
              type="checkbox"
              defaultChecked={todo.isDone}
              onChange={e => props.toggleItem(todo.id)}
            />
            {"  "}
            <Link to={`/todos/id/${todo.id}`}>{todo.title}</Link>
            <span className="float-right">
              <Button size="sm" onClick={e => props.showTodoModal(todo.id)}>
                Details
              </Button>
              <Button
                onClick={e => props.deleteItem(todo.id)}
                className="ml-2"
                variant="danger"
                size="sm"
              >
                Delete
              </Button>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatch)(Todos);
