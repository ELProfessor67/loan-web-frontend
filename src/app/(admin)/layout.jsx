import AdminSidebar from '@/components/AdminSidebar'
import Sidebar from '@/components/Sidebar'
import AdminProtectedRoute from '@/providers/AdminProtectedRoute'
import React from 'react'

const layout = ({children}) => {
  return (
    <AdminProtectedRoute>
        <AdminSidebar/>
        {children}
    </AdminProtectedRoute>
  )
}

export default layout