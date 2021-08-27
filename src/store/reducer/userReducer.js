import UserService from '../../services/userService'
import {userLoggedIn} from '../initialValues/userItem'
const initialState = userLoggedIn
export default function userReducer(state=initialState , {type,payLoad}){

    switch(type){

        case "LOGIN":
            console.log(payLoad)
            localStorage.setItem("accessToken",payLoad.accessToken)
            localStorage.setItem("refreshToken",payLoad.refreshToken)
            return true

        case "LOGOUT":
            let userService = new UserService()
            let result = userService.logout().then((result=>{
                console.log(result.data)
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
            
            }))        
            
            
            return false
        case "REFRESH_TOKENS":
            console.log("refresh")
            localStorage.setItem("accessToken",payLoad.accessToken)
            localStorage.setItem("refreshToken",payLoad.refreshToken)
            return true
        default:
            return state
    }

}



