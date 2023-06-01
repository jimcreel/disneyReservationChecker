import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

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
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
              </>
            )}
            {!loggedIn && (
              <>
                <Nav.Link href="/auth/login" setLoggedIn={setLoggedIn}>
                  Login
                </Nav.Link>
                <Nav.Link href="/auth/signup" setLoggedIn={setLoggedIn}>
                  Signup
                </Nav.Link>
              </>
            )}
            <NavDropdown title="Resorts" id="basic-nav-dropdown">
              <NavDropdown title="Disneyland" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => handlePassClick('inspire-key-pass', 'DLR')}
                >
                  Inspire Key
                </NavDropdown.Item>
                {/* Rest of the menu items */}
              </NavDropdown>
              <NavDropdown title="Disney World" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => handlePassClick('disney-incredi-pass', 'WDW')}
                >
                  Incredi-Pass
                </NavDropdown.Item>
                {/* Rest of the menu items */}
              </NavDropdown>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
