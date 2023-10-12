import React from "react";
import { Link } from "react-router-dom";
import Topbar from "../Topbar";
import weildy_logo from "../../assets/pictures/Pagenot.png";
import styles from "./PageNotFound.module.css";
const PageNotFound: React.FC = () => (
  <>
    <Topbar />
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <img alt="adani_airport" src={weildy_logo} />
          </div>
          <div className={`gx-app-login-content ${styles["not-found-content"]}`}>
            <br />
            <br />
            <br />
            <br />
            <h1 className={styles["not-found-title"]}>Page Not Found</h1>
            <p className={styles["not-found-description"]}>Sorry, the page you requested could not be found.</p>
            <Link to="/home" className={styles["go-back-link"]}>
              Go back to the homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default PageNotFound;
