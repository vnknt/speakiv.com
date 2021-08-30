import {React,useEffect,useState} from 'react'
import { login, logout } from '../store/action/userAction'
import { useDispatch,useSelector } from 'react-redux'




export default function SetLoginState(state,token) {
    const isLoggedIn = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loginState,setLoginState] = useState()
    
    useEffect(() => {
       if(state==false){
           dispatch(logout())
       } 
       if(state==true){
           dispatch(login(token))
       }
    }, [state])


    return [loginState,setLoginState]



}
