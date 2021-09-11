import React,{useState,useEffect} from 'react'

import styles from './index.module.css'
import { Label, Image,Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import {LanguageLevels} from '../../utilities/constants/'

export default function RoomCard({room_info}) {

    let id = room_info._id
    let title = room_info.name
    let language = room_info.language
    let active_users=room_info.active_users
    let level = room_info.level
    let totalUser = room_info.active_users.length
    let display_users = active_users.slice(0,4)
    return (
        <div className="col-md-6 col-lg-4 col-xs-12 p-2  ">
        <div className={`${styles.roomCard}`}>
            <h4>{title}</h4>
            <div >
                <div>
                    <b className={`${styles.language}`}>{language.name}</b> <i> {LanguageLevels[level] }</i>
                </div>

            </div>
            <div className={`${styles.users} mt-2 mb-2`}>
                {
                    
                    display_users.map((u)=>{
                        return (<img alt="user-avatar" title={`${u.username}`} className={styles.userAvatar} src={u.imgUrl}></img>)
                    })
                    
                }
                {totalUser>4?
                <div className="w-12 rounded-full border-2 border-gray-400 flex justify-content-center align-items-center "><b>+{totalUser-4}</b></div>
                :""}
            </div>

            <div className={styles.footer}>
                <Link to={`/rooms/${id}`} ><button className={`${styles.joinButton}`} >Join Room</button></Link>
            </div>
        </div>
        </div>
    )
}
