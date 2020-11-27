import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const CustomCodeComponent = ({ pageId }) => {
  const [codeScript, setCodeScript] = useState("");

  const handleCodeSave = (e) => {
    var obj = {
      script: codeScript,
    };
    e.preventDefault();
    axios
      .post(`http://localhost:5000/pages/savescript/${pageId}`, obj)
      .then((resp) => {
     });
  };

  return (
    <>
      <h5 className="title1">Custom Script</h5>
      <div className="container">
        <Form onSubmit={handleCodeSave}>
          <div className="row">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={10}
                value={codeScript}
                onChange={(e) => setCodeScript(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="row justify-content-around">
            <Button variant="outline-secondary" type="submit" id="codeSave">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default CustomCodeComponent;
