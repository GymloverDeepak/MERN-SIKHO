import React, { useEffect, useState ,useContext} from "react";
import { useNavigate ,Link } from "react-router-dom";
import NoteContext from '../Context/notes/NoteContext';
import "./login.css";
import eyeSlashIcon from "../eye-slash.png";
function Login() {
  // let navigate = useNavigate();
  const { userLogin } = useContext(NoteContext);
  useEffect(() => {
    document.body.className = "rootback"; // Apply class directly to <body>
    return () => {
      document.body.className = ""; // Cleanup on unmount
    };
  }, []);

  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    userLogin(loginData)
    // Basic validation

  };
  return (
    <>
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>

          <div className="col-md-6 ">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-6 sign-in-font mb-3">Sign in</h3>
                    <form className="form-md">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          id="email"
                          name="email"
                          value={loginData.username}
                          onChange={handleChange}
                          required
                        />
                        <label for="form_name1">Email ID</label>
                      </div>

                      <div className="form-group position-relative">
                        <input
                          className="form-control"
                          type="password"
                          id="password"
                          name="password"
                          value={loginData.password}
                          placeholder="Password"
                          onChange={handleChange}
                          required
                        />
                        <label for="form_name2">Password</label>
                        <img
                          className="eye-icon"
                          src={eyeSlashIcon}
                          alt="Eye icon"
                          width="20"
                          height="20"
                        />
                      </div>
                      {error && (
                        <p className="error" style={{ color: "red" }}>
                          {error}
                        </p>
                      )}
                      <p className="forgot-password mt-1 text-end">
                        <Link
                          to="/forgotpassword"
                          style={{ textDecoration: "none", color: "#007BFF" }}
                        >
                          Forgot Password?
                        </Link>
                      </p>

                      <div className="form-group mt-5">
                        <button className="button sign-in-btn w-100" type="button" onClick={handleSubmit}>
                          Sign in
                        </button>
                      </div>
                      <p className="sign-up-text mt-2 text-end">
                        Don’t have account?    <Link
                          to="/signup"
                          style={{ textDecoration: "none", color: "#007BFF" }}
                        ><span>
                      Sign Up</span>  </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
