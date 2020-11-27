import React, { useEffect, useState } from "react";
import axios from "axios";
import NoPages from "./NoPages";
import PageList from "./PageList";
import { BsPlusCircleFill } from "react-icons/bs";

const ProjectPagesComponent = () => {
  const projectId = new URLSearchParams(window.location.search).get(
    "projectId"
  );
  const [project, setProject] = useState([]);
  const [pages, setPages] = useState([]);
  const [dataReceived, setDataReceived] = useState(false);
  const [title, setTitle] = useState("Project");

  useEffect(() => {
    axios.get(`http://localhost:5000/projects/${projectId}`).then((res) => {
      setProject(res.data);
    });
    axios
      .get("http://localhost:5000/pages/projectPages/" + projectId)
      .then((res) => {
        setDataReceived(true);
        let pgList = [];
        res.data.forEach((doc) => {
          let obj = {
            id: doc._id,
            author: doc.author,
            authorId: doc.authorId,
            created: doc.created,
            pageTitle: doc.pageTitle,
            identifier: doc.identifier,
          };
          pgList = [...pgList, obj];
        });
        setPages(pgList);
      });
  }, [projectId]);

  useEffect(() => {
    if (project.title !== undefined) {
      setTitle("Project - " + project.title);
    }
  }, [project]);

  const handleNewPage = (e) => {
    e.preventDefault();
    let link = `/projects/new-page/create?projectId=${projectId}`;
    window.location.replace(link);
  };

  if (!dataReceived) {
    return (
      <>
        <div className="projectlist">
          <div className="container">
            <div className="row">
              <h4>{title}</h4>
            </div>
            <div className="row">
              <button className="btn-newPage" onClick={handleNewPage}>
                <BsPlusCircleFill /> New Page
              </button>
            </div>
            <div className="row">
              <img
                src={require("../../assets/img/loader7.gif").default}
                alt=""
                className="loader"
              />
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="projectlist">
          <div className="container">
            <div className="row">
              <h4>{title}</h4>
            </div>
            <div className="row">
              <button className="btn-newPage" onClick={handleNewPage}>
                <BsPlusCircleFill /> New Page
              </button>
            </div>
            <div className="row">
              {dataReceived && pages.length === 0 ? (
                <NoPages />
              ) : (
                <PageList data={pages} />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default ProjectPagesComponent;
