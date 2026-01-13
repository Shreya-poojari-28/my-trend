import React, { useState } from 'react'
import './Login.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email_id: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  })

  const formik = useFormik({
    initialValues: {
      email_id: '',
      password: ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: values => {
      console.log('Form data', values)
      navigate('/home')
      sessionStorage.setItem("token", true)
      sessionStorage.setItem("email", values.email_id)
    }
  })
  
  return (
    <div className="login d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg p-4 p-md-5">
        <h2 className="fw-bold text-center mb-4">Welcome Back</h2>
        <p className="text-center text-muted mb-4">Sign in to continue</p>

        <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">

          {/* Email */}
          <div>
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              name="email_id"
              placeholder="Enter email"
              className={`form-control form-control-lg rounded-4 ${formik.touched.email_id && formik.errors.email_id ? 'is-invalid' : ''}`}
              value={formik.values.email_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email_id && formik.errors.email_id && (
              <div className="invalid-feedback">{formik.errors.email_id}</div>
            )}
          </div>

          {/* Password */}
          <div className="password-group">
            <label className="form-label fw-semibold">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter password"
              className={`form-control form-control-lg rounded-4 `}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}

            <span className="password-show">
              <i
                className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={() => setShowPassword(prev => !prev)}
              ></i>
            </span>
          </div>

          <button type="submit" className="btn btn-dark btn-lg rounded-4 mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login