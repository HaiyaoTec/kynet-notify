'use client'
import {ComeBackIcon, DelIcon, EditIcon, FilterIcon, MenuIcon, MockIcon} from "@/components/icons";
import React, {createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {useIsMobile} from "@nextui-org/use-is-mobile";
import Mock, {IMock} from "@/components/popUps/mock";
import {useDisclosure} from "@nextui-org/modal";
import {set, SubmitHandler, useForm} from "react-hook-form";
import Match, {IMatch} from "@/components/popUps/match";
import {request, SidebarContext} from "@/components/lib";
import toast from "react-hot-toast";
import {Edit} from "@nextui-org/shared-icons";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";
import Alarm, {IAlarm} from "@/components/popUps/alarm";
export const MatchContext = createContext<IMatch|undefined>({
  contentMatch: "",
  type: ""
})

export const MockContext = createContext<IMock|undefined>(undefined)

export const Navbar = ({children}: { children: ReactNode }) => {
	  const {transform,curMenu,curProject,refresh} = useContext(SidebarContext)
	  const isMobile = useIsMobile()
    const [match,setMatch] = useState<IMatch>()
    const disclosureMock = useDisclosure();
    const formMock = useForm<IMock>()
  const router = useRouter()
    const [create,setCreate] = useState<IMock>()
    const onSubmitMock = (data:IMock)=>{
      const res = request(`http://172.25.5.161:8080/api/admin/sky/notify/${curProject?.id}/mock?accessToken=${curProject?.accessToken}`, 'POST', {...data,accessToken:curProject?.accessToken,application:'mock',"subject": "subject", createTime: Math.floor(new Date().getTime()/1000)})
      toast.promise(res,{
        error: e => {
          return `创建失败: ${e.message}`
        }, loading: '请稍等...', success: (res) => {
          if (res.errMsg)throw new Error(res.errMsg)
          disclosureMock.onClose()
          formMock.reset()
          setTimeout(()=>{
            setCreate(data)
          },1000)
          return '创建成功'
        }
      })
    }
  
  const disclosureMatch = useDisclosure();
  const formMatch = useForm<IMatch>()
  const onSubmitMatch = (data:IMatch)=>{
    setMatch(data)
    disclosureMatch.onClose()
  }
  
  useEffect(() => {
    if (disclosureMatch.isOpen&&match){
       formMatch.setValue('contentMatch',match?.contentMatch)
        formMatch.setValue('type',match?.type)
    }
  }, [disclosureMatch.isOpen, formMatch, match]);
  
  const [isOpen, setIsOpen] = React.useState(false);
  
  const del = (id:number)=>{
    setIsOpen(false)
    const res = request(`http://172.25.5.161:8080/api/admin/sky/notify/${curProject?.id}/pipeline/${id}`, 'DELETE')
    toast.promise(res,{
      error: e => {
        return `删除失败: ${e.message}`
      }, loading: '请稍等...', success: (res) => {
        if (res.errMsg)throw new Error(res.errMsg)
        refresh()
        router.push('./-1')
        return '删除成功'
      }
    })
  }
  
  const disclosureAlarm = useDisclosure({onClose() {
    formAlarm.reset()
    }});
  const formAlarm = useForm<IAlarm>()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = useState<string | null>(null)
  const onSubmitAlarm: SubmitHandler<IAlarm> = (data) => {
    const res = request(`http://172.25.5.161:8080/api/admin/sky/notify/${curProject?.id}/pipeline`, 'POST', {...data,type:1,id:curMenu?.id})
    toast.promise(res, {
        error: e => {
          setError(e.message)
          return `请求失败: ${e.message}`
        }, loading: '请稍等...', success: (res) => {
          if (res.errMsg)throw new Error(res.errMsg)
          setError(null)
          refresh()
          disclosureAlarm.onClose()
          return '修改成功'
        }
      })
      .finally(() => {
      })
  }
  const edit = ()=>{
    formAlarm.setValue('title',curMenu?.title!)
    formAlarm.setValue('typeMatch',curMenu?.typeMatch!)
    formAlarm.setValue('contentMatch',curMenu?.contentMatch!)
    formAlarm.setValue('weight',curMenu?.weight! as any)
    disclosureAlarm.onOpen()
  }
  return <>
		<div className={'w-full h-[48px] flex items-center justify-between bg-content1 px-4 flex-shrink-0'}>
			<div className={'font-bold sm:font-medium flex gap-x-4 items-center'}><MenuIcon className={'[&_path]:fill-black dark:[&_path]:fill-white cursor-pointer sm:hidden'} width={'22px'} height={'22px'} onClick={transform}/>{isMobile?curProject?.projectName:curMenu?.title}</div>
			<div className={'flex items-center gap-x-4 flex-row-reverse'}>
				<ComeBackIcon className={'[&_path]:fill-blue-600 cursor-pointer sm:block hidden'} width={'22px'} height={'22px'} onClick={transform}/>
        {
          curMenu?.type===0&&<>
            <FilterIcon className={'[&_path]:fill-black dark:[&_path]:fill-white cursor-pointer sm:block hidden'} width={'20px'} height={'20px'} onClick={disclosureMatch.onOpen}/>
            <MockIcon className={'[&_path]:fill-black dark:[&_path]:fill-white cursor-pointer sm:block  hidden'} width={'22px'} height={'22px'} onClick={disclosureMock.onOpen}/></>
        }
        {
          curMenu?.type===1&&<>
            <Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} placement={'bottom'} showArrow={true}>
              <PopoverTrigger>
               <div>
                 <DelIcon className={'[&_path]:fill-black dark:[&_path]:fill-white cursor-pointer sm:block  hidden'} width={'22px'} height={'22px'} />
               </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">确认删除这条告警类型吗？</div>
                  <div className="mt-4 flex justify-end gap-x-2">
                    <Button size={'sm'} onClick={()=>setIsOpen(false)}>取消</Button>
                    <Button color={'primary'} size={'sm'} onClick={()=>del(curMenu?.id)}>确认</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <EditIcon className={'[&_path]:fill-black dark:[&_path]:fill-white cursor-pointer sm:block hidden'} width={'22px'} height={'22px'} onClick={()=>edit()}/>
          </>
        }
			</div>
        <Mock disclosure={disclosureMock} form={formMock} onSubmit={onSubmitMock}/>
        <Match disclosure={disclosureMatch} form={formMatch} onSubmit={onSubmitMatch}/>
        <Alarm disclosure={disclosureAlarm} form={formAlarm} onSubmit={onSubmitAlarm} error={error} loading={loading} title={'编辑聚类'}/>
		</div>
    <MatchContext.Provider value={curMenu?.type===0?match:undefined}>
      <MockContext.Provider value={create}>
        {children}
      </MockContext.Provider>
    </MatchContext.Provider>
  </>
};
