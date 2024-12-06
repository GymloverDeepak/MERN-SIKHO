import React, { useState } from "react";
import eyeSlashIcon from "../eye-slash.png";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    wallet: "",
    password: "",
  });

  const SECRET_KEY = "your-secret-key"; // Replace with a strong secret key

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset the form
    setFormData({
      name: "",
      email: "",
      phone: "",
      wallet: "",
      password: "",
    });
  };

  return (
    <div className="container-fluid">
      <div className="row no-gutter">
        <div className="col-md-6 d-none d-md-flex bg-image"></div>

        <div className="col-md-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 col-xl-7 mx-auto">
                  <h3 className="display-6 sign-in-font mb-3">Create Account</h3>
                  <form className="form-md" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        id="form_name1"
                        className="form-control"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="form_name1">Name</label>
                    </div>
                    <div className="form-group">
                      <input
                        id="form_email"
                        className="form-control"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="form_email">Email ID</label>
                    </div>

                    <div className="form-group">
                      <input
                        id="form_phone"
                        className="form-control"
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="form_phone">Phone number</label>
                    </div>
                    <div className="form-group">
                      <input
                        id="form_wallet"
                        className="form-control"
                        type="text"
                        name="wallet"
                        value={formData.wallet}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="form_wallet">Wallet Name</label>
                    </div>
                    <div className="form-group position-relative">
                      <input
                        id="form_password"
                        className="form-control"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="form_password">Password</label>
                      <img
                        className="eye-icon"
                        src={eyeSlashIcon}
                        alt="Eye icon"
                        width="20"
                        height="20"
                      />
                    </div>

                    <div className="form-group mt-5">
                      <button type="submit" className="button sign-in-btn w-100">
                        Next
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
