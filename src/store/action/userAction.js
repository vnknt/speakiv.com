

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

 export const refreshTokens = (token)=>{
    return {
        type:"REFRESH_TOKENS",
        payLoad:token
    }
}


 

