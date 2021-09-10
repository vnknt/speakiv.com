import { React, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner'
import RoomCard from '../components/roomCard'
import RoomService from '../services/roomService'
import UserService from '../services/userService'
import { displayIf } from '../utilities/helpers/displayIf'


export default function Home() {
    const [rooms, setRooms] = useState([])
    const [pageLoaded, setPageLoaded] = useState(false)
    const socket = useRef(io.connect(process.env.REACT_APP_SOCKET_URL + "/events", { query: { token: localStorage.getItem("accessToken") } }))
    useEffect(() => {
        socket.current.emit("subscribe-all")

        let roomService = new RoomService()

        let rooms_data = roomService.getRooms().then((result) => {
            if (result.data.success === false) {
                console.log(result.data.message)
                return
            }

            setRooms(prevState => [...result.data.data])
            setPageLoaded(true)
        })


    }, [])

    useEffect(() => {
        let userService = new UserService()

        socket.current.on('user-joined-room', (userId, roomId) => {
            console.log(rooms)
            const newRooms = [...rooms]
            newRooms.map((room) => {

                if (room._id === roomId) {
                    userService.getUserById(userId).then(result => {
                        room.active_users.push(result.data.data)
                        setRooms(prevStete => [...newRooms])
                    })

                }
            })


        })


        socket.current.on('user-left-room', (userId, roomId) => {
            const newRooms = [...rooms]

            newRooms.map((room) => {

                if (room._id === roomId) {
                    room.active_users = room.active_users.filter((user) => user._id !== userId)
                }
                setRooms(prevStete => [...newRooms])

            })
        })



        return () => {

            socket.current.removeListener("user-joined-room", this)
            socket.current.removeListener("user-left-room", this)

        }
    }, [rooms])

    return (
        <>
            <div className="row">
                <div className="col-12 d-flex justify-center  mb-4 mt-3">

                    <Link as="button" to="/room/create" className="btn btn-primary">Create Room</Link>

                </div>
            </div>
            <LoadingSpinner show={pageLoaded}></LoadingSpinner>
            <div className={displayIf(pageLoaded)}>

                <div className="row">

                    {[...rooms].map((room) => {
                        <div className="">
                        </div>
                        return <RoomCard room_info={room} ></RoomCard>

                    })}

                </div>
            </div>
        </>
    )
}
