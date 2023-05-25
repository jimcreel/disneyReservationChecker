import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header(props) {
  const { setResort } = props
  const { resort } = props
  const { setPass } = props
  const { pass } = props
  

  

  function handlePassClick(pass, resort) {
    setResort(resort)
    setPass(pass)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Disney Reservation Checker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <NavDropdown title="Resorts" id="basic-nav-dropdown">              
              <NavDropdown title="Disneyland" id="basic-nav-dropdown">
                <NavDropdown.Item onClick = {() => handlePassClick('inspire-key-pass', 'DLR')}>Inspire Key</NavDropdown.Item>
                <NavDropdown.Item onClick = {() => handlePassClick('imagine-key-pass', 'DLR')}>Imagine Key</NavDropdown.Item>
                <NavDropdown.Item onClick = {() => handlePassClick('dream-key-pass', 'DLR')}>Dream Key</NavDropdown.Item>
                <NavDropdown.Item onClick = {() => handlePassClick('enchant-key-pass', 'DLR')}>Enchant Key</NavDropdown.Item>
                <NavDropdown.Item onClick = {() => handlePassClick('believe-key-pass', 'DLR')}>Believe Key</NavDropdown.Item>
              </NavDropdown>
            
            
            
            <NavDropdown title="Disney World" id="basic-nav-dropdown">
              <NavDropdown.Item onClick = {() => handlePassClick('disney-incredi-pass', 'WDW')}>Incredi-Pass</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('disney-sorcerer-pass', 'WDW')}>Sorcerer Pass</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('disney-pirate-pass', 'WDW')}>Pirate Pass</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('disney-pixie-dust-pass', 'WDW')}>Pixie Dust Pass</NavDropdown.Item>
            </NavDropdown>
            </NavDropdown>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

