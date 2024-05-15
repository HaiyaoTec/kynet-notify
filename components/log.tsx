import dayjs from "dayjs";

export interface LogProps {
  "accessToken":string,
  "type": string,
  "application": string,
  "subject": string,
  "time": number,
  "content": string
  body?:string
}
export default function Log(props:{log:LogProps}) {
  const {log} = props;
  return <div className={'flex w-full flex-col gap-y-3 sm:gap-y-1 p-4 bg-content2  border-t '} >
    <div className={'flex gap-x-5 gap-y-1 flex-wrap'}>
      <span className={'text-sm text-emerald-600'}>{dayjs(log.time).format('YYYY-MM-DD hh:mm:ss')}</span>
      <span className={'text-sm text-blue-700'}>{log.application}</span>
      <span className={'text-sm text-zinc-400'}>{log.subject}</span>
    </div>
    <div>
      <span className={'text-sm text-gray-800'}>{log.content||log.body}</span>
    </div>
  </div>
}
