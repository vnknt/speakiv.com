import React, { useState, useEffect } from 'react'

import useDarkMode from "../../hook/useDarkMode"
import styles from './navbar.module.css'
import useSidebar from '../../hook/useSidebar';
import {useSelector,useDispatch} from 'react-redux'
import { logout } from '../../store/action/userAction';
import { useHistory } from 'react-router';
export default function Navi() {
  const [colorTheme, setTheme] = useDarkMode();
  const [sidebarState, setSidebarState] = useSidebar();

  const isLoggedIn  =useSelector(state => state.user);

  const dispatch  = useDispatch();

  const history = useHistory();

  useEffect(() => {

    setTheme(localStorage.theme)


  }, [])

  const toggleDarkMode = () => {
    setTheme(colorTheme)
  }

  const openSideBar = () => {
    setSidebarState(sidebarState)
  }

  function handleLogout(){
    dispatch(logout())
  }

  function handleLogin(){

    history.push("/login")
    

  }



  return (
<div > 
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 navi">
        <a className="navbar-brand" href="/">Speakiv</a>
        <input type="checkbox" id="themeToggle" className={styles.darkModeToggle} onChange={() => { toggleDarkMode() }} />
        <button className="navbar-toggler" type="button" onClick={() => { openSideBar() }} >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Features</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Pricing</a>
            </li>
            <li className="nav-item">


              {isLoggedIn?<button className="nav-link" onClick={()=>{handleLogout()}} href="#">Logout</button>:<button className="nav-link " onClick={()=>{handleLogin()}} href="#">Login</button>}
              



            </li>
          </ul>
        </div>
      </nav> 


      {/* <div className={`${styles.sidebar} dark:bg-black open`} >SideBar !!!</div> */}

      
      </div>
  )
}
