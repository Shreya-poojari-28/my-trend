import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import "./LogoutModal.css";
import { ThemeProvider } from "../../Contexts/ThemeProvider/ThemeProvider";
import { FiLogOut } from "react-icons/fi";

const LogoutModal = ({ show, onHide }) => {
  const { theme } = useContext(ThemeProvider);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    onHide();
    window.location.reload();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName={`logout-modal ${theme}`}
      contentClassName="logout-modal-content"
    >
      <Modal.Body className="logout-body">
        <div className="logout-icon-wrapper">
          <FiLogOut className="logout-icon" />
        </div>

        <h5 className="logout-title">Sign out?</h5>

        <p className="logout-text">
          You will be logged out of your account. You can sign in again anytime.
        </p>

        <div className="logout-actions">
          <button className="btn cancel-btn" onClick={onHide}>
            Stay Logged In
          </button>

          <button className="btn danger-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
