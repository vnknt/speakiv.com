import React from 'react'

import ConnectedUserCard from '../connectedUserCard/ConnectedUserCard'
import { useState , useEffect } from 'react'

export default function ActiveUsersWrapper({users}) {

    let [activeUsers,setActiveUsers] = useState([...users])
    
    useEffect(() => {

        
        setActiveUsers([...users])

    }, [users])


    let i=0;
    return (
        
        <div className="row " id="online-users" >
            
            { 
                
                activeUsers.map((user)=>{
                    
                    return(
                    <ConnectedUserCard user={user}  key={`user-cart-${i++}`}></ConnectedUserCard>             
                        )
                })
            }

            



        </div>
    )
}
