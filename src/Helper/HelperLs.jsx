import axios from "axios"

export const setLs=(LsName,expire,data)=>{
    localStorage.setItem(LsName,data)
    setTimeout(()=>{
      localStorage.removeItem(LsName)
    },expire*1000)
  }
  export const getLs=(LsName)=>{
    let str=""
    const getVal=localStorage.getItem(LsName)
    if(getVal){
      return getVal
    }
      return str
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