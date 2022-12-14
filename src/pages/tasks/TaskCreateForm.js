import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";

const TaskCreateForm = () => {
  const [errors, setErrors] = useState({});
  const [taskData, setTaskData] = useState({
    title: "",
    due_date: "",
    priority: "Must do",
    description: "",
  });

  const { title, due_date, priority, description } = taskData;
  const history = useHistory();

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("due_date", due_date);
    formData.append("priority", priority);
    formData.append("description", description);

    try {
      const { data } = await axiosReq.post("/tasks/", formData);
      history.push(`/tasks/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label className="d-none">Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="due_date">
        <Form.Label className="d-none">Due date</Form.Label>
        <Form.Control
          type="datetime-local"
          name="due_date"
          value={due_date}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      {errors?.due_date?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="priority">
        <Form.Label className="d-none">Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          onChange={handleChange}
        >
          <option value="Must do">Must do</option>
          <option value="Might do">Might do</option>
          <option value="Can do">Can do</option>
        </Form.Control>
      </Form.Group>
      {errors?.priority?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group controlId="description">
        <Form.Label className="d-none">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={description}
          placeholder="Description"
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Button type="submit">Create Task</Button>
    </Form>
  );
};

export default TaskCreateForm;
