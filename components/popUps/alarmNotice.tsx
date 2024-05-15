'use client'
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {cn} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import React, {useContext, useLayoutEffect} from "react";
import { UseDisclosureReturn} from "@nextui-org/use-disclosure";
import {UseFormReturn} from "react-hook-form/dist/types";
import {SubmitHandler} from "react-hook-form";
import {request, SidebarContext} from "@/components/lib";
import AceEditor from "react-ace";
export interface IAlarmNotice {
  body:string
}
export default function AlarmNotice(props:{disclosure:UseDisclosureReturn,form: UseFormReturn<IAlarmNotice>,onSubmit:SubmitHandler<IAlarmNotice>,error:string|null,loading:boolean,title:string,id?:number}){
  const {disclosure,form,onSubmit,error,loading,title,id} = props
  const {isOpen,onOpenChange} = disclosure
  const {curProject} = useContext(SidebarContext)
  
  const {register,handleSubmit,reset,formState:{errors}} = form
  const [loadingBody, setLoadingBody] = React.useState(false)
  useLayoutEffect(() => {
    if (isOpen){
      if(id) {
        setLoadingBody(true)
        request(`http://172.25.5.161:8080/api/admin/sky/notify/${curProject?.id}/template/${id}`, 'GET').then(res => {
          form.setValue('body', res)
        }).finally(() => {
          setLoadingBody(false)
        })
      }else {
        form.setValue('body', 'title: 充值接口异常告警\n' +
          '# 渠道信息\n' +
          'channel: \n' +
          '  dingtalk:\n' +
          '    token: xxxxxxxxxxx \n' +
          '  phone:\n' +
          '    - "12938292834" #赵日天\n' +
          '    - "16253536232" #王诛仙\n' +
          '  sms:\n' +
          '    - "12938292834" #赵日天\n' +
          '    - "16253536232" #王诛仙\n' +
          '  telegram:\n' +
          '    groupId: xxxxxxxxx\n' +
          '    token: xxxxxxx\n' +
          '# 聚类ID\n' +
          'clusterId: 1\n' +
          '# 触发策略\n' +
          'triggle: \n' +
          '  filter:\n' +
          '    - $1 > 2000\n' +
          '    - $2 == "recharge"\n' +
          '  rate: \n' +
          '    period: 5m\n' +
          '    threshold: 5\n' +
          '# 通知信息模版\n' +
          'template: "#[{type}]{subject}\\n{content}"')
      }
    }
    if (!isOpen){
      reset()
    }
  }, [id,isOpen]);
  return  <Modal isOpen={isOpen} size={'2xl'} onOpenChange={onOpenChange} placement={'auto'} className={'z-[200]'}>
    <ModalContent>
      {() => (
        <>
          <ModalHeader className={cn("flex flex-col")}>{title}通知</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className={'flex flex-col gap-y-3 '}>
              {loadingBody||<AceEditor
                placeholder='输入模版'
                mode="yaml"
                theme="monokai"
                fontSize={14}
                lineHeight={19}
                showPrintMargin={true}
                showGutter={true}
                value={form.getValues('body')}
                onChange={(value)=>form.setValue('body',value)}
                highlightActiveLine={true}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}/>}
              {/*{loadingBody||<Input errorMessage={errors.body?.message} isInvalid={!!errors.body} size={'md'}*/}
              {/*        labelPlacement={'outside-left'}*/}
              {/*        classNames={{mainWrapper: 'flex-1', label: 'min-w-[90px] text-right', helperWrapper: ''}}*/}
              {/*        autoFocus={false}*/}
              {/*        variant={'bordered'} {...register("body")}/>}*/}
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
