import {userLoggedIn} from '../initialValues/userItem'
const initialState = userLoggedIn
export default function userReducer(state=initialState , {type,payLoad}){

    switch(type){

        case "LOGIN":
            console.log("payload : "+payLoad)
            localStorage.setItem("token",payLoad)
            
            return true

        case "LOGOUT":
            localStorage.removeItem("token")
            console.log(localStorage.getItem('token'))
            return false

        default:
            return state
    }

}



