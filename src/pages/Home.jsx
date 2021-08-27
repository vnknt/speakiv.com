import {React,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import RoomCard from '../components/roomCard'
import RoomService from '../services/roomService'


export default function Home() {
    const [rooms,setRooms] = useState([]) 

    useEffect(() => {
        
        let roomService = new RoomService()

        let rooms_data = roomService.getRooms().then((result)=>{
            if(result.data.success===false){
                console.log(result.data.message)
                return
            }
            console.log(result.data.data)
            setRooms([...result.data.data])
            
        })
        console.log(rooms)
    }, [])



    return (
        <>
            <div className="row">
                <div className="col-12 d-flex justify-center  mb-4 mt-3">

                    <Link as="button" to="/room/create" className="btn btn-primary">Create Room</Link>

                </div>
            </div>
            <div className="row">
                
                {rooms.map((room)=>{
                    <div className="">
                        </div>
                    return <RoomCard id={room._id} title={room.name} language={room.language.name} key={room.id}></RoomCard>

                })} 
                    
            </div>
        </>
    )
}
