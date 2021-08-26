import React,{useState,useEffect} from 'react'

export default function useSidebar() {

    const [sidebar,setSidebar] = useState('closed')
    const sidebarState= sidebar==='closed'?'open':'closed'
    useEffect(
        ()=>{



        },[sidebar]);


    return [sidebarState,setSidebar] 
}
