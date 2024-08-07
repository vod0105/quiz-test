import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';

const Header = () => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink className="navbar-brand" to='/'>Minh Đức</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className='nav-link' to='/'>Home</NavLink>
            <NavLink className='nav-link' to='/users'>Users</NavLink>
            <NavLink className='nav-link' to='/admin'>Admin</NavLink>
          </Nav>
          <Nav>
            {isAuthenticated === false ?
              <>
                <button className='btn-login' onClick={() => { handleLogin() }} >Log in</button>
                <button className='btn-signup' onClick={() => { handleRegister() }}>Sign up</button>
              </>
              :
                <NavDropdown title="Settings" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                  <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                </NavDropdown>

            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;