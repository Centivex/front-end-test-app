import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../../ui/Navbar'
import { ProductListPage } from '../pages/ProductListPage'
import { ProductDetailsPage } from '../pages/ProductDetailsPage'

export const FrontEndTestRoutes = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/list" element={<ProductListPage />} />
        <Route path="/list/:id" element={<ProductDetailsPage />} />
        <Route path="/*" element={<Navigate to="/list" />} />
      </Routes>
    </>
  )
}

