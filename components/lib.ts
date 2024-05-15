import {createContext} from "react";
import {Menu, Project} from "@/components/sidebar";

const request = async (url:string,method:'POST'|'GET'|'DELETE',data?: { })=>{
  const returnData = fetch(url, {method: method, body: data?JSON.stringify(data):undefined, headers: {"Content-Type": 'application/json','admin_token':localStorage.getItem('user-token')||''}})
  const response = await returnData
  if (response.headers.get('Content-Length')==='0'){
      return response
  }
  if (response.headers.get('Content-Type')?.includes('text/plain;charset=UTF-8')){
    return response.text()
  }
  const json = response.json()
  json.then(res=>{
    if (res.errCode===1){
      localStorage.setItem('user-token','')
    }
  })
  return json
}

const SidebarContext = createContext({sidebar:false,transform:()=>{},curMenu:undefined as Menu|undefined,curProject:undefined as Project|undefined,refresh:()=>{}})
const UnreadContext = createContext<any>({})
export {request,SidebarContext,UnreadContext}

