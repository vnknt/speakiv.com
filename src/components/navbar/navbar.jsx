import React, { useState, useEffect } from 'react'

import useDarkMode from "../../hook/useDarkMode"
import styles from './navbar.module.css'
import useSidebar from '../../hook/useSidebar';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/action/userAction';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Button, Container, Dropdown, Image } from 'semantic-ui-react';
import './navbar.css'
import UserService from '../../services/userService';

export default function Navi() {
  const [colorTheme, setTheme] = useDarkMode();
  const [sidebarState, setSidebarState] = useSidebar();
  const [expanded, setExpanded] = useState(false);
  const [imgUrl, setImgUrl] = useState("https://cdn-icons-png.flaticon.com/512/149/149071.png")


  const isLoggedIn = useSelector(state => state.user);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(async () => {

    if (localStorage.theme === 'undefined') {
      localStorage.theme = "dark"
    }
    setTheme(localStorage.theme)
    if (isLoggedIn) {
      let userService = new UserService()
      let response = await userService.getUserById("")
      if (response.data.success) {
        setImgUrl(response.data.data.imgUrl)
      }

    }

  }, [isLoggedIn])

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

      <Navbar bg="dark" className="px-3" variant="dark" expand="md" expanded={expanded} style={{ position: "fixed", width: "100%", zIndex: "9999" }}>

        <Link to="/" className="navbar-brand" onClick={closeToggle} >Speakiv</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleExpanded} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">

            <Nav.Item className="mb-2 " onClick={closeToggle} >
              <Link to="/" className={`w-100 btn btn-link  ${styles.btnLink} ${styles.navLink}`}>Home</Link>
            </Nav.Item>


            {isLoggedIn ? <>
              <div className="d-md-none">
                <Nav.Item className="mb-2 " onClick={closeToggle} >
                  <Link to="/profile" className={`w-100 btn btn-link d-flex align-item-center justify-content-center ${styles.btnLink} ${styles.navLink}`}>
                    <img className=" w-9 h-auto object-cover rounded-full mr-2" src={`${imgUrl}`} /><span className="d-flex align-items-center">View Profile</span>
                  </Link>
                </Nav.Item>
                <Nav.Item className="mb-2 " onClick={closeToggle} >
                  <Link to="/logout" className="w-100 btn btn-danger  "  >Logout</Link>
                </Nav.Item>
              </div>
              <div className="d-none d-md-block">
                <div className="d-flex align-items-center justify-center px-3 py-0 ">
                  <img className="h-9 w-9 rounded-full " src={`${imgUrl}`} />
                  <NavDropdown title="Me" id="collasible-nav-dropdown" >
                    <NavDropdown.Item >
                      <Link to="/profile" className={`w-100 btn btn-link ${styles.btnLink} ${styles.dropdownLink}`}>My Profile</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item ><Link to="/logout" className="w-100 btn btn-danger  "  >Logout</Link></NavDropdown.Item>
                  </NavDropdown>

                </div>

              </div>
            </>
              : ""
            }

            {!isLoggedIn ?
              <>
                <Nav.Item className="mb-2 mr-2" onClick={closeToggle}>
                  <Link to="/login" className={`btn btn-primary w-100 ${styles.navButton}`}  >Login</Link>
                </Nav.Item>
                <Nav.Item className="mb-2 mr-2 " onClick={closeToggle}>
                  <Link to="/register" className={`btn btn-success w-100 ${styles.navButton}`}  >Register</Link>
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