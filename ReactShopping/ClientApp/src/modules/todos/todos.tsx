import "./todos.scss";
import * as React from "react";
import axios from "axios";
import { Todo } from "../../api/app.generated";

export class Todos extends React.Component<{}, { tab: string; todos: Todo[] }> {
  constructor(props) {
    super(props);
    this.state = {
      tab: "all",
      todos: []
    };
  }

  allitems = () => {
    const tab = "all";
    axios.get("https://localhost:44312/api/todos/allitems").then(res => {
      const todos = res.data;
      this.setState({ tab, todos });
    });
  };

  todoitems = () => {
    const tab = "todo";
    axios.get("https://localhost:44312/api/todos/todoitems").then(res => {
      const todos = res.data;
      this.setState({ tab, todos });
    });
  };

  todaysitems = () => {
    const tab = "today";
    axios.get("https://localhost:44312/api/todos/todoitems").then(res => {
      const todos = res.data;
      this.setState({ tab, todos });
    });
  };

  componentDidMount() {
    axios.get("https://localhost:44312/api/todos/allitems").then(res => {
      const todos = res.data;
      this.setState({ todos });
    });
  }

  render() {
    return (
      <div>
        <span className="btn-group" role="group" aria-label="Basic example">
          <button
            type="button"
            className={
              this.state.tab === "all"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={this.allitems}
          >
            All
          </button>
          <button
            type="button"
            className={
              this.state.tab === "todo"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={this.todoitems}
          >
            To-Do
          </button>
          <button
            onClick={this.todaysitems}
            type="button"
            className={
              this.state.tab === "today"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
          >
            Today
          </button>
        </span>
        {this.state.todos.map(todo => (
          <div className="card">
            <div className="card-body">
              <input type="checkbox" checked={todo.isDone} />
              {todo.title} ({todo.deadline}):
              {todo.description}
            </div>
          </div>
        ))}
      </div>
    );
  }
}
