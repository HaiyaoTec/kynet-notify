'use client'
import {Chip} from "@nextui-org/chip";
import {Menu} from "@/components/sidebar";
import {Button} from "@nextui-org/button";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@nextui-org/react";
import {useContext, useEffect, useState} from "react";
import {request, SidebarContext, UnreadContext} from "@/components/lib";
import {useLocalStorageState} from "ahooks";

export default function AlarmItem(props:{menu:Menu}){
  const {title,id} = props.menu
  const pathname = usePathname()
  const {curProject} = useContext(SidebarContext)
  const router = useRouter()
  const alarmId = pathname.match(/\/[^/]+\/([^/]+)/)?.[1]
  const [startTimes,setStartTimes] = useContext(UnreadContext)
  const goHref = (id:number)=>{
    if (Number(alarmId)===id)return
    router.push(`./${id}`)
  }
  useEffect(() => {
    if (curProject){
      const startTime = (startTimes[`${curProject?.id}+${id}`]?.startTime)?startTimes[`${curProject?.id}+${id}`].startTime:Date.now()
      request(`http://172.25.5.161:8080/api/admin/sky/notify/msg?accessToken=${curProject?.accessToken}${Number(id)===-1?'':`&pipelineId=${id}`}&count=1&page=1&startTime=${startTime}`,'GET')
        .then((res)=>{
          setStartTimes((prev:any)=>{
            return {...prev,[`${curProject?.id}+${id}`]:{unread:res.totalCount,startTime}}
          })
        })
    }
  }, [curProject]);
  
  return <Button onClick={()=>goHref(id)} radius={'none'} variant={'light'} className={cn('w-full flex justify-between pl-8 ',Number(alarmId)===id?'bg-default/40':'')}>
    <span className={'text-sm'}>{title}</span>{startTimes[`${curProject?.id}+${id}`]?.unread>0?<Chip size={'sm'} className={'text-white min-w-9'} color={'warning'}>{startTimes[`${curProject?.id}+${id}`]?.unread}</Chip>:null}
  </Button>
}
