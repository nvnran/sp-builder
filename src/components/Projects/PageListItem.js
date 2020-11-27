import React from "react";
import moment from "moment";
import Swal from "sweetalert2";
import axios from "axios";
import { FiEdit3 } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { HiOutlineDuplicate, HiEye, HiOutlineCog } from "react-icons/hi";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const PageListItem = ({ data }) => {
  const projectId = new URLSearchParams(window.location.search).get(
    "projectId"
  );
  const pageId = data.id;
  const handleEdit = () => {
    localStorage.removeItem("gjsassets");
    localStorage.removeItem("gjscomponents");
    localStorage.removeItem("gjscss");
    localStorage.removeItem("gjshtml");
    localStorage.removeItem("gjsstyles");
    window.location.replace(
      "/project/builder/page?projectId=" + projectId + "&pageId=" + data.id
    );
  };
  const handleDuplicate = () => {
    console.log("Duplicate Clicked");
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete("http://localhost:5000/pages/" + pageId).then((res) => {
          if (res) {
            window.location.reload();
          } else {
            Swal.fire({
              title: "Oops",
              text: "Something went wrong!",
              icon: "error",
            });
          }
        });
      }
    });
  };

  const handleViewPage = () => {
    window.open(
      `http://localhost:5000/viewpage/page/${pageId}?identifier=${btoa(
        data.identifier
      )}`,
      "_blank"
    );
  };

  const handleSettings = () => {
    window.location.replace("/project/page/settings/config?pageId=" + data.id);
  };

  return (
    <>
      <tr>
        <td>{data.pageTitle}</td>
        <td>{data.author}</td>
        <td>{moment(data.created).format("Do MMM, YYYY")}</td>
        <td>
          <OverlayTrigger overlay={<Tooltip className="tooltip">Edit</Tooltip>}>
            <FiEdit3
              className="pageActionIcon"
              onClick={handleEdit}
              title="Edit"
            />
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip className="tooltip">Delete</Tooltip>}
          >
            <FaTrash
              className="pageActionIcon"
              onClick={handleDelete}
              title="Delete"
            />
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip className="tooltip">Clone</Tooltip>}
          >
            <HiOutlineDuplicate
              className="pageActionIcon"
              onClick={handleDuplicate}
              title="Clone"
            />
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip className="tooltip">View Page!</Tooltip>}
          >
            <HiEye
              className="pageActionIcon"
              onClick={handleViewPage}
              title="View Page"
            />
          </OverlayTrigger>

          <OverlayTrigger
            overlay={<Tooltip className="tooltip">Settings!</Tooltip>}
          >
            <HiOutlineCog
              className="pageActionIcon"
              onClick={handleSettings}
              title="Settings"
            />
          </OverlayTrigger>
        </td>
      </tr>
    </>
  );
};

export default PageListItem;
