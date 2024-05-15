import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {cn} from "@nextui-org/react";
import {Input, Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import React from "react";
import { UseDisclosureReturn} from "@nextui-org/use-disclosure";
import {UseFormReturn} from "react-hook-form/dist/types";
import {SubmitHandler} from "react-hook-form";
export interface IAlarm {
  "title": string,
  "typeMatch": string, //type匹配
  "contentMatch": string,
  "weight": string, //权重
  "type":1
}
export default function Alarm(props:{disclosure:UseDisclosureReturn,form: UseFormReturn<IAlarm>,onSubmit:SubmitHandler<IAlarm>,error:string|null,loading:boolean,title:string}){
  const {disclosure,form,onSubmit,error,loading,title} = props
  const {isOpen,onOpenChange} = disclosure
  const {register,handleSubmit,reset,formState:{errors}} = form
  return  <Modal isOpen={isOpen} size={'md'} onOpenChange={onOpenChange} placement={'auto'} className={'z-[200]'}>
    <ModalContent>
      {() => (
        <>
          <ModalHeader className={cn("flex flex-col")}>{title}</ModalHeader>
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
}
