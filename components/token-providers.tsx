import {createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState} from "react";
import {useAsgard} from "@/components/asgard";

const TokenContext = createContext<({token:string,setToken:(token:string)=>void})|null>(null);
const useUserToken = () => {
  const token = useContext(TokenContext)
  if (!token) {
    throw new Error(`must be use within TokenContext`)
  }
  return token
}

const TokenProvider = ({children}: { children: ReactNode }) => {
  const [token,setToken ] = useState('')
  const asgard = useAsgard()
  const setValue =(_token:string)=> {
    localStorage.setItem('user-token',_token)
    setToken(_token)
  }
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('user-token')||'');
    };
    
    // 自定义事件，用于在同一页面内监听变化
    window.addEventListener('localStorageChange', handleStorageChange);
    
    // 清理函数
    return () => {
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);
  useLayoutEffect(() => {
    const token = localStorage.getItem('user-token')
    if (token) {
      setToken(token)
    }
  }, []);
  useLayoutEffect(() => {
    if (token) {
      asgard.auth(token)
    }
  }, [token]);
  return <TokenContext.Provider value={{token,setToken:setValue}}>
    {children}
  </TokenContext.Provider>
}

export {useUserToken,TokenProvider}
