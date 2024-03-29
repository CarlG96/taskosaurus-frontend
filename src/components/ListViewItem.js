import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import btnStyles from "../styles/Button.module.css";
import styles from "../styles/ListViewItem.module.css";

/*
 * Component which displays any of the items in the list views of either
 * the Tasks page or Events page.
 * @param (object) props: Used to define whether the object returned from
 * the backend is a task or event through the props.due_date field.
 */

const ListViewItem = (props) => {
  const history = useHistory();
  const [viewTerms, setViewTerms] = useState("");

  // Function that pushes the user to the clicked on item.
  const handleTaskView = () => {
    if (props.due_date) {
      history.push(`tasks/${props.id}`);
    } else {
      history.push(`events/${props.id}`);
    }
  };

  // Function which handles the lifecycle of the component and whether it is a task or event.
  useEffect(() => {
    if (props.due_date) {
      setViewTerms("View Task");
    } else {
      setViewTerms("View Event");
    }
  }, [props.due_date]);

  return (
    <Col md={6} xl={4} className={` mt-2 pb-3 mb-3`}>
      {props.overdue ? (
        <div className={`${styles.OverDue}`}>
          <h3 className={`text-center mt-3`}>{props.title}</h3>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
            onClick={handleTaskView}
          >
            {viewTerms} (OVERDUE)
          </Button>
        </div>
      ) : (
        <div className={`${styles.ListViewItem}`}>
          <h3 className={`text-center mt-3`}>{props.title}</h3>
          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
            onClick={handleTaskView}
          >
            {viewTerms}
          </Button>
        </div>
      )}
    </Col>
  );
};

export default ListViewItem;
