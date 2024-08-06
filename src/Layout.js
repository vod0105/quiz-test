import App from './App';
import Users from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Admin/Dashboard';
import ManageUsers from './components/Admin/ManageUsers';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Auth/Login';
import { Route, Routes } from "react-router-dom";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Layout = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path='/users' element={<Users />}></Route>
                </Route>
                <Route path='admin' element={<Admin />}>
                    <Route index element={<Dashboard />} ></Route>
                    <Route path='manage-user' element={<ManageUsers />} ></Route>
                </Route>
                <Route path='login' element={<Login />}></Route>
                <Route path='register' element={<Login />}></Route>
            </Routes>

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
        </>
    )
}

export default Layout;
