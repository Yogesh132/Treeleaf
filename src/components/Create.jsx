import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: {
      city: "",
      district: "",
      province: "",
      country: "Nepal",
    },
  });
  const [errors, setErrors] = useState({});
  const [countryList, setCountryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const countries = res.data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountryList(countries);
      })
      .catch((err) => console.log(err));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!values.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!values.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{7,}$/.test(values.phone)) {
      newErrors.phone =
        "Phone number must be at least 7 digits and only numbers";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      axios
        .post("http://localhost:3000/users", values)
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      const selectedCountry = countryList.find(
        (country) => country.name === value
      );
      setValues({
        ...values,
        address: {
          ...values.address,
          country: selectedCountry ? selectedCountry.name : "",
        },
      });
    } else if (name.startsWith("address")) {
      const addressField = name.split(".")[1];
      setValues({
        ...values,
        address: {
          ...values.address,
          [addressField]: value,
        },
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label">
              Name<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter name"
              value={values.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Enter email"
              value={values.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="phone" className="form-label">
              Phone<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="phone"
              className={`form-control ${errors.phone ? "is-invalid" : ""}`}
              placeholder="Enter phone number"
              value={values.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
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
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-2">
            <label className="form-label">Address:</label>
            <input
              type="text"
              name="address.city"
              className="form-control mb-2"
              placeholder="City"
              value={values.address.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address.district"
              className="form-control mb-2"
              placeholder="District"
              value={values.address.district}
              onChange={handleInputChange}
            />
            <select
              className="form-select mb-2"
              name="address.province"
              value={values.address.province}
              onChange={handleInputChange}
            >
              <option value="">Select Province</option>
              <option value="Province 1">Province 1</option>
              <option value="Province 2">Province 2</option>
              <option value="Bagmati Province">Bagmati Province</option>
              <option value="Gandaki Province">Gandaki Province</option>
              <option value="Province 5">Province 5</option>
              <option value="Karnali Province">Karnali Province</option>
              <option value="Sudurpashchim Province">
                Sudurpashchim Province
              </option>
            </select>
            <select
              className="form-select mb-2"
              name="address.country"
              value={values.address.country}
              onChange={handleInputChange}
            >
              <option value="">Select Country</option>
              {countryList.map((country) => (
                <option key={country.code} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-success">Submit</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Create;
