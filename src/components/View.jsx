import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function View() {
  const { id } = useParams();
  const [Data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h3>User Detail</h3>
        <div className=" text-white">
          <p>ID: {Data.id}</p>
          <p>Name: {Data.name}</p>
          <p>Email: {Data.email}</p>
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default View;
