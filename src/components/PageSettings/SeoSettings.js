import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const SeoSettingsComponent = ({ pageId, handleEnableMicrobot }) => {
  const [keywords, setKeywords] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/pages/pagedetails/${pageId}`)
      .then((resp) => {
        setData(resp.data);
      });
  }, [pageId]);

  const handleSave = () => {
    axios
      .post(`http://localhost:5000/pages/pagedetails/${pageId}`, {
        keywords: keywords,
        description: description,
      })
      .then((resp) => {});
  };

  return (
    <>
      <h5 className="title1">Page Details</h5>
      <div className="container">
        <Form>
          <div className="row mt5">
            <div className="col-10">
              <Form.Group controlId="pageTitle">
                <Form.Label>keywords</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Keywords"
                  name="keywords"
                  value={keywords || ""}
                  onChange={(e) => setKeywords(e.target.value)}
                  onBlur={handleSave}
                />
              </Form.Group>
            </div>
            <div className="col-10">
              <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Page Title"
                  name="author"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};

export default SeoSettingsComponent;
