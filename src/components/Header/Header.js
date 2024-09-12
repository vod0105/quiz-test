import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { NavDropdown } from 'react-bootstrap';
import { logout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/actions/useAction';
import { useEffect, useState } from 'react';
import ModalProfile from './Profile';
import ChatButton from '../Chatbox/ChatButton';

const Header = () => {
  const [showProfile,setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }

  const handleRegister = () => {
    navigate('/register');
  }

  const handleLogout = async () => {
    try {
      console.log('check logout: ', account.email, account.refresh_token);
      
      let res = await logout(account.email, account.refresh_token);
      
      if (res.EC === 0) {
        dispatch(doLogout());
        toast.success(res.EM);
      } else {
        toast.error('Logout failed: ' + res.EM);
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('Server is not responding. Please try again later.');
    }
  };
  

  const handleProfile = () => {
    setShowProfile(true);
  }
  return (
    <>
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
                  <NavDropdown.Item onClick={() => {handleLogout()}}>Logout</NavDropdown.Item>
                  <NavDropdown.Item onClick={() => {handleProfile()}}>Profile</NavDropdown.Item>
                </NavDropdown>

            }

          </Nav>
        </Navbar.Collapse>
      </Container>
      <ChatButton showChat = {showChat}
      setShowChat = {setShowChat}
      />
    </Navbar>
    <ModalProfile 
          show = {showProfile}
          setShow = {setShowProfile}
          /> 
    </>
  );
}

export default Header;