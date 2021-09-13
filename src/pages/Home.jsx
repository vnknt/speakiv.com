import { React, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'
import LoadingSpinner from '../components/loadingSpinner/LoadingSpinner'
import RoomCard from '../components/roomCard'
import RoomService from '../services/roomService'
import UserService from '../services/userService'
import { displayIf } from '../utilities/helpers/displayIf'
import CustomSelectInput from '../utilities/customForm/CustomSelectInput'
import LanguageService from '../services/languageService'
import { Formik } from 'formik'

export default function Home() {
    const [rooms, setRooms] = useState([])
    const [filteredRooms, setFilteredRooms] = useState([])
    const [languages, setLanguages] = useState([])
    const [pageLoaded, setPageLoaded] = useState(false)
    const socket = useRef(io.connect(process.env.REACT_APP_SOCKET_URL + "/events", { query: { token: localStorage.getItem("accessToken") } }))
    let langObject = {}
    const [filterLevel,setFilterLevel] = useState(null)
    const [filterLang,setFilterLang] = useState(null)
    useEffect(async () => {
        socket.current.emit("subscribe-all")

        let roomService = new RoomService()
        let languageService = new LanguageService()
        let rooms_data = roomService.getRooms().then((result) => {
            if (result.data.success === false) {
                console.log(result.data.message)
                return
            }

            setRooms(prevState => [...result.data.data])

            setPageLoaded(true)
        })


        let langs = await languageService.getLanguages()


        langs.data.data.map(lang => {

            langObject[lang.code] = lang.name

        })

        setLanguages(langObject)

    }, [])

    useEffect(async () => {
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

        setFilteredRooms(await rooms)

        return () => {

            socket.current.removeListener("user-joined-room", this)
            socket.current.removeListener("user-left-room", this)

        }
    }, [rooms])

    useEffect(()=>{
        console.log(filterLang,filterLevel)
        setFilteredRooms( rooms.filter((room) => {
            
            
            return  (filterCompare(room.language.code, filterLang) && filterCompare(room.level, filterLevel))
        }))
    },[filterLang,filterLevel])


    function filterCompare(obj, val) {
       
        return String(val) === "default" || val === null ? true : String(obj) === String(val)

    }

    

    function filterByLang(lang) {
         setFilterLang(lang)
        

    }
    function filterByLevel(level) {
        
         setFilterLevel(level)
       
    }
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
                    <Formik >
                        <div className="col-12 d-flex justify-end">
                            <div className="mr-2">
                                <CustomSelectInput onChange={(e) => { filterByLang(e.target.value) }} className="mb-2  form-control text-black  px-3" name="language" options={languages} default="All Languages" key={"langs"}></CustomSelectInput>
                            </div>
                            <CustomSelectInput onChange={(e) => { filterByLevel(e.target.value) }} className="mb-2 form-control text-black  px-3" name="language" options={{ "1": "Beginner", "2": "Elementary", "3": "Intermediate", "4": "Advanced" }} default="All Levels" key={"langs"}></CustomSelectInput>
                        </div>
                    </Formik>

                    {filteredRooms.map((room) => {
                        <div className="">
                        </div>
                        return <RoomCard room_info={room} ></RoomCard>

                    })}

                </div>
            </div>
        </>
    )
}
