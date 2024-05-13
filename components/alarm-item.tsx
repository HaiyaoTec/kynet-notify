import {Chip} from "@nextui-org/chip";
import {Menu} from "@/components/sidebar";
import {Button} from "@nextui-org/button";

export default function alarmItem(props:{menu:Menu}){
  const {title,} = props.menu;
  return <Button radius={'none'} variant={'light'} className={'w-full flex justify-between pl-8'}>
    <span className={'text-sm'}>{title}</span><Chip size={'sm'} color={'warning'} className={'text-white min-w-8'}>{1}</Chip>
  </Button>
}
