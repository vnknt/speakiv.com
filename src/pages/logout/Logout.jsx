import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../../store/action/userAction'
import { useEffect } from 'react'
import { useHistory } from 'react-router'

export default function Logout() {

    const isLoggedIn = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        
        dispatch(logout())
        history.replace('/')
        

    }, [])



    return (
        <>
        </>
    )
}
