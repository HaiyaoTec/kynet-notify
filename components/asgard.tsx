import {createContext, ReactNode, useContext, useEffect} from "react";
import Asgard from '@imf/asgard-web'

export const asgard = new Asgard('ws://172.25.13.217:9090', typeof window !== 'undefined' ? (localStorage.getItem('user-token') || undefined): undefined, '91978d39c59bd2cd518b22be1f6d9345')
const AsgardContext = createContext<Asgard>(asgard);
export const AsgardProvider = ({children}: { children: ReactNode })=>{
  useEffect(()=>{
    asgard.connect()
    return ()=>{
      asgard.disconnect()
    }
  },[])
  return <AsgardContext.Provider value={asgard}>{children}</AsgardContext.Provider>
}

export const useAsgard = () => {
  return useContext(AsgardContext)
}
