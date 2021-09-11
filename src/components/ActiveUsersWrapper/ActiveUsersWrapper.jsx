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
        
        <div className="row border-2 border-red-500" id="online-users" >
            
            { 
                
                activeUsers.map((user)=>{
                    
                    return(
                    <ConnectedUserCard profileImg={user.imgUrl} userName={user.username} stream={user.stream} key={`user-cart-${i++}`}></ConnectedUserCard>             
                        )
                })
            }

            



        </div>
    )
}
