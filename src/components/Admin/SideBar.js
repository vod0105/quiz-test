import React from 'react';
import PropTypes from 'prop-types';
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaGithub, FaRegLaughWink } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { Link } from 'react-router-dom';
// import '../../styles/sidebar.css'; // Import your custom CSS

const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  return (
    <Sidebar
      image={sidebarBg}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <div
        style={{
          padding: '24px',
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 14,
          letterSpacing: '1px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        Minh Đức
      </div>

      <Menu iconShape="circle">
        <MenuItem
          icon={<FaTachometerAlt />}
          suffix={<span className="badge red">New</span>}
        >
          Dashboard
        </MenuItem>
        <MenuItem icon={<FaGem />}>Components</MenuItem>
        <SubMenu
          suffix={<span className="badge yellow">3</span>}
          icon={<FaRegLaughWink />}
        >
          <MenuItem component={<Link to="manage-user"/>}>Manage Users</MenuItem>
          <MenuItem>Item 2</MenuItem>
          <MenuItem>Item 3</MenuItem>
        </SubMenu>
      </Menu>

      <div style={{ textAlign: 'center', padding: '20px 24px' }}>
        <a
          href="https://github.com/azouaoui-med/react-pro-sidebar"
          target="_blank"
          className="sidebar-btn"
          rel="noopener noreferrer"
        >
          <FaGithub />
          <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
            View Source
          </span>
        </a>
      </div>
    </Sidebar>
  );
};

SideBar.propTypes = {
  image: PropTypes.bool,
  collapsed: PropTypes.bool,
  toggled: PropTypes.bool,
  handleToggleSidebar: PropTypes.func.isRequired,
};

SideBar.defaultProps = {
  image: false,
  collapsed: false,
  toggled: false,
};

export default SideBar;
