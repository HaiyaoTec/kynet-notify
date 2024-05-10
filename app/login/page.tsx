'use client'
import {title} from "@/components/primitives";
import React from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "@nextui-org/input";
import {Button} from "@nextui-org/button";
import toast from "react-hot-toast";
import {request} from "@/components/lib";
import {useRouter} from "next/navigation";

type Login = {
  account: string
  password: string
}
export default function Page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<Login>()
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()
  const onSubmit: SubmitHandler<Login> = (data) => {
    setLoading(true)
    const res = request('https://skynet.jinuo.me/api/admin/overlord/login', 'POST', data)
    toast.promise(res, {
        error: e => {
          console.log(e)
          return `请求失败: ${e.message}`
        }, loading: '请稍等...', success: (res) => {
          if (res!==200)throw new Error(res.errMsg)
          router.push('/')
          return '登陆成功'
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div>
      <h1 className={title({color: 'violet'})}>skynet-notify</h1>
      <Card className={"mt-32 min-w-[320px]"}>
        <CardHeader>
          <h2 className={title({size: 'sm', color: 'green'})}>Login</h2>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-2'}>
            <Input size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1'}} autoFocus={true}
                   label={'账号:'} variant={'bordered'} {...register("account", {required: true})}/>
            <Input type={'password'} size={'md'} labelPlacement={'outside-left'} classNames={{mainWrapper: 'flex-1'}}
                   label={'密码:'}
                   variant={'bordered'} {...register("password", {required: true})}/>
          </form>
        </CardBody>
        <CardFooter>
          <Button isLoading={loading} color={'primary'} size={'md'} className={'ml-auto'}
                  onClick={handleSubmit(onSubmit)}>登陆</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
