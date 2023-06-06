import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { getText, getPasses } from '../../../utils/api';

export default function Header(props) {
  const { setResort, resort, setPass, pass, setLoggedIn, loggedIn } = props;
  const navigate = useNavigate();


  useEffect(() => {
    // Add any additional logic you want to execute when `loggedIn` changes.
    // This code will run whenever `loggedIn` prop changes.
    // You can put any code that needs to be executed when the prop changes inside this block.
    // For example, console.log/logic that should trigger on prop change, etc.
  }, [loggedIn]); // Add `loggedIn` to the dependency array

  function handlePassClick(pass, resort) {
    setResort(resort);
    setPass(pass);
  }

  function handleLogout() {
    localStorage.removeItem('userToken');
    setLoggedIn(false);
    navigate('/');
  }
   
  function buildPassDropdown(passArr, resort) {
    let passDropDown = passArr.map((pass) => {
      return (
        <NavDropdown.Item
          onClick={() => handlePassClick(pass, resort)}
        >
          {getText(pass)}
        </NavDropdown.Item>
      );
    })
    return passDropDown;
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Disney Reservation Checker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Calendar View</Nav.Link>
            {loggedIn && (
              <>
                <Nav.Link href="/profile" >Profile</Nav.Link>
                <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
              </>
            )}
            {!loggedIn && (
              <>
                <Nav.Link href="/auth/login" onClick={() => handleLogin()}>
                  Login
                </Nav.Link>
                <Nav.Link href="/auth/signup" onClick={() => handleLogin()}>
                  Signup
                </Nav.Link>
              </>
            )}
            <NavDropdown title="Resorts" id="basic-nav-dropdown">
              <NavDropdown title="Disneyland" id="basic-nav-dropdown">
                {buildPassDropdown(getPasses('DLR'), 'DLR')}
              </NavDropdown>
              <NavDropdown title="Disney World" id="basic-nav-dropdown">
                {buildPassDropdown(getPasses('WDW'), 'WDW')}
                
              </NavDropdown>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
