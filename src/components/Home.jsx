import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        setData(res.data);
        setTotalPages(Math.ceil(res.data.length / itemsPerPage));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedUserId(id);
    setShow(true);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3000/users/${selectedUserId}`)
      .then(() => {
        setData(data.filter((user) => user.id !== selectedUserId));
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`btn ${
            currentPage === i ? "btn-primary" : "btn-secondary"
          } rounded-pill m-1`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const usersToShow = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center bg-light min-vh-100">
      <h1 className="mb-4">Users Info</h1>
      <div className="w-100">
        <div className="d-flex justify-content-end mb-3">
          <Link to="/create" className="btn btn-success rounded-pill">
            Add
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>City</th>
                <th>District</th>
                <th>Province</th>
                <th>Country</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {usersToShow.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.image && (
                      <img
                        src={`http://localhost:3000/${user.image}`}
                        alt="User"
                        width="50"
                        height="50"
                      />
                    )}
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.dob}</td>
                  <td>{user.address.city}</td>
                  <td>{user.address.district}</td>
                  <td>{user.address.province}</td>
                  <td>{user.address.country}</td>
                  <td className="d-flex">
                    <Link
                      to={`/view/${user.id}`}
                      className="btn btn-sm btn-info rounded-pill me-1"
                    >
                      View
                    </Link>
                    <Link
                      to={`/update/${user.id}`}
                      className="btn btn-sm btn-primary rounded-pill me-1"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger rounded-pill"
                      onClick={() => handleShow(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center">
          {renderPagination()}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="rounded-pill"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            className="rounded-pill"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
