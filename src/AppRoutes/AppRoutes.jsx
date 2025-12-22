import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import Login from '../Components/Login/Login'
import PrivateRoutes from './PrivateRoutes'
import Home from '../Components/Home/Home'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<PublicRoutes />}>
                <Route index element={<Login />} />
            </Route>
            <Route path='/home' element={<PrivateRoutes />}>
                <Route index element={<Home/>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes