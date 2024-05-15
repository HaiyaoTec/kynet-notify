import {Button} from "@nextui-org/button";
import {AlarmIcon} from "@/components/icons";
import {cn} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";

export default function NoticeItem(){
  const pathname = usePathname()
  const router = useRouter()
  return <Button onClick={()=>router.push('./notice')} className={cn('flex justify-start pl-8 gap-x-3 items-center',pathname.includes('notice')?'bg-default/40':'')} variant={'light'} radius={'none'} startContent={<AlarmIcon className={'[&_path]:fill-black dark:[&_path]:fill-white -translate-y-[2px]'} width={'18px'} height={'18px'}/>}>
    <span>通知管理</span>
  </Button>
}
