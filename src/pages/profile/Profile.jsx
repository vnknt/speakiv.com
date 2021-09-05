import jwtDecode from 'jwt-decode'
import { React, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router'
import { toast } from 'react-toastify'
import UserService from '../../services/userService'
export default function Profile() {
    const isLogged = useSelector(store => store.user)
    let dispatch = useDispatch()
    let {userId} = useParams()
    let history = useHistory()
    const [user,setUser]  = useState({name:"",username:"",imgUrl:""})
    const [isMyProfile,setIsMyProfile] = useState(false)


    useEffect(async () => {
        if(!isLogged){
            history.push("/login")
        }
        if(userId===undefined){
            userId = jwtDecode(localStorage.getItem("accessToken")).user_id
        }


        let userService = new UserService()
        let request = await userService.getUserById(userId)
        let userData = request.data
        setUser(userData.data)
        if(!userData.success){
            toast.error("User does not exist",{autoClose:1000})
            history.push("/")
            return 
        }


        console.log(userData)







        console.log(userId)

    }, [])




    return (


        isLogged ?
            <div className="row">
                <div className="col-12 d-flex justify-content-center" >
                    <div className="col-3 col-md-2 col-lg-1 text-center max-h-40" >
                        <div class="row">
                            <div class="col-12">
                                <img className=" rounded-full object-cover"  src={user.imgUrl}/>
                            </div>
                        </div>
                        <div class="row">
                        <div class="col-12 py-2 ">
                                <h4>{`@${user.username}`}</h4>
                            </div>
                            <div class="col-12 py-2">
                                <span>{`${user.name}`}</span>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>
            : <Redirect to="/login"/>






    )
}
