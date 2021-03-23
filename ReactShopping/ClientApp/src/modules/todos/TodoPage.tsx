import * as React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { connect, useSelector, useDispatch } from "react-redux";

export default function TodoPage({ match, history }) {
  const dispatch = useDispatch();
  const todos = useSelector((state: any) => state.todos.todos);
  const todo = todos.find(({ id }) => id === match.params.id);
  if (!todo) {
    history.push("/todos");
    return null;
  }

  return (
    <div className="m-4">
      <h6>Title</h6>
      {todo.title}
      <br />
      <br />
      <h6>Descrtiption</h6>
      {todo.description}
      <br />
      <br />
      <h6>Deadline</h6>
      {todo.deadline.toLocaleString()}
      <br />
      <br />
      <Button onClick={history.goBack}>Go back</Button>
    </div>
  );
}
