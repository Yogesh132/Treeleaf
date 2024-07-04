import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update() {
  const { id } = useParams();
  const [values, setValues] = useState({
    id: id,
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((res) => {
        setValues({
          ...values,
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          dob: res.data.dob,
          address: res.data.address,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!values.name) errors.name = "Name is required";
    if (!values.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(values.email))
      errors.email = "Email is invalid";
    if (!values.phone) errors.phone = "Phone number is required";
    else if (!/^\d{7,}$/.test(values.phone))
      errors.phone = "Phone number must be at least 7 digits";
    if (!values.dob) errors.dob = "Date of birth is required";
    if (!values.address) errors.address = "Address is required";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .put("http://localhost:3000/users/" + id, values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h1>Update User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter phone number"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
            {errors.phone && (
              <span className="text-danger">{errors.phone}</span>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="form-control"
              value={values.dob}
              onChange={(e) => setValues({ ...values, dob: e.target.value })}
            />
            {errors.dob && <span className="text-danger">{errors.dob}</span>}
          </div>
          <div className="mb-2">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter address"
              value={values.address}
              onChange={(e) =>
                setValues({ ...values, address: e.target.value })
              }
            />
            {errors.address && (
              <span className="text-danger">{errors.address}</span>
            )}
          </div>
          <button className="btn btn-info">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Update;
