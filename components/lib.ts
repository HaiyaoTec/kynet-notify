const request = async (url:string,method:'POST'|'GET',data?: { })=>{
  const returnData = fetch(url, {method: method, body: data?JSON.stringify(data):undefined, headers: {"Content-Type": 'application/json','admin_token':localStorage.getItem('user-token')||''}})
  const response = await returnData
  const json = response.json()
  json.then(res=>{
    if (res.errCode===1){
      localStorage.setItem('user-token','')
    }
  })
  return json
}
export {request}

