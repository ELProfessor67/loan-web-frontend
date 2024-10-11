'use client'
import { loadUserRequest } from '@/http';
import { createContext, useEffect, useState} from 'react'


export const UserContext = createContext();


export const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(undefined);

    async function loadUser() {
        try {
            setIsLoading(true)
            const {data} = await loadUserRequest();
            setIsAuth(true);
            setUser(data.user);
            setIsLoading(false)
        } catch (error) {
            console.error(error?.response?.data?.message);
            setIsAuth(false);
            setIsLoading(false)
        }
    }
    useEffect(() => {
        loadUser()
    },[])

    return<UserContext.Provider value={{isAuth,setIsAuth,user,setUser,isLoading,setIsLoading,loadUser}}>
        {children}
    </UserContext.Provider>
}