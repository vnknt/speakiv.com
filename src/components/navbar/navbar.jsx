import React, { useState, useEffect } from 'react'

import useDarkMode from "../../hook/useDarkMode"
import styles from './navbar.module.css'
import useSidebar from '../../hook/useSidebar';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/action/userAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Container } from 'semantic-ui-react';
export default function Navi() {
  const [colorTheme, setTheme] = useDarkMode();
  const [sidebarState, setSidebarState] = useSidebar();
  const [expanded, setExpanded] = useState(false);



  const isLoggedIn = useSelector(state => state.user);

  const dispatch = useDispatch();

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

  function handleLogout() {
    dispatch(logout())
  }

  function handleLogin() {

    history.push("/login")


  }

  function handleExpanded() {
    setExpanded(expanded ? false : "expanded")
  }
  function closeToggle() {
    setExpanded(false)
  }
  return (
    <div >

      <Navbar bg="dark" className="px-3" variant="dark" expand="sm" expanded={expanded} style={{ position: "fixed", width: "100%", zIndex: "9999" }}>

        <Link to="/" className="navbar-brand" onClick={closeToggle} >Speakiv</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleExpanded} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">

            <Nav.Item className="mb-2 " onClick={closeToggle} >
              <Link to="/" className="nav-link btn">Home</Link>
            </Nav.Item>
            {isLoggedIn ?
              <Nav.Item className="mb-2 " onClick={closeToggle}>
                <Link to="/logout" className="nav-link btn btn-danger font-weight-bold"  >Logout</Link>
              </Nav.Item>
              : ""
            }

            {!isLoggedIn ?
              <>
                <Nav.Item className="mb-2 mr-2" onClick={closeToggle}>
                  <Link to="/login" className=" btn btn-primary nav-link"  >Login</Link>
                </Nav.Item>
                <Nav.Item className="mb-2 mr-2 " onClick={closeToggle}>
                  <Link to="/register" className="btn btn-success nav-link"  >Register</Link>
                </Nav.Item>
              </>
              : ""
            }
            <Nav.Item className="mb-2 text-center">
              <input type="checkbox" id="themeToggle" className={styles.darkModeToggle} onChange={() => { toggleDarkMode() }} />
            </Nav.Item>



          </Nav>
        </Navbar.Collapse>

      </Navbar>

    </div>
  )
}