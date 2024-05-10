import {createContext, ReactNode, useContext, useState} from "react";

const TokenContext = createContext<({token:string,setToken:(token:string)=>void})|null>(null);
const useUserToken = () => {
  const token = useContext(TokenContext)
  if (!token) {
    throw new Error(`must be use within TokenContext`)
  }
  return token
}

const TokenProvider = ({children}: { children: ReactNode }) => {
  const [token,setToken ] = useState(localStorage.getItem('user-token') || '')
  const setValue =()=> {
    localStorage.setItem('user-token',token)
    setToken(token)
  }
  return <TokenContext.Provider value={{token,setToken:setValue}}>
    {children}
  </TokenContext.Provider>
}

export {useUserToken,TokenProvider}
