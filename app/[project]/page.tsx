'use client'
import Log, {LogProps} from "@/components/log"
import {request} from "@/components/lib";
import {useEffect, useState} from "react";

export default function Page({ params }: { params: { project: number } }) {
  const {project:curId} = params
  const [logs,setLogs] = useState<LogProps[]>([{
    "accessToken": "e189fe84cc5d4f59b5997169f19ee69b",
    "type": "beta测试",
    "application": "heracles_payment_op",
    "subject": "heracles_payment_op",
    "createTime": 1713768528000,
    "content": "id5金额15000付款人"
  },{
    "accessToken": "e189fe84cc5d4f59b5997169f19ee69b",
    "type": "beta测试",
    "application": "6565",
    "subject": "subject",
    "createTime": 1713768528100,
    "content": "id5金额15000付款人"
  }])
  // const getLog = ()=>{
  //   setLogs([])
  //   request(`http://172.25.5.161:8080/api/main/sky/msg?accessToken=e189fe84cc5d4f59b5997169f19ee69b`,'POST').then((res)=>{
  //     if (res.errCode){
  //       return
  //     }
  //     setLogs(res)
  //   })
  // }
  // useEffect(()=>{
  //   if(curId!==undefined){
  //     getLog()
  //   }
  // },[curId])
  return <div>
    {logs.map((log,index)=><Log key={log.createTime} log={log}/>)}
  </div>
}
