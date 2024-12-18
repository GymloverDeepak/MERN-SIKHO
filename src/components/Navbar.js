import React,{ useEffect }  from 'react';
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  let location = useLocation();
  useEffect(()=>{
console.log(location.pathname)
  },[location])
  return (
    <>
      <nav className="navbar navbar-expand-lg new fixed-top">
        <div className="container-fluid ">
          <a className="navbar-brand" to="#">
            GymloverDeepak
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link nav-spacing ${location.pathname === "/home" ? "active":""}`} aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link nav-spacing ${location.pathname === "/about" ? "active":""}`}  aria-current="page" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
               
              </li>
              <li className="nav-item">
               
              </li>
            </ul>
            <form className="d-flex" role="search">
            <Link className="btn btn-outline-success mx-2" aria-current="page" role="button" to="/signup">
                  SignUp
                </Link>
                <Link className="btn btn-outline-success mx-2" aria-current="page"  role="button" to="/login">
                  Login
                </Link>
             
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
