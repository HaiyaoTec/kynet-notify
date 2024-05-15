'use client'
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {cn, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {SelectorIcon} from "@nextui-org/shared-icons";
import {ReactNode, useEffect, useLayoutEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {request, SidebarContext, UnreadContext} from "@/components/lib";
import {useUserToken} from "@/components/token-providers";
import AddAlarm from "./add-alarm";
import NoticeItem from "./notice-item";
import AlarmItem from "./alarm-item";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import {useDisclosure} from "@nextui-org/modal";
import {useLocalStorageState} from "ahooks";
export interface Menu {
  id:number,title:string,type:number,weight:number,typeMatch:string,contentMatch:string,
  unread?:number
}
export interface Project{id:number,projectName:string,accessToken:string}
export default function Sidebar({children}: { children: ReactNode }) {
  const router = useRouter()
  const isMobile = useIsMobile()
  const {isOpen,onOpen,onClose} = useDisclosure()
  useLayoutEffect(() => {
    isMobile?onClose():onOpen()
  }, [isMobile]);
  // console.log(sidebar)
  const [projects,setProjects] = useState<Project[]>([])
  const [menus,setMenus] = useState<Menu[]>([])
  const {token} = useUserToken()
  const pathname = usePathname()
  // 正则匹配第一个路径为项目名
  const curId = pathname.match(/\/([^/]+)/)?.[1]
  // 正则匹配第二个路径为报警id
  const alarmId = pathname.match(/\/[^/]+\/([^/]+)/)?.[1]
  
  const selectProject = (id:number) => {
    if (curId===id.toString())return
    const paths = pathname.split('/')
    paths[1] = id.toString()
    router.push(paths.join('/'))
  }
  useEffect(() => {
    if (token){
      request('http://172.25.5.161:8080/api/admin/sky/notify/project','GET').then((res)=>{
        if (res.errCode===undefined){
          setProjects(res)
        }
      })
    }
  }, [token]);
  const project = projects.find(({id})=>id.toString()===curId)
  const curMenu = menus.find(({id})=>id.toString()===alarmId)
  let href = ''
  if (!project&&projects.length>0) {
    href += `/${projects[0].id}`
  }
  if (!curMenu&&menus.length>0&&!pathname.includes('notice')) {
    href += `/${menus[0].id}`
  }
  if (href!=='') {
    router.push(href)
  }
  
  const getMenus = ()=>{
    setMenus([])
    request(`http://172.25.5.161:8080/api/admin/sky/notify/${curId}/pipeline/list`,'GET').then((res)=>{
      if (res.errCode===undefined){
        // res 按照 weight 排序 大的在前面
        res.sort((a:Menu,b:Menu)=>b.weight-a.weight)
        setMenus([{
          contentMatch: "", id: -1, title: "全部告警", type: 0, typeMatch: "", weight: -1
        },...res])
      }
    })
  }
  useEffect(()=>{
     if(curId!==undefined){
       getMenus()
     }
  },[curId,token])
  const startTimes = useLocalStorageState<Record<string, {startTime:number,unread:number}>>('startTimes',{defaultValue:{}})
 
  return <SidebarContext.Provider value={{curProject:project,sidebar:isOpen,transform:isOpen?onClose:onOpen, curMenu,refresh:getMenus}}>
    <UnreadContext.Provider value={startTimes}>
    {isMobile&&<div onClick={onClose} className={cn('fixed z-[90] sm:z-0 w-[100vw] h-full bg-overlay/50  top-0 left-0 transition-opacity',isOpen?'opacity-100 pointer-events-auto':'opacity-0 pointer-events-none')}/>}
    <div className={cn('flex-shrink-0 border-r z-[100] sm:z-[0]  fixed h-full transition-transform  sm:transition-width  sm:relative',isOpen?'translate-x-0 w-[180px]':'-translate-x-full sm:w-0')}>
      <Card className={'h-full '} radius={'none'}>
        <CardHeader className={'border-b  py-2'}>
          <Dropdown placement={'bottom'}>
            <DropdownTrigger>
              <Button className={'w-full h-full p-1 flex justify-around font-bold text-medium '} radius={'sm'} endContent={<SelectorIcon fill={'#000000'}/>} variant={'light'} size={'sm'}>{project?.projectName??'-'}</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="project" variant="flat">
              {projects.map(({id,projectName}) => <DropdownItem  onClick={()=>selectProject(id)} key={id}>{projectName}</DropdownItem>)}
            </DropdownMenu>
          </Dropdown>
        </CardHeader>
        <CardBody className={'flex gap-y-1 px-0 pt-0'}>
          <div className={'border-b'}>
            <AddAlarm getMenus={getMenus} project={curId!}/>
            {menus.map((item) => <AlarmItem  key={item.id} menu={item}/>)}
          </div>
          <NoticeItem/>
        </CardBody>
      </Card>
    </div>
    {children}
    </UnreadContext.Provider>
  </SidebarContext.Provider>
}
