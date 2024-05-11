'use client'
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {SelectorIcon} from "@nextui-org/shared-icons";
import {useEffect, useLayoutEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {request} from "@/components/lib";
import {useUserToken} from "@/components/token-providers";

export default function Sidebar() {
  const router = useRouter()
  const [projects,setProjects] = useState<{id:number,projectName:string}[]>([])
  const {token} = useUserToken()
  const pathname = usePathname()
  // 正则匹配第一个路径为项目名
  const curId = pathname.match(/\/([^/]+)/)?.[1]
  const selectProject = (id:number) => {
    if (curId===id.toString())return
    const otherPaths = curId?(pathname.split(curId)?.[1]):undefined
    router.push(`/${id}/${otherPaths||'all-warnings'}`)
  }
  
  useEffect(() => {
    if (token){
      request('http://172.25.5.161:8080/api/admin/sky/notify/project','GET').then((res)=>{
        setProjects(res)
      })
    }
  }, [token]);
  const project = projects.find(({id})=>id.toString()===curId)?.projectName||undefined
  if (!project&&projects.length>0) router.push(`/${projects[0].id}/all-warnings`)
  return <div className={'flex-shrink-0 w-[180px]'}>
    <Card className={'h-full'} radius={'none'}>
      <CardHeader>
        <Dropdown placement={'bottom'}>
          <DropdownTrigger>
            <Button className={'w-full h-full p-1 flex justify-around font-bold text-medium'} radius={'sm'} endContent={<SelectorIcon fill={'#000000'}/>} variant={'light'} size={'sm'}>{project}</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="project" variant="flat">
            {projects.map(({id,projectName}) => <DropdownItem  onClick={()=>selectProject(id)} key={id}>{projectName}</DropdownItem>)}
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody>
        <AddAlarm/>
        {[].map((item) => <AlarmItem key={item.id} item={item}/>)}
        <NoticeItem/>
      </CardBody>
    </Card>
  </div>
}
