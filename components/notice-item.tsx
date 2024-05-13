import {Button} from "@nextui-org/button";
import {AlarmIcon} from "@/components/icons";

export default function NoticeItem(){
  return <Button className={'flex justify-start pl-8 gap-x-3 items-center'} variant={'light'} radius={'none'} startContent={<AlarmIcon className={'[&_path]:fill-black -translate-y-[2px]'} width={'18px'} height={'18px'}/>}>
    <span>通知管理</span>
  </Button>
}
