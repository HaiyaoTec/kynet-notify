const request = (url:string,method:'POST'|'GET',data: {  })=>{
  return fetch(url, {method: method, body: JSON.stringify(data), headers: {"Content-Type": 'application/json'}}).then(res => res.json())
}
export {request}
