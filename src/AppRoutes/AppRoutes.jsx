import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import Login from '../Components/Login/Login'
import PrivateRoutes from './PrivateRoutes'
import Home from '../Components/Home/Home'
import WishList from '../Components/WishList/WishList'
import Cart from '../Components/Cart/Cart'
import ProductDetail from '../Components/ProductDetail/ProductDetail'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<PublicRoutes />}>
                <Route index element={<Login />} />
            </Route>
            <Route path='/home' element={<PrivateRoutes />}>
                <Route index element={<Home/>} />
            </Route>
            <Route path='/wishlist' element={<PrivateRoutes />}>
                <Route index element={<WishList />} />
            </Route>
            <Route path='/cart' element={<PrivateRoutes />}>
                <Route index element={<Cart />} />
            </Route>
            <Route path='/product/:id' element={<PrivateRoutes />}>
                <Route index element={<ProductDetail />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes