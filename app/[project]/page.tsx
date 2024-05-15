export default function Page({ params }: { params: { project: number } }) {
  // const getLog = ()=>{
  //   setLogs([])
  //   request(`http://172.25.5.161:8080/api/main/sky/msg?accessToken=e189fe84cc5d4f59b5997169f19ee69b`,'POST').then((res)=>{
  //     if (res.errCode){
  //       return
  //     }
  //     setLogs(res)
  //   })
  // }
  // useEffect(()=>{
  //   if(curId!==undefined){
  //     getLog()
  //   }
  // },[curId])
  return <div>
    loading...
  </div>
}
