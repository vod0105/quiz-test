import SideBar from "./SideBar";
import './Admin.scss'
import { Outlet } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'; import o index c đc

const Admin = () => {
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar></SideBar>
            </div>
            <div className="admin-content">
                <Outlet></Outlet>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
        </div>
    )
}

export default Admin;