'use client'
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { UserContext } from './UserProvider';

const ProtectedRoute = ({children}) => {
    const {isAuth} = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if(isAuth == false){
            router.push('/login')
        }
    },[isAuth])
  return (
    children
  )
}

export default ProtectedRoute