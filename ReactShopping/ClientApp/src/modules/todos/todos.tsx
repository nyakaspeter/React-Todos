import "./todos.scss";
import * as React from "react";
import { Todo, TodosClient } from "../../api/app.generated";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";

export class Todos extends React.Component<
  {},
  {
    tab: string;
    todos: Todo[];
    showNew: boolean;
    titleInput: string;
    descriptionInput: string;
    deadlineInput: Date;
    showTodo: boolean;
    todoId: string;
    todoTitle: string;
    todoDescription: string;
    todoDone: boolean;
    todoDeadline: Date;
    showEdit: boolean;
  }
> {
  client = new TodosClient("https://localhost:44312");

  constructor(props) {
    super(props);

    this.state = {
      tab: "all",
      todos: [],
      showNew: false,
      titleInput: "",
      descriptionInput: "",
      deadlineInput: null,
      showTodo: false,
      todoId: "",
      todoTitle: "",
      todoDescription: "",
      todoDone: false,
      todoDeadline: null,
      showEdit: false
    };
  }

  allItems = () => {
    this.setState({ tab: "all" });
    this.client.allItems().then(res => {
      this.setState({
        todos: res.sort((a, b) => {
          return a.deadline.valueOf() - b.deadline.valueOf();
        })
      });
    });
  };

  todoItems = () => {
    this.setState({ tab: "todo" });
    this.client.todoItems().then(res => {
      this.setState({
        todos: res.sort((a, b) => {
          return a.deadline.valueOf() - b.deadline.valueOf();
        })
      });
    });
  };

  todaysItems = () => {
    this.setState({ tab: "today" });
    this.client.todaysItems().then(res => {
      this.setState({
        todos: res.sort((a, b) => {
          return a.deadline.valueOf() - b.deadline.valueOf();
        })
      });
    });
  };

  addItem = () => {
    this.client
      .addTodo(
        undefined,
        this.state.titleInput,
        this.state.descriptionInput,
        false,
        this.state.deadlineInput
      )
      .then(() => {
        this.handleCloseNew();
        switch (this.state.tab) {
          case "all":
            this.allItems();
            break;
          case "todo":
            this.todoItems();
            break;
          case "today":
            this.todaysItems();
            break;
        }
      });
  };

  editItem = () => {
    this.client
      .editTodo(
        this.state.todoId,
        this.state.titleInput,
        this.state.descriptionInput,
        this.state.todoDone,
        this.state.deadlineInput
      )
      .then(() => {
        switch (this.state.tab) {
          case "all":
            this.allItems();
            break;
          case "todo":
            this.todoItems();
            break;
          case "today":
            this.todaysItems();
            break;
        }
        this.handleCloseEdit();
      });
  };

  toggleItem = (id, e) => {
    this.client.toggleTodo(id).then(() => {
      if (this.state.tab === "todo") {
        this.todoItems();
      }
    });
  };

  deleteItem = (id, e) => {
    this.client.deleteTodo(id).then(() => {
      this.handleCloseNew();
      switch (this.state.tab) {
        case "all":
          this.allItems();
          break;
        case "todo":
          this.todoItems();
          break;
        case "today":
          this.todaysItems();
          break;
      }
    });
  };

  handleCloseTodo = () => {
    this.setState({ showTodo: false });
  };
  handleShowTodo = (id, e) => {
    const todo = this.state.todos.find(todo => todo.id === id);
    this.setState({
      todoId: todo.id,
      todoTitle: todo.title,
      todoDescription: todo.description,
      todoDeadline: todo.deadline,
      todoDone: todo.isDone,
      showTodo: true
    });
  };

  handleCloseNew = () => {
    this.setState({ showNew: false });
  };
  handleShowNew = () =>
    this.setState({
      titleInput: "",
      descriptionInput: "",
      deadlineInput: null,
      showNew: true
    });

  handleCloseEdit = () => {
    this.setState({ showEdit: false });
  };
  handleShowEdit = () =>
    this.setState({
      showTodo: false,
      titleInput: this.state.todoTitle,
      descriptionInput: this.state.todoDescription,
      deadlineInput: this.state.todoDeadline,
      showEdit: true
    });

  handleTitleChange = event => {
    this.setState({ titleInput: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ descriptionInput: event.target.value });
  };

  handleDeadlineChange = date => {
    this.setState({ deadlineInput: date });
  };

  componentDidMount() {
    this.allItems();
  }

  render() {
    return (
      <div>
        <span className="btn-group m-2" role="group" aria-label="Basic example">
          <button
            type="button"
            className={
              this.state.tab === "all"
                ? "btn btn-primary"
                : "btn btn-outline-primary"
            }
            onClick={this.allItems}
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
            onClick={this.todoItems}
          >
            To-Do
          </button>
          <button
            onClick={this.todaysItems}
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
        <Button onClick={this.handleShowNew} variant="success">
          Add
        </Button>

        <Modal show={this.state.showNew} onHide={this.handleCloseNew}>
          <Modal.Header closeButton>
            <Modal.Title>New to-do</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control
                type="text"
                placeholder="Title"
                value={this.state.titleInput}
                onChange={this.handleTitleChange}
              />
              <br />
              <Form.Control
                as="textarea"
                placeholder="Description"
                rows="2"
                value={this.state.descriptionInput}
                onChange={this.handleDescriptionChange}
              />
              <br />
              <DatePicker
                className="form-control"
                placeholderText="Deadline"
                selected={this.state.deadlineInput}
                onChange={date => this.handleDeadlineChange(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="yyyy. MM. dd. HH:mm"
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseNew}>
              Cancel
            </Button>
            <Button variant="success" onClick={this.addItem}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showEdit} onHide={this.handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit to-do</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Control
                type="text"
                placeholder="Title"
                value={this.state.titleInput}
                onChange={this.handleTitleChange}
              />
              <br />
              <Form.Control
                as="textarea"
                placeholder="Description"
                rows="2"
                value={this.state.descriptionInput}
                onChange={this.handleDescriptionChange}
              />
              <br />
              <DatePicker
                className="form-control"
                placeholderText="Deadline"
                selected={this.state.deadlineInput}
                onChange={date => this.handleDeadlineChange(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="yyyy. MM. dd. HH:mm"
              />
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseEdit}>
              Cancel
            </Button>
            <Button variant="success" onClick={this.editItem}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showTodo} onHide={this.handleCloseTodo}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.todoTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h6>Description</h6>
            </div>
            {this.state.todoDescription}
            <div className="mt-3">
              <h6>Deadline</h6>
            </div>
            {this.state.todoDeadline
              ? this.state.todoDeadline.toLocaleString()
              : ""}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleShowEdit}>
              Edit
            </Button>
            <Button variant="secondary" onClick={this.handleCloseTodo}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {this.state.todos.map(todo => (
          <div className="card m-2" key={todo.id}>
            <div className="card-body">
              <input
                type="checkbox"
                defaultChecked={todo.isDone}
                onChange={e => this.toggleItem(todo.id, e)}
              />
              {"  " + todo.title}
              <span className="float-right">
                <Button
                  size="sm"
                  onClick={e => this.handleShowTodo(todo.id, e)}
                >
                  Details
                </Button>
                <Button
                  onClick={e => this.deleteItem(todo.id, e)}
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
}
