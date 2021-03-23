import "./todos.scss";
import * as React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import {
  showNewModal,
  hideNewModal,
  showEditModal,
  handleTitleChange,
  handleDescriptionChange,
  handleDeadlineChange,
  addItem
} from "../../redux/todos/actions";
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
    showNewModal: () => dispatch(showNewModal()),
    hideNewModal: () => dispatch(hideNewModal()),
    showEditModal: () => dispatch(showEditModal()),
    handleTitleChange: value => dispatch(handleTitleChange(value)),
    handleDescriptionChange: value => dispatch(handleDescriptionChange(value)),
    handleDeadlineChange: value => dispatch(handleDeadlineChange(value)),
    addItem: () => dispatch(addItem())
  };
};

function NewTodoModal(props) {
  return (
    <Modal show={props.showNew} onHide={props.hideNewModal}>
      <Modal.Header closeButton>
        <Modal.Title>New to-do</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type="text"
            placeholder="Title"
            value={props.titleInput}
            onChange={props.handleTitleChange}
          />
          <br />
          <Form.Control
            as="textarea"
            placeholder="Description"
            rows="2"
            value={props.descriptionInput}
            onChange={props.handleDescriptionChange}
          />
          <br />
          <DatePicker
            className="form-control"
            placeholderText="Deadline"
            selected={props.deadlineInput}
            onChange={date => props.handleDeadlineChange(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={1}
            timeCaption="Time"
            dateFormat="yyyy. MM. dd. HH:mm"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideNewModal}>
          Cancel
        </Button>
        <Button variant="success" onClick={props.addItem}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoModal);
