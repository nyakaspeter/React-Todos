import "./todos.scss";
import * as React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { showEditModal, hideTodoModal } from "../../redux/todos/actions";
import { connect } from "react-redux";

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

const mapDispatchToProps = dispatch => {
  return {
    showEditModal: () => dispatch(showEditModal()),
    hideTodoModal: () => dispatch(hideTodoModal())
  };
};

function ViewTodoModal(props) {
  return (
    <Modal show={props.showTodo} onHide={props.hideTodoModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.todoTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h6>Description</h6>
        </div>
        {props.todoDescription}
        <div className="mt-3">
          <h6>Deadline</h6>
        </div>
        {props.todoDeadline ? props.todoDeadline.toLocaleString() : ""}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.showEditModal}>
          Edit
        </Button>
        <Button variant="secondary" onClick={props.hideTodoModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewTodoModal);
