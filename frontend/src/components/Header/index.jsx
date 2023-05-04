import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header(props) {
  const { setResort } = props
  const { resort } = props
  const { setPass } = props
  const { pass } = props
  

  function handleResortClick(resort) {
  
    setResort(resort)
  }

  function handlePassClick(pass) {
  
    setPass(pass)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Disney Reservation Checker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Resorts" id="basic-nav-dropdown">
              <NavDropdown.Item  onClick = {() => handleResortClick('DLR')}>Disneyland</NavDropdown.Item>
              <NavDropdown.Item  onClick = {() => handleResortClick('WDW')}>Disney World</NavDropdown.Item>
              
            </NavDropdown>
            {resort == 'DLR' &&
            <NavDropdown title="Passes" id="basic-nav-dropdown">
              <NavDropdown.Item onClick = {() => handlePassClick('inspire-key-pass')}>Inspire Key</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('imagine-key-pass')}>Imagine Key</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('dream-key-pass')}>Dream Key</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('enchant-key-pass')}>Enchant Key</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('believe-key-pass')}>Believe Key</NavDropdown.Item>
            </NavDropdown>
             }
            {resort == 'WDW' &&
            <NavDropdown title="Passes" id="basic-nav-dropdown">
              <NavDropdown.Item onClick = {() => handlePassClick('disney-incredi-pass')}>Incredi-Pass</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('disney-sorcerer-pass')}>Sorcerer Pass</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('disney-pirate-pass')}>Pirate Pass</NavDropdown.Item>
              <NavDropdown.Item onClick = {() => handlePassClick('disney-pixie-dust-pass')}>Pixie Dust Pass</NavDropdown.Item>
            </NavDropdown>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

