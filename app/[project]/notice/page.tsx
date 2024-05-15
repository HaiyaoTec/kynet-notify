'use client'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  getKeyValue,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/react";
import React, {useContext, useLayoutEffect, useState} from "react";
import {request, SidebarContext} from "@/components/lib";
import {Button} from "@nextui-org/button";
import { VerticalDotsIcon } from "@/components/icons";
import toast from "react-hot-toast";
import HistoricalTrigger from "@/components/popUps/historicalTrigger";
import {useDisclosure} from "@nextui-org/modal";
import AlarmNotice, {IAlarmNotice} from "@/components/popUps/alarmNotice";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAlarm} from "@/components/popUps/alarm";

export interface DingTalk {
  token: string;
}

export interface Channel {
  dingTalk: DingTalk;
  phone?: any;
  sms: string[];
  telegram?: any;
}

export interface PipelineInfo {
  title: string;
  id: number;
  type: number;
  weight: number;
  typeMatch: string;
  contentMatch: string;
}

export interface Rate {
  period: string;
  threshold: number;
}

export interface TriggerRule {
  filter: string[];
  rate: Rate;
}

export interface Notification {
  id: number;
  title: string;
  channel: Channel;
  template: string;
  pipelineId: number;
  pipelineInfo: PipelineInfo;
  triggerRule: TriggerRule;
}

const columns = [
  {
    key: "title",
    label: "标题",
  },
  {
    key: "channel",
    label: "推送渠道",
  },
  {
    key: "clustering-rules",
    label: "聚类规则",
  },
  {
    key: "triggerRule",
    label: "触发规则",
  },
  {
    key: "notification-template",
    label: "通知模版",
  },
  {
    key: "operate",
    label: "操作",
  },
];

export default function Page() {
  const [data,setData] = useState<Notification[]>([])
  const {curProject} = useContext(SidebarContext)
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [curId, setCurId] = useState<number|undefined>(undefined);
  const getData = async ()=>{
    const res = await request(`http://172.25.5.161:8080/api/admin/sky/notify/${curProject?.id}/template?page=${page}&count=20`,'GET')
    setData(res.items)
    setPages(res.totalPage)
  }
  useLayoutEffect(() => {
    if (curProject?.id){
      getData()
    }
  }, [curProject,page]);
  const disclosure = useDisclosure()
  const del = (id:number)=>{
    const res = request(`http://172.25.5.161:8080/api/admin/sky/notify/${curProject?.id}/template/${id}`, 'DELETE')
    toast.promise(res,{
      error: e => {
        return `删除失败: ${e.message}`
      }, loading: '请稍等...', success: (res) => {
        if (res.errMsg)throw new Error(res.errMsg)
        getData()
        return '删除成功'
      }
    })
  }
  const form = useForm<IAlarmNotice>()
  const {reset} = form
  const disclosureAlarmNotice = useDisclosure();
  const {isOpen, onOpen, onOpenChange,onClose} = disclosureAlarmNotice
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const onSubmit: SubmitHandler<IAlarmNotice> = (data) => {
    setLoading(true)
    const res = request(`http://172.25.5.161:8080/api/admin/sky/notify/${curProject?.id}/template`, 'POST', curId?{...data,id:curId}:data)
    toast.promise(res, {
        error: e => {
          setError(e.message)
          return `请求失败: ${e.message}`
        }, loading: '请稍等...', success: (res) => {
          if (res.errMsg)throw new Error(res.errMsg)
          setError(null)
          onClose()
          reset()
          getData()
          return curId?'修改成功':'创建成功'
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const edit = (id:number)=>{
      setCurId(id)
      disclosureAlarmNotice.onOpen()
  }
  const add = ()=>{
    setCurId(undefined)
    disclosureAlarmNotice.onOpen()
  }
  return <div className={''}>
    <div className={'w-full h-[48px] flex items-center justify-between bg-content1 px-4 flex-shrink-0'}>
      <div>通知管理</div>
      <div><Button size={'sm'} color={'primary'} onClick={add}>新增通知</Button></div>
    </div>
    <Table className={'border-t'} aria-label="notification management" radius={'none'} shadow={'none'} bottomContent={
      pages > 1 ? (
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      ) : null
    }>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => {
                if(columnKey==='channel'){
                  const channel:string[] = []
                  Object.entries(item.channel).forEach(([key,value])=>{
                      if (value) channel.push(key)
                  })
                  return <TableCell key={columnKey}>{channel.join('，')}</TableCell>
                }else if(columnKey === 'clustering-rules'){
                  return <TableCell key={columnKey}>{item.pipelineInfo.contentMatch}</TableCell>
                }else if(columnKey === 'triggerRule'){
                  return <TableCell key={columnKey}>在{item.triggerRule.rate.period}内，如果{item.triggerRule.filter.join('且')}的数据大于{item.triggerRule.rate.threshold}条时</TableCell>
                }else if(columnKey === 'notification-template'){
                  return <TableCell key={columnKey}>{item.template}</TableCell>
                }else if(columnKey === 'notification-template'){
                  return <TableCell key={columnKey}>{item.template}</TableCell>
                }else if(columnKey === 'operate'){
                  return <TableCell key={columnKey} className={'flex gap-x-1 items-center'}>
               
                    <div className="relative flex justify-end items-center gap-2">
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <VerticalDotsIcon className="text-default-300" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem color={'primary'} className={'text-primary'} onClick={()=>edit(item.id)}>编辑</DropdownItem>
                          <DropdownItem color={'success'} className={'text-success'} onClick={()=>{
                            setCurId(item.id)
                            disclosure.onOpen()
                          }}>历史触发</DropdownItem>
                          <DropdownItem color={'danger'} className={'text-danger'} onClick={()=>del(item.id)}>删除</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                }
                else return <TableCell key={columnKey}>{item.title}</TableCell>
              }
            }
          </TableRow>
        )}
      </TableBody>
    </Table>
    <HistoricalTrigger disclosure={disclosure} id={curId}/>
    <AlarmNotice form={form} disclosure={disclosureAlarmNotice} loading={loading} title={curId?'编辑':'新增'} onSubmit={onSubmit} error={error} id={curId}/>
  </div>
}
