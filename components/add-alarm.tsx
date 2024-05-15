'use client'
import {Add} from "@/components/icons";
import {Button} from "@nextui-org/button";
import { useDisclosure} from "@nextui-org/modal";
import React, {useLayoutEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {request} from "@/components/lib";
import toast from "react-hot-toast";
import Alarm, {IAlarm} from "@/components/popUps/alarm";

export default function AddAlarm(props:{project:string,getMenus:()=>void}){
  const {project,getMenus} = props;
  const form = useForm<IAlarm>()
  const {reset} = form
  const disclosure = useDisclosure();
  const {isOpen, onOpen, onOpenChange,onClose} = disclosure
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = useState<string | null>(null)
  useLayoutEffect(()=>{
    if(isOpen) {
      reset()
      setError(null)
    }
  }, [isOpen,reset]);
  const onSubmit: SubmitHandler<IAlarm> = (data) => {
    setLoading(true)
    const res = request(`http://172.25.5.161:8080/api/admin/sky/notify/${project}/pipeline`, 'POST', {...data,type:1})
    toast.promise(res, {
        error: e => {
          setError(e.message)
          return `请求失败: ${e.message}`
        }, loading: '请稍等...', success: (res) => {
          if (res.errMsg)throw new Error(res.errMsg)
          setError(null)
          getMenus()
          onClose()
          return '创建成功'
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return <>
    <Button onClick={onOpen} className={'flex justify-between w-full'} radius={'none'} size={'sm'} variant={'light'} color={'default'} endContent={<Add className={'[&_path]:fill-black dark:[&_path]:fill-white'} width={'12px'} height={'12px'}/>}>
      <span className={''}>警告类型</span>
    </Button>
    <Alarm loading={loading} error={error} onSubmit={onSubmit} form={form} disclosure={disclosure} title={'新建聚类'}/>
  </>
}
