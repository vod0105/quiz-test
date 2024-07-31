import SideBar from "./SideBar";
import './Admin.scss'
import { Outlet } from "react-router-dom";

const Admin = () => {
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar></SideBar>
            </div>
            <div className="admin-content">
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Admin;