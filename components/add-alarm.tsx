'use client'
import {Add} from "@/components/icons";
import {Button} from "@nextui-org/button";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import React, {useLayoutEffect, useState} from "react";
import {cn} from "@nextui-org/react";
import {title} from "@/components/primitives";
import {Input, Textarea} from "@nextui-org/input";
import {SubmitHandler, useForm} from "react-hook-form";
import {request} from "@/components/lib";
import toast from "react-hot-toast";
interface Alarm {
  "title": string,
  "typeMatch": string, //type匹配
  "contentMatch": string,
  "weight": string, //权重
  "type":1
}
export default function AddAlarm(props:{project:string,getMenus:()=>void}){
  const {project,getMenus} = props;
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<Alarm>()
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = useState<string | null>(null)
  useLayoutEffect(()=>{
    if(isOpen) {
      reset()
      setError(null)
    }
  }, [isOpen,reset]);
  const onSubmit: SubmitHandler<Alarm> = (data) => {
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
    <Modal isOpen={isOpen} size={'md'} onOpenChange={onOpenChange} placement={'auto'} >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className={cn("flex flex-col")}>新建聚类</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-3 '}>
                <Input errorMessage={errors.title?.message} isInvalid={!!errors.title} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={true}
                       label={'标题'} variant={'bordered'} {...register("title", {required: '请输入标题!',})}/>
             <Input errorMessage={errors.typeMatch?.message} isInvalid={!!errors.typeMatch} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={false}
                       label={'Type匹配'} variant={'bordered'} {...register("typeMatch", {required: '请输入Type匹配!',})}/>
             <Textarea errorMessage={errors.contentMatch?.message} isInvalid={!!errors.contentMatch} size={'md'} labelPlacement={'outside-left'}  classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right',helperWrapper:''}} autoFocus={false}
                       label={'Content匹配'} variant={'bordered'} {...register("contentMatch", {required: '请输入Content匹配!',})}/>
             <Input errorMessage={errors.weight?.message} isInvalid={!!errors.weight} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={false}
                       label={'权重'} variant={'bordered'} {...register("weight", {required: '请输入标题!',})}/>
                {error&&!loading && <p className={'text-red-500'}>{error}</p>}
              </form>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} color={'primary'} size={'md'} className={'ml-auto'}
                      onClick={handleSubmit(onSubmit)}>提交</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
}
