'use client'
import {title} from "@/components/primitives";
import React, {useLayoutEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import toast from "react-hot-toast";
import {request} from "@/components/lib";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {cn} from "@nextui-org/react";
import {useUserToken} from "@/components/token-providers";

type Login = {
  account: string
  password: string
}
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm<Login>()
  const [loading, setLoading] = React.useState(false)
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  const {token,setToken} = useUserToken()
  const [error, setError] = useState<string | null>(null)
  const onSubmit: SubmitHandler<Login> = (data) => {
    setLoading(true)
    const res = request('http://172.25.5.161:8080/api/admin/overlord/login', 'POST', data)
    toast.promise(res, {
        error: e => {
          setError(e.message)
          return `请求失败: ${e.message}`
        }, loading: '请稍等...', success: (res) => {
          if (res.errMsg)throw new Error(res.errMsg)
          setError(null)
          setToken(res.token)
          return '登陆成功'
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  
  useLayoutEffect(()=>{
    if(isOpen) {
      reset()
      setError(null)
    }
  }, [isOpen,reset]);
  useLayoutEffect(()=>{
    token?onClose():onOpen()
  },[onClose, onOpen, token])
  return (
    <Modal isOpen={isOpen} size={'sm'} onOpenChange={onOpenChange} placement={'auto'} hideCloseButton={true} isDismissable={false}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className={cn("flex flex-col gap-1",title({size: 'sm', color: 'blue'}))} >Log in</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-3'}>
                <Input errorMessage={errors.account?.message} isInvalid={!!errors.account} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1'}} autoFocus={true}
                       label={'账号'} variant={'bordered'} {...register("account", {required: '请输入账号!',})}/>
                <Input  type={'password'} errorMessage={errors.password?.message} isInvalid={!!errors.password} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1'}}
                       label={'密码'}
                       variant={'bordered'} {...register("password", {required: '请输入密码!'})}/>
                {error&&!loading && <p className={'text-red-500'}>{error}</p>}
              </form>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} color={'primary'} size={'md'} className={'ml-auto'}
                      onClick={handleSubmit(onSubmit)}>Sign in</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
