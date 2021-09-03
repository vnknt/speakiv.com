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



  return (
    <div >

      <Navbar bg="dark" className="px-3" variant="dark" expand="lg" style={{ position: "fixed", width: "100%" }}>

        <Link to="/" className="navbar-brand">Speakiv</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>

            <Nav.Item className="mb-2">
              {isLoggedIn ? <Link to="/logout" className="nav-link"  >Logout</Link> : <button className="btn btn-primary " onClick={() => { handleLogin() }} href="#">Login</button>}

            </Nav.Item>
            <Nav.Item>
              <input type="checkbox" id="themeToggle" className={styles.darkModeToggle} onChange={() => { toggleDarkMode() }} />

            </Nav.Item>

          </Nav>
        </Navbar.Collapse>

      </Navbar>

    </div>
  )
}