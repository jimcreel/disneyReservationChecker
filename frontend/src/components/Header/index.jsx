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
   
  }, [loggedIn]); 

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
          key={pass}
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
                <Nav.Link href="/auth/login" >
                  Login
                </Nav.Link>
                <Nav.Link href="/auth/signup" >
                  Signup
                </Nav.Link>
              </>
            )}
            {/* <NavDropdown title="Resorts" id="basic-nav-dropdown">
              <NavDropdown title="Disneyland" id="basic-nav-dropdown">
                {buildPassDropdown(getPasses('DLR'), 'DLR')}
              </NavDropdown>
              <NavDropdown title="Disney World" id="basic-nav-dropdown">
                {buildPassDropdown(getPasses('WDW'), 'WDW')}
                
              </NavDropdown>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
