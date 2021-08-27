import React, { useState, useEffect } from 'react'

import useDarkMode from "../../hook/useDarkMode"
import styles from './navbar.module.css'
import useSidebar from '../../hook/useSidebar';
import {useSelector,useDispatch} from 'react-redux'
import { logout } from '../../store/action/userAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Container } from 'semantic-ui-react';
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
       {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 navi">
        <a className="navbar-brand" href="/">Speakiv</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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


              



            </li>
          </ul>
        </div>
      </nav> 

 */}





      <Navbar bg="dark" className="px-3" variant="dark" expand="lg" style={{position:"fixed",width:"100%"}}>

    <Link to="/" className="navbar-brand">React-Bootstrap</Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Link to="/" className="nav-link">Home</Link>
        
        <Nav.Item className="mb-2">
        {isLoggedIn?<Link to="/logout" className="nav-link"  >Logout</Link>:<button className="btn btn-primary " onClick={()=>{handleLogin()}} href="#">Login</button>}
             
        </Nav.Item>
        <Nav.Item>
        <input type="checkbox" id="themeToggle" className={styles.darkModeToggle} onChange={() => { toggleDarkMode() }} />
        
        </Nav.Item>
        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
    </Navbar.Collapse>

</Navbar>



















      {/* <div className={`${styles.sidebar} dark:bg-black open`} >SideBar !!!</div> */}

      
      </div>
  )
}
