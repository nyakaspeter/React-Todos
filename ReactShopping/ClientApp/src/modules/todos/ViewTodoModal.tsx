import "./todos.scss";
import * as React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { showEditModal, hideTodoModal } from "../../redux/todos/actions";
import { connect, useSelector, useDispatch } from "react-redux";

export default function ViewTodoModal(props) {
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.todos.showTodo);
  const title = useSelector((state: any) => state.todos.todoTitle);
  const description = useSelector((state: any) => state.todos.todoDescription);
  const deadline = useSelector((state: any) => state.todos.todoDeadline);

  return (
    <Modal show={show} onHide={() => dispatch(hideTodoModal())}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h6>Description</h6>
        </div>
        {description}
        <div className="mt-3">
          <h6>Deadline</h6>
        </div>
        {deadline ? deadline.toLocaleString() : ""}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => dispatch(showEditModal())}>
          Edit
        </Button>
        <Button variant="secondary" onClick={() => dispatch(hideTodoModal())}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
