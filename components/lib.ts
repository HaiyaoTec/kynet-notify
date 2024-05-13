import {createContext} from "react";
import {Menu} from "@/components/sidebar";

const request = async (url:string,method:'POST'|'GET',data?: { })=>{
  const returnData = fetch(url, {method: method, body: data?JSON.stringify(data):undefined, headers: {"Content-Type": 'application/json','admin_token':localStorage.getItem('user-token')||''}})
  const response = await returnData
  const json = response.json()
  json.then(res=>{
    if (res.errCode===1){
      localStorage.setItem('user-token','')
    }
  })
  return json
}

const SidebarContext = createContext({sidebar:false,transform:()=>{},curMenu:undefined as Menu|undefined,projectName:'' as string|undefined})

export {request,SidebarContext}

