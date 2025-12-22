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
      <div className="login-container">
        <h1 className='mb-4 text-center'>Login</h1>
        <form onSubmit={formik.handleSubmit} className='form-fields d-flex gap-3 flex-column'>
          <div className="email-group">
            <input
              type="email"
              name="email_id"
              placeholder="Email"
              className={`form-control py-2 px-4`}
              value={formik.values.email_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email_id && formik.errors.email_id ? (
              <div className="error">{formik.errors.email_id}</div>
            ) : null
            }
          </div>
          <div className="password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder='Password'
              className={`form-control py-2 px-4`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error">{formik.errors.password}</div>
            ) : null
            }
            <span className="password-show" onClick={() => setShowPassword((prev) => !prev)}>
              <i class={`fa-regular fa-eye${showPassword ? '-slash' : ''}`}></i>
            </span>
          </div>
          <button type="submit" className='login-btn p-2'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login