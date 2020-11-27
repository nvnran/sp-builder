import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const PageDetailsComponent = ({ pageId }) => {
  const [identifier, setIdentifier] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/pages/botdetails/${pageId}`)
      .then((resp) => {
        setIdentifier(resp.data.identifier);
      });
  }, [pageId]);

  const handleSave = () => {
    axios
      .post(`http://localhost:5000/pages/botidentifier/${pageId}`, {
        identifier: identifier,
      })
      .then((resp) => {
      });
  };

  return (
    <>
      <h5 className="title1">Page Details</h5>
      <div className="container">
        <Form>
          <div className="row mt5">
            <div className="col-8">
              <Form.Group controlId="identifier">
                <Form.Label>Bot Identifier</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Identifier"
                  name="identifier"
                  value={identifier || ""}
                  onChange={(e) => setIdentifier(e.target.value)}
                  onBlur={handleSave}
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PageDetailsComponent;
