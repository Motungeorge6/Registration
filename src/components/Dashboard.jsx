import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [journalTitle, setJournalTitle] = useState("");
  const [state, setState] = useState({});

  const toggleModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setJournalTitle(!journalTitle);
    try {
      const response = await axios.post(
        "https://ten-x-dev.herokuapp.com/api/v1/gossipCentral/journal",
        { journalTitle },
        {
          headers: {
            Authorization: "Bearer " + state.token,
          },
        }
      );

      alert(response.data.successful);
    } catch (error) {
      alert(error.response.data.data.message);
    }
  };

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("user"));
    setState(temp);
  }, []);

  return (
    <div className="dashboard">
      <h3>Welcome back, {state.firstName}</h3>
      <button onClick={toggleModal}>Create new journal</button>
      <Modal show={showModal}>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Journal Name</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              onChange={(e) => setJournalTitle(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            OK
          </Button>
          <Button variant="primary" type="submit" onClick={toggleModal}>
            Cancel
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
export default Dashboard;
