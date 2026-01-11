import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap'
import './Header.css'
import { ThemeProvider } from '../../Contexts/ThemeProvider/ThemeProvider'

const LogoutModal = ({ show, onHide }) => {
  const { theme } = useContext(ThemeProvider)

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    onHide()
    window.location.reload()
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      dialogClassName={theme === 'dark' ? 'dark-modal' : ''}
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Logout</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure you want to log out?</p>
        <div className="d-flex justify-content-end actions">
          <button className="btn btn-secondary me-2" onClick={onHide}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default LogoutModal
