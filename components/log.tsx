export interface LogProps {
  "accessToken":string,
  "type": string,
  "application": string,
  "subject": string,
  "createTime": number,
  "content": string
}
export default function Log(props:{log:LogProps}) {
  const {log} = props;
  return <div className={'flex flex-col gap-y-3 sm:gap-y-1 p-4 bg-content2  border-t '}>
    <div className={'flex gap-x-5 gap-y-1 flex-wrap'}>
      <span className={'text-sm text-emerald-600'}>{new Date(log.createTime).toLocaleString()}</span>
      <span className={'text-sm text-blue-700'}>{log.application}</span>
      <span className={'text-sm text-zinc-400'}>{log.subject}</span>
    </div>
    <div>
      <span className={'text-sm text-gray-800'}>{log.content}iyhsfdh7ao  iuy019238712984uy2hl4 213oi54y-987r-9807r10928324712938iuosdlhfasdoiufyp9874-1`23847</span>
    </div>
  </div>
}
