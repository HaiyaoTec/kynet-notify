'use client'
import Log, {LogProps} from "@/components/log"
import {useContext, useEffect, useRef, useState} from "react";
import {useUserToken} from "@/components/token-providers";
import {request, SidebarContext, UnreadContext} from "@/components/lib";
import { Spinner } from "@nextui-org/react";
import {useInfiniteScroll} from "ahooks";
import {MatchContext, MockContext} from "@/components/navbar";

export default function Page({ params }: { params: { project: number,alarmId:number } }) {
  const {project:curId,alarmId} = params
  const {token} = useUserToken()
  const {curProject} = useContext(SidebarContext)
  const match = useContext(MatchContext)
  const mock = useContext(MockContext)
  const [startTimes,setStartTimes] = useContext(UnreadContext)
  
  const getLog = async (page:number)=>{
    const res = await request(`http://172.25.5.161:8080/api/admin/sky/notify/msg?accessToken=${curProject?.accessToken}${Number(alarmId)===-1?'':`&pipelineId=${alarmId}`}&count=20&page=${page}${match?.type?`&type=${match?.type}`:''}${match?.contentMatch?`&contentMatch=${match.contentMatch}`:''}`,'GET')
    res.list = res.items
    return res
  }
  const ref = useRef<HTMLDivElement>(null);
  const { data, loading, loadingMore, loadMore,reloadAsync } = useInfiniteScroll<{list:LogProps[],totalCount:number,curPage:number,items:LogProps[]}>(
    (d) => getLog((d?.curPage??0)+1),
    {
      target: ref,
      isNoMore: (d) => d?.list.length=== d?.totalCount,
      manual: true,
    },
  );
  useEffect(()=>{
    if(curProject?.accessToken!==undefined&&alarmId!==undefined&&token){
      reloadAsync()
    }
  },[curProject, alarmId, token, reloadAsync,match,mock])
  
  useEffect(() => {
    if ((data?.list.length??0)>0){
      setStartTimes((prev:any)=>{
        return {...prev,[`${curProject?.id}+${alarmId}`]:{unread:0,startTime:Date.now()}}
      })
    }
  }, [data]);
  return <div className={'overflow-auto max-h-[calc(100vh_-_48px)]'} ref={ref} >
    <div className={'w-full top-0'}>
      {data?.list.map((log, index)=><Log key={index+log.time} log={log}/>)}
    </div>
    {(loading||loadingMore)?<Spinner label="Loading..." color="warning" className={'mx-auto w-full p-1 border-t'}/>:data?.list.length===0?<div className={'text-center text-gray-500 border-t'}>暂无数据</div>:null}
    
  </div>
}
