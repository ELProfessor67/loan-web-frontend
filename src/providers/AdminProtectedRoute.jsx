'use client'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserProvider';

const AdminProtectedRoute = ({children}) => {
    const {isAuth,user} = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if(isAuth == false){
            router.push('/login')
        }
        if(user?.role == 'user'){
            router.push('/dashboard')
        }
    },[isAuth,user])
  return (
    children
  )
}

export default AdminProtectedRoute