import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {cn} from "@nextui-org/react";
import {Input, Textarea} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import React from "react";
import { UseDisclosureReturn} from "@nextui-org/use-disclosure";
import {UseFormReturn} from "react-hook-form/dist/types";
import {SubmitHandler} from "react-hook-form";
export interface IMock {
  "accessToken": string,
  "type": string,
  "application": string,
  "subject": string,
  "createTime": number,
  "content": string
}
export default function Mock(props:{disclosure:UseDisclosureReturn,form: UseFormReturn<IMock>,onSubmit:SubmitHandler<IMock>}){
  const {disclosure,form,onSubmit} = props
  const {isOpen,onOpenChange} = disclosure
  const {register,handleSubmit,reset,formState:{errors}} = form
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  return  <Modal isOpen={isOpen} size={'md'} onOpenChange={onOpenChange} placement={'auto'} >
    <ModalContent>
      {() => (
        <>
          <ModalHeader className={cn("flex flex-col")}>Mock警告</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-3 '}>
              <Input errorMessage={errors.type?.message} isInvalid={!!errors.type} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right'}} autoFocus={true}
                     label={'type'} variant={'bordered'} {...register("type", {required: '请输入type!',})}/>
              <Textarea errorMessage={errors.content?.message} isInvalid={!!errors.content} size={'md'} labelPlacement={'outside-left'}  classNames={{mainWrapper: 'flex-1',label:'min-w-[90px] text-right',helperWrapper:''}} autoFocus={false}
                        label={'Content'} variant={'bordered'} {...register("content", {required: '请输入Content!',})}/>
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
