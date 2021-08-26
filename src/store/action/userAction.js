

export const login = (token)=>{
     return {
         type:"LOGIN",
         payLoad:token
     }
 }


 export const logout = ()=>{
     return {
         type:"LOGOUT"
     }
 }

 

