import Sidebar from '@/components/Sidebar'
import ProtectedRoute from '@/providers/ProtectedRoute'
import React from 'react'

const layout = ({children}) => {
  return (
    <ProtectedRoute>
        <Sidebar/>
        {children}
    </ProtectedRoute>
  )
}

export default layout