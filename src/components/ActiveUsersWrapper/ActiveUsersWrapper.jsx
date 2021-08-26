import React from 'react'
import { act } from 'react-dom/cjs/react-dom-test-utils.production.min'
import ConnectedUserCard from '../connectedUserCard/ConnectedUserCard'
import { useState , useEffect } from 'react'

export default function ActiveUsersWrapper({users}) {

    let [activeUsers,setActiveUsers] = useState([...users])
    
    useEffect(() => {

        
        setActiveUsers([...users])

    }, [users])


    let i=0;
    return (
        
        <div className="col-12 border-2 border-red-500" id="online-users" >
            
            { 
                
                activeUsers.map((item)=>{
                    
                    return(
                    <ConnectedUserCard profileImg={item.profileImg} userName={item.userName} stream={item.stream} key={`user-cart-${i++}`}></ConnectedUserCard>             
                        )
                })
            }

            



        </div>
    )
}
