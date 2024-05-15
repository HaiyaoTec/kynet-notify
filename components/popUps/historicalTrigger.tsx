import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {cn, Spinner} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {useContext, useEffect, useLayoutEffect, useRef, useState} from "react";
import { UseDisclosureReturn} from "@nextui-org/use-disclosure";
import {request, SidebarContext} from "@/components/lib";
import {useInfiniteScroll} from "ahooks";
import Log, {LogProps} from "@/components/log";
export interface IMock {
  "accessToken": string,
  "type": string,
  "application": string,
  "subject": string,
  "createTime": number,
  "content": string
}
export default function HistoricalTrigger(props:{disclosure:UseDisclosureReturn,id?:number}){
  const {curProject} = useContext(SidebarContext)
  const {disclosure,id} = props
  const {isOpen,onOpenChange,onClose} = disclosure
  const getLog = async (page:number)=>{
    const res = await request(`http://172.25.5.161:8080/api/admin/sky/notify/history?accessToken=${curProject?.accessToken}&count=20&page=${page}&templateId=${id}`,'GET')
    res.list = res.items
    return res
  }
  const ref = useRef<HTMLDivElement>(null);
  const { data, loading, loadingMore, loadMore,reloadAsync,cancel } = useInfiniteScroll<{list:LogProps[],totalCount:number,curPage:number,items:LogProps[]}>(
    (d) => getLog((d?.curPage??0)+1),
    {
      target: ref,
      isNoMore: (d) => d?.list.length=== d?.totalCount,
      manual: true,
    },
  );
  useLayoutEffect(() => {
    if (isOpen&&id!==undefined) {
      reloadAsync()
    }
    if (!isOpen) {
      cancel()
    }
  }, [id,isOpen]);
  return  <Modal isOpen={isOpen} size={'2xl'} onOpenChange={onOpenChange} placement={'auto'} >
    <ModalContent>
      {() => (
        <>
          <ModalHeader className={cn("flex flex-col")}>触发历史</ModalHeader>
          <ModalBody>
            <div className={'overflow-auto max-h-[50vh] rounded-[6px]'} ref={ref} >
              <div className={'w-full top-0'}>
                {data?.list.map((log, index)=><Log key={index+log.time} log={log}/>)}
              </div>
              {(loading||loadingMore)?<Spinner label="Loading..." color="warning" className={'mx-auto w-full p-1 border-t'}/>:data?.list.length===0?<div className={'text-center text-gray-500 border-t'}>暂无数据</div>:null}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color={'primary'} size={'md'} className={'ml-auto'}
                    onClick={onClose}>关闭</Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  </Modal>
}
