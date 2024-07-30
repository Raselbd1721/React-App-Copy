import axios from "axios"

export const setLs=(LsName,expireInSeconds,data)=>{
  const now=Date.now()
  const expireAt = now + expireInSeconds * 1000;
  const item={
    data:data,
    expireAt,
  }
  localStorage.setItem(LsName, JSON.stringify(item))
  }
  
  export const getLs=(LsName)=>{
    let str=""
    const getVal=localStorage.getItem(LsName)
    if(!getVal){
      return str
    }
    const item=JSON.parse(getVal)
    
    const now=Date.now()
    if(now >= item.expireAt){
      localStorage.removeItem(LsName)
      return str
    }
    console.log(item.data)
      return item.data
  }
  
 export const RemoveLs=(LsName)=>{
  localStorage.removeItem(LsName)
 }
 
export const callIslogin = async ({ action = "get", url = "", data = "", id = "" }) => {
    const config = {
        headers: {
            "Authorization": `Bearer ${getLs("loginToken")}`
        }
    };

    const endpoint = `${url}/${id}`;

    const methods = {
        get: () => axios.get(endpoint, config),
        post: () => axios.post(endpoint, data, config),
        put: () => axios.put(endpoint, data, config),
      delete: () => axios.delete(endpoint, config)
    };

    if (!methods[action.toLowerCase()]) {
        throw new Error(`Unsupported action: ${action}`);
    }
    
    const res = await methods[action.toLowerCase()]();
    return res;
};