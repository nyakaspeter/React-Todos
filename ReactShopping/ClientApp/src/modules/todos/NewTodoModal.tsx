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
import { connect, useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

export default function NewTodoModal(props) {
  const dispatch = useDispatch();
  const show = useSelector((state: any) => state.todos.showNew);
  const { control, register, handleSubmit, watch } = useForm();
  const onSubmit = data => {
    dispatch(addItem(data));
  };

  return (
    <Modal show={show} onHide={() => dispatch(hideNewModal())}>
      <Modal.Header closeButton>
        <Modal.Title>New to-do</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            ref={register}
            name="title"
            type="text"
            placeholder="Title"
          />
          <br />
          <Form.Control
            ref={register}
            name="description"
            as="textarea"
            placeholder="Description"
            rows="2"
          />
          <br />
          <Controller
            as={
              <DatePicker
                className="form-control"
                placeholderText="Deadline"
                selected={watch("deadline")}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={1}
                timeCaption="Time"
                dateFormat="yyyy. MM. dd. HH:mm"
              />
            }
            name="deadline"
            control={control}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => dispatch(hideNewModal())}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit(onSubmit)}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
