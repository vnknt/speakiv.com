import React from 'react'
import { Route } from 'react-router-dom'
import CreateRoom from '../pages/createRoom/CreateRoom'

import Home from '../pages/Home'
import Login from '../pages/login/Login'
import Room from '../pages/room/Room'
import PrivateRoute from './PrivateRoute'
import { useSelector } from 'react-redux'
import Logout from '../pages/logout/Logout'


export default function Dashboard() {

   const authed = useSelector(state => state.user)

    


    return (
        <div>
            <div className="row pt-5">
                <div className=" col-12">
                    <Route exact path="/" component={Home} />
                    <PrivateRoute authed={authed}  exact path="/room/create" component={CreateRoom}/>
                    <PrivateRoute authed={authed}  path="/rooms/:roomId" component={Room}/>
                    <PrivateRoute authed={authed}  path="/logout" component={Logout}/>
                    <Route  path="/login"   component={Login}/>
                    
                    
                </div>
            </div>
        </div>
    )
}
